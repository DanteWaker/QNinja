from datetime import timedelta

from django.utils import timezone

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from django_q.models import Schedule
from essay.filters import EssayCorrectionFilter, EssayFilter, EssayThemeFilter

from essay.models import Essay, EssayTheme, EssayCorrection
from essay.serializers import (
    EssayCorrectionListSerializer,
    EssayCorrectionSerializer,
    EssayDisplaySerializer,
    EssaySerializer,
    EssayThemeSerializer,
    SubmitCorrectionSerializer,
)


class EssayViewSet(viewsets.ModelViewSet):
    queryset = Essay.objects.all()
    serializer_class = EssaySerializer
    filterset_class = EssayFilter

    def get_serializer_class(self):
        if self.action == "list":
            return EssayDisplaySerializer
        elif self.action == "retrieve":
            return EssayDisplaySerializer
        return self.serializer_class

    @action(detail=False, methods=["POST"])
    def start_correction(self, request):
        is_not_corrector = not request.user.groups.filter(name="Correctors").exists()

        if is_not_corrector:
            return Response(
                {"Não autorizado": "Apenas corretores podem iniciar uma correção"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Check if the user has a pending correction
        pending_correction = EssayCorrection.objects.filter(
            corrector=request.user, status="IN PROGRESS"
        ).first()
        if pending_correction is not None:
            serializer = EssayDisplaySerializer(
                instance=pending_correction.essay, context={"request": request}
            )
            return Response(serializer.data)

        # If the user has no pending correction, start a new one
        essay_correction = (
            EssayCorrection.objects.filter(corrector__isnull=True, status="PENDING")
            .order_by("created_at")
            .first()
        )

        if essay_correction is None:
            return Response(
                {"Não há redações na fila para correção."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            essay_correction.corrector = request.user
            essay_correction.status = "IN PROGRESS"
            essay_correction.save()

            # Create correction timeout task
            timeout = timezone.now() + timedelta(minutes=30)
            Schedule.objects.create(
                func="essay.tasks.essay_correction_timeout",
                args=f"{essay_correction.id}",
                next_run=timeout,
                repeats=1,
            )

            serializer = EssayDisplaySerializer(
                instance=essay_correction.essay, context={"request": request}
            )
            return Response(
                data=serializer.data,
                status=status.HTTP_201_CREATED,
            )


class EssayThemeViewSet(viewsets.ModelViewSet):
    queryset = EssayTheme.objects.all()
    serializer_class = EssayThemeSerializer
    filterset_class = EssayThemeFilter


class EssayCorrectionViewSet(viewsets.ModelViewSet):
    queryset = EssayCorrection.objects.all()
    serializer_class = EssayCorrectionSerializer
    filterset_class = EssayCorrectionFilter

    def get_serializer_class(self):
        if self.action == "list":
            return EssayCorrectionListSerializer
        return self.serializer_class

    @action(detail=True, methods=["POST"])
    def submit_correction(self, request, pk):
        essay_correction = self.get_object()

        serializer = SubmitCorrectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.submit(essay_correction, serializer.validated_data)
        return Response(EssayCorrectionSerializer(instance=essay_correction).data)
