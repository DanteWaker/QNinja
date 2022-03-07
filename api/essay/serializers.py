from rest_framework import serializers

from core.serializers import UserSerializer
from essay.models import Essay, EssayTheme, EssayCorrection


class EssayCorrectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EssayCorrection
        fields = [
            "id",
            "duration",
            "text_comment",
            "audio_comment",
            "competence_1",
            "competence_2",
            "competence_3",
            "competence_4",
            "competence_5",
            "total_grade",
            "status",
            "corrector",
            "rating",
        ]


class EssayCorrectionDisplaySerializer(serializers.ModelSerializer):
    corrector = UserSerializer(read_only=True, many=False)

    class Meta:
        model = EssayCorrection
        fields = [
            "id",
            "duration",
            "text_comment",
            "audio_comment",
            "competence_1",
            "competence_2",
            "competence_3",
            "competence_4",
            "competence_5",
            "total_grade",
            "status",
            "corrector",
            "rating",
        ]


class SubmitCorrectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EssayCorrection
        fields = [
            "text_comment",
            "audio_comment",
            "competence_1",
            "competence_2",
            "competence_3",
            "competence_4",
            "competence_5",
        ]

    def submit(self, instance, validated_data):
        instance.competence_1 = validated_data["competence_1"]
        instance.competence_2 = validated_data["competence_2"]
        instance.competence_3 = validated_data["competence_3"]
        instance.competence_4 = validated_data["competence_4"]
        instance.competence_5 = validated_data["competence_5"]

        instance.text_comment = validated_data["text_comment"]
        instance.audio_comment = validated_data["audio_comment"]

        instance.status = "COMPLETED"

        instance.save()
        return instance


class EssaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Essay
        fields = ["id", "theme", "author", "image"]


class EssayDisplaySerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True, many=False)
    correction = serializers.SerializerMethodField()

    class Meta:
        model = Essay
        fields = ["id", "theme", "author", "image", "correction"]
        depth = 1

    def get_correction(self, obj):
        correction = obj.corrections.latest("updated_at")
        if correction is not None:
            return EssayCorrectionDisplaySerializer(correction).data
        return None


class EssayThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EssayTheme
        fields = ["id", "name", "theme_file"]


class EssayCorrectionListSerializer(serializers.ModelSerializer):
    corrector = UserSerializer(read_only=True, many=False)
    essay = EssayDisplaySerializer(read_only=True, many=False)

    class Meta:
        model = EssayCorrection
        fields = [
            "id",
            "duration",
            "essay",
            "text_comment",
            "audio_comment",
            "competence_1",
            "competence_2",
            "competence_3",
            "competence_4",
            "competence_5",
            "total_grade",
            "status",
            "corrector",
            "rating",
        ]
