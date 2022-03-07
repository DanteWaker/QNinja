from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from core.models import User, SubscriptionPlan, UserSubscriptionPlan
from core.forms import UserCreationForm, UserChangeForm


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.

    ordering = ("email",)
    list_filter = ("is_admin", "is_active")
    list_display = ("email", "last_login", "is_active")

    search_fields = ("email", "first_name")
    readonly_fields = ("id", "date_joined", "last_login")

    fieldsets = (
        (
            None,
            {"fields": ("email", "password")},
        ),
        (
            "Personal info",
            {"fields": ("first_name", "last_name", "date_of_birth", "photo")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_admin",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )

    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.

    add_fieldsets = (
        (
            None,
            {
                "fields": ("email", "first_name", "password1", "password2"),
            },
        ),
    )

    actions = [
        "activate_users",
    ]

    def activate_users(self, request, queryset):
        """Custom action to activate users in bulk.

        Parameters
        ----------
        request : HttpRequest
            Django request object.
        queryset : Queryset
            Selected users queryset.
        """

        assert request.user.has_perm("core.change_user")
        qnt = queryset.filter(is_active=False).update(is_active=True)
        self.message_user(request, f"{qnt} Users activated.")

    activate_users.short_description = "Activate selected users"

    def get_form(self, request, obj=None, **kwargs):
        """get_form override.

        Override get_form to prevent non superusers from changing
        other users and own permissions.

        Parameters
        ----------
        request : HttpRequest
            Django request object.
        obj : Form, optional
            Django form object, by default None

        Returns
        -------
        Form
            Django form object.
        """

        form = super().get_form(request, obj=obj, **kwargs)
        is_superuser = request.user.is_superuser
        disabled_fields = set()

        if not is_superuser:
            disabled_fields |= {"is_superuser", "user_permissions"}

        for field in disabled_fields:
            if field in form.base_fields:
                form.base_fields[field].disabled = True

        return form

    def get_actions(self, request):
        """get_actions override.

        Override get_actions to prevent non superusers from using
        the activate_users action.

        Parameters
        ----------
        request : HttpRequest
            Django request object.

        Returns
        -------
        dict
            Django actions dictionary.
        """

        actions = super().get_actions(request)
        if not request.user.has_perm("core.change_user"):
            del actions["activate_users"]
        return actions


class SubscriptionPlanAdmin(admin.ModelAdmin):
    pass


class UserSubscriptionPlanAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(SubscriptionPlan, SubscriptionPlanAdmin)
admin.site.register(UserSubscriptionPlan, UserSubscriptionPlanAdmin)
