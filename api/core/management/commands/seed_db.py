from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.core.management.base import BaseCommand

from core.models import SubscriptionPlan

SUBSCRIPTION_PLAN_PRICING = {
    "0": {
        "credits": 0,
        "price": 0,
    },
    "1": {
        "credits": 10,
        "price": 9.99,
    },
    "2": {
        "credits": 20,
        "price": 19.99,
    },
    "3": {
        "credits": 30,
        "price": 29.99,
    },
}


class Command(BaseCommand):
    help = "Seed the database with default data."

    def handle(self, *args, **options):
        # Creating default subscription plans
        for level, data in SUBSCRIPTION_PLAN_PRICING.items():
            SubscriptionPlan.objects.update_or_create(
                level=level,
                defaults={
                    **data,
                    "duration": datetime.now() + relativedelta(months=1),
                    "is_active": True,
                },
            )

        self.stdout.write(
            self.style.SUCCESS("\nDefault data seeded to the database.\n")
        )
