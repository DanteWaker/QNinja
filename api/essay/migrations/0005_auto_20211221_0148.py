# Generated by Django 3.2.9 on 2021-12-21 04:48

import core.utils.models
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("essay", "0004_alter_essaycorrection_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="essaycorrection",
            name="audio_comment",
            field=models.FileField(
                null=True,
                upload_to=core.utils.models.file_upload_path,
                verbose_name="Comentário de Áudio",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="competence_1",
            field=models.PositiveIntegerField(
                default=0,
                validators=[django.core.validators.MaxValueValidator(limit_value=200)],
                verbose_name="Competência 1",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="competence_2",
            field=models.PositiveIntegerField(
                default=0,
                validators=[django.core.validators.MaxValueValidator(limit_value=200)],
                verbose_name="Competência 2",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="competence_3",
            field=models.PositiveIntegerField(
                default=0,
                validators=[django.core.validators.MaxValueValidator(limit_value=200)],
                verbose_name="Competência 3",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="competence_4",
            field=models.PositiveIntegerField(
                default=0,
                validators=[django.core.validators.MaxValueValidator(limit_value=200)],
                verbose_name="Competência 4",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="competence_5",
            field=models.PositiveIntegerField(
                default=0,
                validators=[django.core.validators.MaxValueValidator(limit_value=200)],
                verbose_name="Competência 5",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="corrector",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="corrections",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Corretor",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="rating",
            field=models.IntegerField(
                choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)],
                null=True,
                verbose_name="Avaliação",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="status",
            field=models.CharField(
                choices=[
                    ("PENDING", "Pendente"),
                    ("IN PROGRESS", "Em progresso"),
                    ("COMPLETED", "Concluído"),
                    ("TIMEOUT", "Tempo de correção esgotado"),
                ],
                default="PENDING",
                max_length=15,
                verbose_name="Status da correção",
            ),
        ),
        migrations.AlterField(
            model_name="essaycorrection",
            name="text_comment",
            field=models.TextField(null=True, verbose_name="Comentário do corretor"),
        ),
    ]
