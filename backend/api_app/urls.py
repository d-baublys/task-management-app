from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("tasks", views.TaskViewSet, basename="task")

app_name = "api_app"
urlpatterns = [
    path("", include(router.urls)),
    path("login/", views.login_view),
    path("logout/", views.logout_view),
    path("token/", views.get_token_view),
]
