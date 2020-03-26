from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET, require_POST
from django.http import HttpResponse, JsonResponse
from .models import Album
# from .forms import 
from users.models import User
from django.db.models import Q
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import sys
import pprint


def search_album(request):
    search_str = 'Blood Mountain'

    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26b8ce1fe9a140f8a1867a55b7c0118e', client_secret='e8576337c58449e48270f0b90c1d8714'))
    result = sp.search(q=(search_str), type='album')
    return result

@login_required
def rec_list(request):
    searched_album = search_album(request)
    # print(searched_album)

    album_info = {
        'name' : searched_album['albums']['items'][0]['name'],
        'artist' : searched_album['albums']['items'][0]['artists'][0]['name'],
        'release' : searched_album['albums']['items'][0]['release_date'],
        'cover' : searched_album['albums']['items'][0]['images'][0],
    }
    print(album_info)
    context = {'album_info' : album_info}
    return render(request, 'core/rec_list.html', context=context)

def new_album(request):
   return render(request, 'core/new_album.html', ) 
