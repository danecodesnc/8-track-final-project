let albumList = document.querySelector(".album-list");
let albums = document.querySelectorAll(".album");
let album_cover = document.querySelectorAll(".album-cover");

// function saveAlbum() {
//   for (let span of albums) {
//     saveAlbum.addEventListener("click", function(e) {
//       e.preventDefault();
//       parent = this.closest("div");
//       data = this.closest("div").innerText;
//       album_cover = parent.querySelector(".album-cover").src;
//       splitData = data.split("\n");
//       console.log(splitData);
//       dataObject = {
//         album_cover,
//         name: splitData[1],
//         artist: splitData[2],
//         release_date: splitData[3]
//       };
//       console.log(dataObject);
//       fetch("/albums/new/", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(dataObject)
//       })
//         .then(response => response.json())
//         .then(data => {
//           return response.json();
//         })
//         .catch(error => {
//           //   console.error("Error:", error);
//         });
//     });
//   }
// }

function saveAlbum() {
  albumList.addEventListener("click", function(e) {
    e.preventDefault();
    let info = e.target.querySelector(".album-info");
    let dataUri = info.dataset.uri;
    album_cover = info.previousElementSibling.src;
    dataObject = {
      album_cover,
      name: info.querySelector(".album-title").textContent.trim(),
      artist: info.querySelector(".artist").textContent,
      release_date: info.querySelector(".album-year").textContent,
      album_uri: dataUri
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
