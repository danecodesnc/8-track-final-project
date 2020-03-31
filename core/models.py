from django.db import models
from users.models import User
from django.utils.text import slugify


class Album(models.Model):
    name = models.CharField(max_length=400)
    artist = models.CharField(max_length=400)
    genre = models.CharField(max_length=400)
    track = models.CharField(max_length=400)
    release_date = models.CharField(max_length=400)
    added_on = models.DateField(auto_now=True)
    album_cover = models.ImageField(default='default.png')
    users = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE, null=True, blank=True)
    album_uri = models.CharField(max_length=400, null=True, blank=True)

    def __str__(self):
        return f'{self.name}'
