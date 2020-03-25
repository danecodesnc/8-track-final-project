from spotipy.oauth2 import SpotifyClientCredentials
import spotipy
import sys
import pprint

if len(sys.argv) > 1:
    search_str = sys.argv[1]
else: 
    search_str = 'Radiohead'

sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26b8ce1fe9a140f8a1867a55b7c0118e', client_secret='e8576337c58449e48270f0b90c1d8714'))
results = sp.search(search_str)
pprint.pprint(results)