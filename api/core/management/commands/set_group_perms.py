from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand

from core.models import User
from essay.models import Essay, EssayTheme, EssayCorrection

GROUP_PERMISSIONS = {
    "Administrators": {
        User: ["add", "change", "delete", "view"],
        Essay: ["add", "change", "delete", "view"],
        EssayTheme: ["add", "change", "delete", "view"],
        EssayCorrection: ["add", "change", "delete", "view"],
    },
    "Students": {
        User: ["change", "view"],
        Essay: ["add", "view"],
        EssayTheme: ["view"],
        EssayCorrection: ["view"],
    },
    "Correctors": {
        User: ["view"],
        Essay: ["view"],
        EssayTheme: ["view"],
        EssayCorrection: ["add", "view"],
    },
}


class Command(BaseCommand):
    help = "Creates default groups and permissions."

    def handle(self, *args, **options):
        # Loop through the groups
        for group_name in GROUP_PERMISSIONS.keys():
            # Create the group
            group, created = Group.objects.get_or_create(name=group_name)
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f"\nGroup {group_name} created.\n")
                )
            # Loop through models of each group
            for model in GROUP_PERMISSIONS[group_name].keys():
                # Get the content type of the model
                content_type = ContentType.objects.get_for_model(model)
                # Loop through permissions of each model for the group
                for permission_type in GROUP_PERMISSIONS[group_name][model]:
                    # Create the codename for the permission. Example: "view_essay"
                    codename = f"{permission_type}_{content_type.model}"
                    # Try to get the permission for the model
                    try:
                        permission = Permission.objects.get(
                            content_type=content_type, codename=codename
                        )
                    except Permission.DoesNotExist:
                        self.stdout.write(
                            self.style.ERROR(
                                f"Permission {codename} not found for the model {content_type.model}."
                            )
                        )
                        continue

                    # Add the permission to the group if it doesn't exist
                    if not group.permissions.filter(id=permission.id).exists():
                        group.permissions.add(permission)
                        self.stdout.write(
                            self.style.SUCCESS(
                                f"Permission {codename} added to group {group_name}."
                            )
                        )
        self.stdout.write(
            self.style.SUCCESS("\nDefault groups and permissions created.\n")
        )
