from django_filters import rest_framework as filters

from essay.models import Essay, EssayTheme, EssayCorrection, CHOICES_STATUS


class EssayFilter(filters.FilterSet):
    status = filters.ChoiceFilter(
        field_name="corrections__status", choices=CHOICES_STATUS
    )

    class Meta:
        model = Essay
        fields = ("theme", "author")


class EssayThemeFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")

    class Meta:
        model = EssayTheme
        fields = ("name",)


class EssayCorrectionFilter(filters.FilterSet):
    class Meta:
        model = EssayCorrection
        fields = ("essay", "corrector", "rating", "status")
