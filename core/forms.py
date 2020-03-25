from django import forms
from django.forms import ModelForm
from .models import Album

class NewAlbumForm(ModelForm):
    class Meta:
        model = Album
        fields = ['name']