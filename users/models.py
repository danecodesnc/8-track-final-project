from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image

# Consider creating a custom user model from scratch as detailed at
# https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#specifying-a-custom-user-model


class User(AbstractUser):
    avatar = models.ImageField(default='default-image.png')
