from django.db import models


class Task(models.Model):
    STATUS_CHOICES = [
        ("to_do", "To Do"),
        ("in_progress", "In Progress"),
        ("done", "Done"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="to_do")
    description = models.CharField(max_length=255)
    # due_date = models.DateField()
    position = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.id:
            max_position = Task.objects.aggregate(models.Max("position"))[
                "position__max"
            ]
            self.position = (max_position or 0) + 1
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["position"]
