from datetime import datetime
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.dispatch import receiver
from django.contrib.auth.models import Group
from django.db.models.signals import post_save
from django.core.validators import MinValueValidator

from core.utils.models import file_upload_path


CHOICES_LEVEL = [
    ("0", "Grátis"),
    ("1", "Básico"),
    ("2", "Intermediário"),
    ("3", "Avançado"),
]


class TimeStampModel(models.Model):
    """Abstract model class with times stamp values.

    Parameters
    ----------
    models : django.db.models.Model
        Django Model Class.
    """

    created_at = models.DateField("Data de criação", auto_now_add=True)
    updated_at = models.DateField("Data da última modificação", auto_now=True)

    class Meta:
        abstract = True


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, password=None):
        """
        Creates and saves a User with the given email, first name and password.
        """

        if not email:
            raise ValueError("Users must have an email address")
        if not first_name:
            raise ValueError("Users must have a first name")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
        )

        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, first_name, password=None):
        """
        Creates and saves a superuser with the given email, first name and password.
        """

        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
        )
        user.is_active = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        user.groups.add(Group.objects.get(name="Administrators"))
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(
        verbose_name="Nome",
        max_length=255,
    )
    last_name = models.CharField(
        verbose_name="Sobrenome",
        max_length=255,
        blank=True,
    )
    photo = models.ImageField(
        verbose_name="Foto",
        default="default/user-photo.png",
        upload_to=file_upload_path,
    )
    cpf = models.CharField(verbose_name="CPF", max_length=14, unique=True, null=True)
    date_of_birth = models.DateField(verbose_name="Data de nascimento", null=True)
    date_joined = models.DateTimeField(
        verbose_name="Data de cadastro", auto_now_add=True
    )
    last_login = models.DateTimeField(verbose_name="Último login", auto_now=True)
    is_active = models.BooleanField(verbose_name="Usuário ativo", default=False)
    is_admin = models.BooleanField(verbose_name="Usuário admin", default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name"]

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    # TODO: Tests
    def set_subscription_plan(self, plan):
        subscription_plan = self.subscription_plan
        subscription_plan.plan = plan
        subscription_plan.credits_avaliable += plan.credits
        subscription_plan.save()

    # TODO: Tests
    def add_credits(self, credits):
        subscription_plan = self.subscription_plan
        subscription_plan.credits_avaliable += credits
        subscription_plan.save()


class SubscriptionPlan(TimeStampModel):

    level = models.CharField(
        verbose_name="Nível do Plano",
        max_length=1,
        choices=CHOICES_LEVEL,
        unique=True,
    )
    duration = models.DateField(verbose_name="Duração")
    credits = models.PositiveIntegerField(verbose_name="Creditos")
    price = models.DecimalField(
        verbose_name="Preço",
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(limit_value=0)],
    )
    is_active = models.BooleanField(verbose_name="Ativo")

    def __str__(self):
        return f"Nível - {self.get_level_display()}"


class UserSubscriptionPlan(TimeStampModel):

    plan = models.ForeignKey(
        verbose_name="Plano",
        to=SubscriptionPlan,
        on_delete=models.CASCADE,
        related_name="subscriptions",
    )

    user = models.OneToOneField(
        verbose_name="Usuário",
        to=User,
        on_delete=models.CASCADE,
        related_name="subscription_plan",
    )

    credits_avaliable = models.PositiveIntegerField(verbose_name="Creditos")
    subscribed_at = models.DateField(verbose_name="Data de subscrição")

    def __str__(self):
        return f"{self.user.email} - {self.plan.get_level_display()}"


# TODO: Test if UserSubscriptionPlan is created with User model
@receiver(post_save, sender=User)
def post_save_user(sender, created, instance, **kwargs):
    if created:
        # Set default group for user
        instance.groups.add(Group.objects.get(name="Students"))

        # Set default subscription plan for user
        subscription_plan = SubscriptionPlan.objects.get(level="0")
        UserSubscriptionPlan.objects.create(
            plan=subscription_plan,
            user=instance,
            credits_avaliable=subscription_plan.credits,
            subscribed_at=datetime.now(),
        )
