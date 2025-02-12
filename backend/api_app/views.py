from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        response = Response({"message": "Login successful", "username": username})
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,  # Set to False for development
            samesite="Lax",
        )
        return response
    return Response({"error": "Invalid credentials"}, status=400)


@api_view(["POST"])
def logout_view(request):
    response = Response({"message": "Logout successful"})
    response.delete_cookie("refresh_token")
    return response


@api_view(["GET"])
def check_auth_view(request):
    refresh_token = request.COOKIES.get("refresh_token")

    if not refresh_token:
        return Response({"error": "No refresh token"}, status=401)

    try:
        refresh = RefreshToken(refresh_token)
        user = User.objects.get(id=refresh["user_id"])
        return Response({"username": user.username})
    except (InvalidToken, User.DoesNotExist):
        return Response({"error": "Invalid token"}, status=401)
