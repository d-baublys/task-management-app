from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = "Flush, migrate, and seed test database"

    def handle(self, *args, **kwargs):
        call_command("flush", interactive=False)
        call_command("migrate")
        call_command("seed")
