let albumSave = document.querySelector(".save-album");
let albums = document.querySelectorAll(".album");
let album_cover = document.querySelectorAll(".album-cover");

function saveAlbum() {
  for (let span of albums) {
    span.addEventListener("click", function(e) {
      e.preventDefault();
      parent = this.closest("div");
      data = this.closest("div").innerText;
      album_cover = parent.querySelector(".album-cover").src;
      let artist_uri = parent.querySelector(".artist").dataset.artist;
      album_uri = parent.dataset.uri;
      splitData = data.split("\n");
      dataObject = {
        album_cover,
        name: splitData[1],
        artist: splitData[2],
        release_date: splitData[3],
        album_uri: album_uri,
        artist_uri: artist_uri
      };
      console.log(dataObject);
      fetch("/albums/new/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObject)
      })
        .then(response => response.json())
        .then(data => {
          return response.json();
        })
        .catch(error => {
          //   console.error("Error:", error);
        });
    });
  }
}

document.addEventListener("DOMContentLoaded", event => {
  saveAlbum();
});
