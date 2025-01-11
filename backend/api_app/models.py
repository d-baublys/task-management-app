from django.db import models


class Task(models.Model):
    STATUS_CHOICES = [
        ("to_do", "To Do"),
        ("in_progress", "In Progress"),
        ("done", "Done"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="to_do")
