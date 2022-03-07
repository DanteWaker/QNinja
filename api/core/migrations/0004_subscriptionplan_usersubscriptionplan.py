# Generated by Django 3.2.9 on 2022-01-27 12:23

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_user_photo"),
    ]

    operations = [
        migrations.CreateModel(
            name="SubscriptionPlan",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateField(auto_now_add=True, verbose_name="Data de criação"),
                ),
                (
                    "updated_at",
                    models.DateField(
                        auto_now=True, verbose_name="Data da última modificação"
                    ),
                ),
                (
                    "level",
                    models.CharField(
                        choices=[
                            ("0", "Grátis"),
                            ("1", "Básico"),
                            ("2", "Intermediário"),
                            ("3", "Avançado"),
                        ],
                        max_length=1,
                        unique=True,
                        verbose_name="Nível do Plano",
                    ),
                ),
                ("duration", models.DateField(verbose_name="Duração")),
                ("credits", models.PositiveIntegerField(verbose_name="Creditos")),
                (
                    "price",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=10,
                        validators=[
                            django.core.validators.MinValueValidator(limit_value=0)
                        ],
                        verbose_name="Preço",
                    ),
                ),
                ("is_active", models.BooleanField(verbose_name="Ativo")),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="UserSubscriptionPlan",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateField(auto_now_add=True, verbose_name="Data de criação"),
                ),
                (
                    "updated_at",
                    models.DateField(
                        auto_now=True, verbose_name="Data da última modificação"
                    ),
                ),
                (
                    "credits_avaliable",
                    models.PositiveIntegerField(verbose_name="Creditos"),
                ),
                ("subscribed_at", models.DateField(verbose_name="Data de subscrição")),
                (
                    "plan",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="subscriptions",
                        to="core.subscriptionplan",
                        verbose_name="Plano",
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="subscription_plan",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Usuário",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
