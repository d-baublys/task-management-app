from django.db import models


class Board(models.Model):
    title = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.title


class Task(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Task ID #{self.id}"

    class Meta:
        ordering = ["order"]
