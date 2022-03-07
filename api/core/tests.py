from datetime import datetime
from dateutil.relativedelta import relativedelta
from rest_framework.test import APITestCase, APIClient

from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from rest_framework import status

from core.models import SubscriptionPlan

User = get_user_model()


class UserTestCase(APITestCase):
    def setUp(self) -> None:
        Group.objects.create(name="Students")
        SubscriptionPlan.objects.create(
            level="0",
            credits=0,
            price=0,
            duration=datetime.now() + relativedelta(months=1),
            is_active=True,
        )
        super().setUp()

    def __create_user(self, email, password, first_name="default"):

        return self.client.post(
            "/api/users/",
            {"first_name": first_name, "email": email, "password": password},
            format="json",
        )

    def create_two_users(self):
        email = "usertest@live.com"
        password = "onetwothree123"
        email1 = "usertest123@live.com"
        password1 = "onetwothree123"

        self.__create_user(email, password)
        self.__create_user(email1, password1)
        user = User.objects.get(email=email)
        user = User.objects.get(email=email1)

        return user

    # Cadastro
    def test_force_auth(self):
        # test test test
        client = APIClient()
        client.login(username="x@gmail.com", password="123")

    def test_create_user_success(self):
        # Given
        first_name = "User Number1"
        email = "user_name@ymail.com"
        password = "12345678x"

        # When
        response = self.__create_user(
            first_name=first_name, email=email, password=password
        )

        # Then
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_user_failure(self):

        first_name = "User Number1"
        email = "xy"
        password = "abc"

        response = self.__create_user(
            first_name=first_name, email=email, password=password
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_same_email(self):
        same_email = "user_email@xmail.com"

        self.__create_user(
            first_name="User 1", email=same_email, password="orange12345"
        )

        response = self.__create_user(
            first_name="User 2", email=same_email, password="black123456"
        )

        error_title = response.data["email"][0].title()

        self.assertEqual(error_title, "User Com Este Email Já Existe.")

    # LOGIN
    def test_login_success(self):

        email = "emailx@y.com"
        password = "asjkhdsxs123"

        self.__create_user(email=email, password=password)

        response = self.client.post(
            "/api/token/login/",
            {"email": email, "password": password},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "authToken")

    def test_login_totally_empty(self):

        email = ""
        password = ""

        self.__create_user(email=email, password=password)

        response = self.client.post(
            "/api/token/login/",
            {
                "email": email,
                "password": password,
            },
            format="json",
        )

        error_title_email = response.data["email"][0].title()
        error_title_pass = response.data["password"][0].title()

        self.assertEquals(error_title_email, "Este Campo Não Pode Ser Em Branco.")
        self.assertEquals(error_title_pass, "Este Campo Não Pode Ser Em Branco.")

    def test_login_pass_empty(self):

        email = "user_mail@xmail.com"
        password = ""

        self.__create_user(email=email, password=password)

        response = self.client.post(
            "/api/token/login/",
            {
                "email": email,
                "password": password,
            },
            format="json",
        )

        error_title_pass = response.data["password"][0].title()

        self.assertEqual(error_title_pass, "Este Campo Não Pode Ser Em Branco.")

    def test_login_wrong_password(self):
        email = "user_mail@xmail.com"
        password = "usertest1234"

        self.__create_user(email=email, password=password)

        response = self.client.post(
            "/api/token/login/",
            {
                "email": email,
                "password": "usertest123",
            },
            format="json",
        )

        error_title = response.data["non_field_errors"][0].title()

        self.assertEqual(
            error_title, "Impossível Fazer Login Com As Credenciais Fornecidas."
        )

    # GET users
    def test_get_users_noAuthentication(self):
        response = self.client.get("/api/users/")
        error_title = response.data["detail"].title()

        self.assertEqual(
            error_title, "As Credenciais De Autenticação Não Foram Fornecidas."
        )

    def test_get_users_commom(self):
        email = "user_mail@xlive.com"
        password = "mailpass123"

        self.__create_user(email, password)

        user = User.objects.get(email=email)
        self.client.force_authenticate(user=user)

        response = self.client.get("/api/users/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_users_admin(self):
        user = self.create_two_users()
        user.is_admin = True
        user.save()

        self.client.force_authenticate(user=user)

        response = self.client.get("/api/users/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_id_no_auth(self):
        user = self.create_two_users()

        self.client.force_authenticate(user=user)

        response = self.client.get("/api/users/3/")

        error_title = response.data["detail"].title()

        self.assertEqual(error_title, "Não Encontrado.")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_user_id(self):
        user = self.create_two_users()
        user.is_admin = True
        user.save()

        self.client.force_authenticate(user=user)

        response = self.client.get("/api/users/3/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Delete User
    def test_get_users_del(self):
        email = "user_mail@xlive.com"
        password = "mailpass123"

        self.__create_user(email, password)
        user = User.objects.get(email=email)
        user.is_admin = True
        user.save()

        self.client.force_authenticate(user=user)

        response = self.client.delete(
            f"/api/users/{user.id}/",
            {
                "current_password": password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # ALteração Email
    def test_user_set_email(self):
        email = "user_mail@xlive.com"
        password = "mailpass123"

        self.__create_user(email, password)
        user = User.objects.get(email=email)
        self.client.force_authenticate(user=user)

        new_email = "new_user_email@xlive.com"

        response = self.client.post(
            "/api/users/set_email/",
            {"current_password": password, "new_email": new_email},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_user_set_wrong_email(self):
        email = "user_mail@xlive.com"
        password = "mailpass123"

        self.__create_user(email, password)
        user = User.objects.get(email=email)
        self.client.force_authenticate(user=user)

        new_email = "user.com"

        response = self.client.post(
            "/api/users/set_email/",
            {"current_password": password, "new_email": new_email},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_set_empty_email(self):
        email = "user_mail@xlive.com"
        password = "mailpass123"

        self.__create_user(email, password)
        user = User.objects.get(email=email)
        self.client.force_authenticate(user=user)

        new_email = ""

        response = self.client.post(
            "/api/users/set_email/",
            {"current_password": password, "new_email": new_email},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
