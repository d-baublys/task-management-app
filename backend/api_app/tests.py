from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken
from datetime import timedelta
from time import sleep
from django.conf import settings


class AuthenticationTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] = timedelta(seconds=1)
        cls.user = User.objects.create_user(
            username="test_user", password="testpassword"
        )

    def setUp(self):
        self.client = APIClient()

    def test_user_login(self):
        """
        Verify valid credentials are authenticated and a refresh token is sent in a cookie.
        """
        response = self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.cookies.get("refresh_token").value)

    def test_user_logout(self):
        """
        Verify cookie containing the refresh token is deleted on log out.
        """
        self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )
        response = self.client.post("/api/logout/")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.cookies.get("refresh_token").value)

    def test_access_token(self):
        """
        Verify access token is issued after providing a valid refresh token.
        """
        self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )

        get_token_response = self.client.post("/api/token/")
        self.assertEqual(get_token_response.status_code, 200)
        self.assertTrue(get_token_response.data.get("access_token"))

    def test_access_token_expiry(self):
        """
        Verify access token expiry revokes authentication.
        """
        self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )

        expired_access_token = AccessToken.for_user(self.user)
        expired_access_token.set_exp(lifetime=timedelta(seconds=1))

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {expired_access_token}")

        initial_response = self.client.get("/api/tasks/")
        self.assertEqual(initial_response.status_code, 200)

        sleep(5)

        expired_response = self.client.get("/api/tasks/")
        self.assertEqual(expired_response.status_code, 401)


class TaskTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            username="test_user", password="testpassword"
        )

    def setUp(self):
        self.client = APIClient()

    def test_task_crud_failure(self):
        """
        Verify task CRUD operations are not permitted without authentication.
        """
        response = self.client.get("/api/tasks/")

        self.assertEqual(response.status_code, 401)

    def test_create_task_success(self):
        """
        Verify successful task creation when authenticated.
        """
        self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )
        get_token_response = self.client.post("/api/token/")
        access_token = get_token_response.data.get("access_token")

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        response = self.client.post(
            "/api/tasks/",
            {"status": "to_do", "description": "Test task", "due_date": "2025-02-01"},
        )

        self.assertEqual(response.status_code, 201)

    def test_get_tasks_success(self):
        """
        Verify successful task fetching when authenticated.
        """
        self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )
        get_token_response = self.client.post("/api/token/")
        access_token = get_token_response.data.get("access_token")

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        self.client.post(
            "/api/tasks/",
            {"status": "to_do", "description": "Test task", "due_date": "2025-02-01"},
        )

        response = self.client.get("/api/tasks/")

        self.assertEqual(response.status_code, 200)

    def test_update_task_success(self):
        """
        Verify successful task update when authenticated.
        """
        self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )
        get_token_response = self.client.post("/api/token/")
        access_token = get_token_response.data.get("access_token")

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        create_response = self.client.post(
            "/api/tasks/",
            {"status": "to_do", "description": "Test task", "due_date": "2025-02-01"},
        )

        task_id = create_response.data["id"]

        update_response = self.client.patch(
            f"/api/tasks/{task_id}/",
            {
                "status": "in_progress",
                "description": "Test task",
                "due_date": "2025-02-01",
            },
        )

        self.assertEqual(update_response.status_code, 200)

    def test_delete_task_success(self):
        """
        Verify successful task deletion when authenticated.
        """
        self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )
        get_token_response = self.client.post("/api/token/")
        access_token = get_token_response.data.get("access_token")

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        create_response = self.client.post(
            "/api/tasks/",
            {"status": "to_do", "description": "Test task", "due_date": "2025-02-01"},
        )

        task_id = create_response.data["id"]

        delete_response = self.client.delete(f"/api/tasks/{task_id}/")

        self.assertEqual(delete_response.status_code, 204)

    def test_task_ordering(self):
        """
        Verify tasks are correctly ordered based on the "position" attribute.
        """
        self.client.post(
            "/api/login/", {"username": "test_user", "password": "testpassword"}
        )
        get_token_response = self.client.post("/api/token/")
        access_token = get_token_response.data.get("access_token")

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        create_first = self.client.post(
            "/api/tasks/",
            {
                "status": "to_do",
                "description": "Test task one",
                "due_date": "2025-03-01",
            },
        )
        create_second = self.client.post(
            "/api/tasks/",
            {
                "status": "in_progress",
                "description": "Test task two",
                "due_date": "2025-02-01",
            },
        )

        first_id = create_first.data["id"]
        second_id = create_second.data["id"]

        updated_first = self.client.patch(f"/api/tasks/{first_id}/", {"position": 2})
        updated_second = self.client.patch(f"/api/tasks/{second_id}/", {"position": 1})

        get_response = self.client.get("/api/tasks/")

        self.assertTrue(
            get_response.data.index(updated_second.data)
            < get_response.data.index(updated_first.data)
        )
