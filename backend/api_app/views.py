from rest_framework import generics
from .models import Board, Task
from .serializers import BoardSerializer, TaskSerializer


class BoardList(generics.ListAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class TaskList(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
