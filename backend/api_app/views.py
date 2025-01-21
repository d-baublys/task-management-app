from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class ReorderTasksView(APIView):
    serializer_class = TaskSerializer
    def patch(self, request, *args, **kwargs):
        frontend_tasks = request.data.get("tasks", [])
        
        for frontend_task in frontend_tasks:
            backend_task = Task.objects.get(id=frontend_task["id"])
            backend_task.position = frontend_task["position"]
            backend_task.save()
        return Response(status=status.HTTP_200_OK)