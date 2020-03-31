from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET, require_POST
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Album
import json
# from .forms import 
from users.models import User
from django.db.models import Q
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import sys
import pprint



# def search_album(request):
#     search_str = 'Phil Collins'

#     sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26b8ce1fe9a140f8a1867a55b7c0118e', client_secret='e8576337c58449e48270f0b90c1d8714'))
#     result = sp.search(q=(search_str), type='album')
#     return result

@login_required
def rec_list(request):
    albums = Album.objects.filter(users=request.user)
    context = {'albums' : albums }
    return render(request, 'core/rec_list.html', context=context)

@csrf_exempt
def new_album(request):
    if request.method == 'POST':
       request.body
       data = json.loads(request.body)
       instance = Album(**data)
       instance.users = request.user
       instance.save()
       return render(request, 'core/new_album.html',) 

def site_search(request):
    search_str = request.GET.get('site-search')
    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26b8ce1fe9a140f8a1867a55b7c0118e', client_secret='e8576337c58449e48270f0b90c1d8714'))
    result = sp.search(q=(search_str), type='album,artist', limit=25)
    return result

def search_results(request):
    search = site_search(request)
    albums = search['albums']['items']
    all_albums = []
    for album in albums:
        album_info = {
            'name' : album['name'],
            'artist' : album['artists'][0]['name'],
            'uri' : album['uri'],
            'release' : album['release_date'],
            'cover' : album['images'][0],
            'type' : album['album_type'],
        }
        # print(album_info)
        if album_info not in all_albums:
            all_albums.append(album_info)
    context = {'all_albums': all_albums}
    return render(request, 'core/search_results.html', context=context)

def delete_album(request, pk): 
    album = get_object_or_404(Album, pk=pk)
    album.delete()
    return redirect ('rec-list')

# def grab_data(request):
#     if request.method == "POST":
#         data = request.body.decode('utf-8')
#         body_data = json.loads(data)
#         return body_data

# @csrf_exempt
# def album_uri(request):
#     # if request.method == "POST":
#     #     data = request.body.decode('utf-8')
#     #     body_data = json.loads(data)
#     search_str = 'Leviathan'
#     print('HERE', search_str)
#     sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26b8ce1fe9a140f8a1867a55b7c0118e', client_secret='e8576337c58449e48270f0b90c1d8714'))
#     results = sp.search(q=(search_str), type='album,artist', limit=50)
#     albums = results['albums']['items']
#     for album in albums:
#         if album['name'] == search_str:
#             album_uri = album['uri'] 
#         return album_uri

def get_album_details(request):
    urn = 'spotify:album:6khFoLWnJZDQvZ7Pijym3b'
    print('here',urn)
    if urn != None:
        sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26b8ce1fe9a140f8a1867a55b7c0118e', client_secret='e8576337c58449e48270f0b90c1d8714'))
        album = sp.album(urn)
        return album

@csrf_exempt
def album_detail(request):
    album = get_album_details(request)
    detail_info = {
        'name' : album['name'],
        'artist' : album['artists'][0]['name'],
        'cover' : album['images'][0],
        'release' : album['release_date'],
    }
    tracks = album['tracks']['items']
    all_tracks = []
    for track in tracks: 
        track_info = {
            'title' : track['name'],
            'number' : track['track_number'],
            'url' : track['external_urls']['spotify'],
        }
        if track_info not in all_tracks:
            all_tracks.append(track_info)
    context = {'detail_info' : detail_info, 'all_tracks' : all_tracks}
    return render(request, 'core/album_detail.html', context=context)
    

    
