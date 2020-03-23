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
    users = models.ManyToManyField(User, related_name='user')

    def __str__(self):
        return f'{self.name}'
