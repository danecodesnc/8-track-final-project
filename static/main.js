let span = document.querySelectorAll(".save-album");
let albums = document.querySelectorAll(".album");
let album_cover = document.querySelectorAll(".album-cover");

function saveAlbum() {
  for (let span of albums) {
    span.addEventListener("click", function(e) {
      e.preventDefault();
      parent = this.closest("div");
      data = this.closest("div").innerText;
      album_cover = parent.querySelector(".album-cover").src;
      splitData = data.split("\n");
      dataObject = {
        album_cover,
        name: splitData[1],
        artist: splitData[2],
        release_date: splitData[3]
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

// // here we add an event listener to div class album
// for (let album of albums) {
//   album.addEventListener("click", function(e) {
//     e.preventDefault();
//     let album_cover = document.querySelector(".album-cover").src;
//     console.log(e.target.closest(album_cover));
//     data = e.target.innerText;
//     splitData = data.split("\n");
//     dataObject = {
//       album_cover,
//       name: splitData[0],
//       artist: splitData[1],
//       release_date: splitData[2]
//     };
//     console.log(dataObject);
//     fetch("/albums/new/", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(dataObject)
//     })
//       .then(response => response.json())
//       .then(data => {
//         return response.json();
//       })
//       .catch(error => {
//         //   console.error("Error:", error);
//       });
//   });
// }
