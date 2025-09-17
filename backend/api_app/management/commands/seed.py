from datetime import date
from django.core.management.base import BaseCommand
from api_app.models import CustomUser, Task
from django.db import transaction


class Command(BaseCommand):
    help = "Seed database with initial data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        users = [
            {"email": "user1@example.com", "password": "password1"},
            {"email": "user2@example.com", "password": "password2"},
        ]

        created_users = []
        for user in users:
            user_obj = CustomUser(email=user["email"])
            user_obj.set_password(user["password"])
            user_obj.save()
            created_users.append(user_obj)

        tasks = [
            {
                "user": created_users[0],
                "status": "in_progress",
                "description": "This is a test task",
                "due_date": date(2025, 8, 1),
                "position": 0,
            }
        ]

        for task in tasks:
            Task.objects.create(**task)

        self.stdout.write(self.style.SUCCESS("Database seeded successfully..."))
