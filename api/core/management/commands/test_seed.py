from django.core.management.base import BaseCommand

from faker import Faker

from core.models import User
from essay.models import Essay, EssayTheme


class Command(BaseCommand):
    help = "Seed the database with test data."

    def handle(self, *args, **options):
        fake = Faker()

        # Creating 5 dummy users
        users_bulk_list = []
        for i in range(5):
            user = User(
                first_name=f"{fake.name()}-{i}",
                email=fake.email(),
                password="password",
            )
            users_bulk_list.append(user)
        User.objects.bulk_create(users_bulk_list)

        essay_theme = EssayTheme.objects.create(
            name="A Imobilidade Social no Brasil",
        )

        # Creating 5 dummy essays
        for user in users_bulk_list:
            Essay.objects.create(
                theme=essay_theme,
                author=user,
            )

        self.stdout.write(self.style.SUCCESS("\nTest data seeded to the database.\n"))
