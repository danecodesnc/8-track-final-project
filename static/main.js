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
        name: splitData[0],
        artist: splitData[1],
        release_date: splitData[2],
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

let buttons = document.querySelectorAll(".fa-plus-circle");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        button.classList.add("added");
    })    
}

// accordion js here
let showMoreDivs = document.querySelectorAll(".show-more");
let tracks = document.querySelectorAll(".tracks");
for (let div of showMoreDivs) {
  div.addEventListener("click", function(e) {
    let el = e.target.nextElementSibling;
    if (!el.classList.contains("active")) {
      el.classList.add("active");
      div.innerHTML = "Show Less";
    } else {
      el.classList.remove("active");
      div.innerHTML = "See Tracks";
    }
  });
}

let lines = document.querySelector(".lines");
let menu = document.querySelector(".mobile-menu");
let removeMenu = document.querySelector(".container");

lines.addEventListener("click", function() {
  menu.style.left = "0";
  menu.classList.add("toggled");
});

removeMenu.addEventListener("click", function() {
  menu.style.left = "-270px";
  menu.classList.remove("toggled");
});

document.addEventListener("DOMContentLoaded", event => {
  saveAlbum();
});
