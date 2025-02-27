from datetime import timedelta
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    remember_me = request.data.get("remember_me")

    user = authenticate(username=username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)

        if remember_me:
            refresh.set_exp(lifetime=timedelta(days=7))

        response = Response({"message": "Log in successful", "username": username})
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,  # Set to False for development
            samesite="Lax",
        )

        return response
    return Response(
        {
            "error": "Incorrect username or password. Please check your credentials and try again."
        },
        status=401,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def logout_view(request):
    response = Response({"message": "Log out successful"})
    response.delete_cookie("refresh_token")
    return response


@api_view(["GET"])
@permission_classes([AllowAny])
def get_token_view(request):
    refresh_token = request.COOKIES.get("refresh_token")

    if not refresh_token:
        return Response({"error": "No refresh token"}, status=401)

    try:
        refresh = RefreshToken(refresh_token)
        user = User.objects.get(id=refresh["user_id"])
        access_token = str(refresh.access_token)

        return Response({"username": user.username, "access_token": access_token})
    except (TokenError, User.DoesNotExist):
        return Response({"error": "Invalid token"}, status=401)
