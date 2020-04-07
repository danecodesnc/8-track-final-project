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

client_id = '26b8ce1fe9a140f8a1867a55b7c0118e'
client_secret = 'e8576337c58449e48270f0b90c1d8714'
sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=client_id, client_secret=client_secret))

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
       print(data)
       return redirect ('/')
       

def site_search(request):
    search_str = request.GET.get('site-search')
    result = sp.search(q=(search_str), type='album,artist', limit=25)
    return result

def search_results(request):
    search = site_search(request)
    albums = search['albums']['items']
    all_albums = []
    names = []
    for album in albums:
        all_tracks = []
        album_info = {
            'name' : album['name'],
            'artist' : album['artists'][0]['name'],
            'album_uri' : album['uri'],
            'artist_uri' : album['artists'][0]['uri'],
            'release' : album['release_date'],
            'cover' : album['images'][0],
            'type' : album['album_type'],
            'tracks' : all_tracks,
        }
        if album_info['name'] not in names:
            all_albums.append(album_info)
            names.append(album_info['name'])
        uri = album_info['album_uri']
        album_details = sp.album(uri)
        tracks = album_details['tracks']['items']
        for track in tracks:
            track_info = {
                'title' : track['name'],
                'number' : track['track_number'],
                'url' : track['external_urls']['spotify'],
            }
            if track_info not in all_tracks:
                all_tracks.append(track_info)
    context = {'all_albums': all_albums}
    # pprint.pprint(context)
    return render(request, 'core/search_results.html', context=context)

def delete_album(request, pk): 
    album = get_object_or_404(Album, pk=pk)
    album.delete()
    return redirect ('rec-list')
    
def album_detail(request, pk):
    albums = Album.objects.all()
    album_detail = Album.objects.get(pk=pk)
    uri = album_detail.album_uri
    album = sp.album(uri)
    detail_info = {
        'name' : album['name'],
        'artist' : album['artists'][0]['name'],
        'cover' : album['images'][0],
        'release' : album['release_date'],
        'album_link' : album['external_urls']['spotify'],
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

def artist_detail(request, pk):
    albums = Album.objects.all()
    albums_detail = Album.objects.get(pk=pk)
    uri = albums_detail.artist_uri
    artist = sp.artist(uri)
    artist_info = {
        'artist_url' : artist['external_urls']['spotify'],
        'artist_image' : artist['images'][0],
        'name' : artist['name'],
    }
    artist_discog = sp.artist_albums(uri)
    artist_albums = artist_discog['items']
    all_albums = []
    names = []
    for album in artist_albums:
        album_info = {
            'album_url' : album['external_urls']['spotify'],
            'album_cover' : album['images'][0],
            'name' : album['name'],
            'release' : album['release_date'],
            'type' : album['type'],
            'album_uri' : album['uri'],
        }
        if album_info['name'] not in names:
            all_albums.append(album_info)
            names.append(album_info['name'])
    context = {'artist_info' : artist_info, 'all_albums' : all_albums, 'albums' : album, 'album_detail' : album_detail}
    return render(request, 'core/artist_detail.html', context=context)
    
