from django.db import models
from core.models import TimeStampModel, User
from django.core.validators import MaxValueValidator

from core.utils.models import file_upload_path
from django.dispatch import receiver
from django.db.models.signals import post_save


CHOICES_RATING = [
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
]


CHOICES_STATUS = [
    ("PENDING", "Pendente"),
    ("IN PROGRESS", "Em progresso"),
    ("COMPLETED", "Concluído"),
    ("TIMEOUT", "Tempo de correção esgotado"),
]


class EssayTheme(TimeStampModel):

    name = models.TextField(verbose_name="Nome do Tema")
    theme_file = models.FileField(
        verbose_name="Texto de Apoio",
        default="default/essaytheme-file.pdf",
        upload_to=file_upload_path,
    )

    def __str__(self):
        return self.name


class Essay(TimeStampModel):

    theme = models.ForeignKey(
        verbose_name="Tema",
        to=EssayTheme,
        on_delete=models.CASCADE,
        related_name="essays",
    )
    author = models.ForeignKey(
        verbose_name="Autor",
        to=User,
        on_delete=models.CASCADE,
        related_name="essays",
    )
    image = models.ImageField(
        verbose_name="Imagem da redação",
        default="default/essay-image.png",
        upload_to=file_upload_path,
    )

    def __str__(self):
        return f"{self.author.email} - {self.created_at}"


class EssayCorrection(TimeStampModel):

    corrector = models.ForeignKey(
        verbose_name="Corretor",
        to=User,
        null=True,
        on_delete=models.CASCADE,
        related_name="corrections",
    )
    essay = models.ForeignKey(
        verbose_name="Redação",
        to=Essay,
        on_delete=models.CASCADE,
        related_name="corrections",
    )
    duration = models.DateField(verbose_name="Duração", null=True)
    rating = models.IntegerField(
        verbose_name="Avaliação", null=True, choices=CHOICES_RATING
    )
    status = models.CharField(
        verbose_name="Status da correção",
        default="PENDING",
        max_length=15,
        choices=CHOICES_STATUS,
    )
    text_comment = models.TextField(verbose_name="Comentário do corretor", null=True)
    audio_comment = models.FileField(
        verbose_name="Comentário de Áudio", null=True, upload_to=file_upload_path
    )
    competence_1 = models.PositiveIntegerField(
        verbose_name="Competência 1",
        default=0,
        validators=[MaxValueValidator(limit_value=200)],
    )
    competence_2 = models.PositiveIntegerField(
        verbose_name="Competência 2",
        default=0,
        validators=[MaxValueValidator(limit_value=200)],
    )
    competence_3 = models.PositiveIntegerField(
        verbose_name="Competência 3",
        default=0,
        validators=[MaxValueValidator(limit_value=200)],
    )
    competence_4 = models.PositiveIntegerField(
        verbose_name="Competência 4",
        default=0,
        validators=[MaxValueValidator(limit_value=200)],
    )
    competence_5 = models.PositiveIntegerField(
        verbose_name="Competência 5",
        default=0,
        validators=[MaxValueValidator(limit_value=200)],
    )

    @property
    def total_grade(self):
        return (
            self.competence_1
            + self.competence_2
            + self.competence_3
            + self.competence_4
            + self.competence_5
        )

    def __str__(self):
        return f"{self.essay.author.email} - {self.created_at}"


@receiver(post_save, sender=Essay)
def post_save_essay(sender, created, instance, **kwargs):
    if created:
        essay_correction = EssayCorrection(essay=instance)
        essay_correction.save()
