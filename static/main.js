let albumList = document.querySelector(".album-list");
let albums = document.querySelectorAll(".album");
let album_cover = document.querySelectorAll(".album-cover");

function saveAlbum() {
  albumList.addEventListener("click", function(e) {
    e.preventDefault();
    let album = e.target.querySelector(".album");
    let dataUri = album.dataset.uri;
    let artistUri = album.querySelector(".artist").dataset.artist;
    album_cover = album.querySelector("img").src;
    dataObject = {
      album_cover,
      name: album.querySelector(".album-title").textContent.trim(),
      artist: album.querySelector(".artist").textContent.trim(),
      release_date: album.querySelector(".album-year").textContent,
      album_uri: dataUri,
      artist_uri: artistUri
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

document.addEventListener("DOMContentLoaded", event => {
  saveAlbum();
});

let newRec = document.querySelector(".new-rec");

let test = document.querySelector("#light-box");
newRec.addEventListener("click", function(e) {
  e.preventDefault();
  test.style.display = "block";
  test.classList.add("search");
});

let close = document.querySelector("#close");
close.addEventListener("click", function(e) {
  e.preventDefault();
  test.style.display = "none";
});
