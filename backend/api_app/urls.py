from django.urls import path
from . import views

app_name = "api_app"
urlpatterns = [
    path("boards/", views.BoardList.as_view() , name="board_list"),
    path("tasks/", views.TaskList.as_view() , name="task_list"),
]
