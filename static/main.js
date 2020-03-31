let span = document.querySelectorAll(".save-album");
let albums = document.querySelectorAll(".album");
let album_cover = document.querySelectorAll(".album-cover");

// function saveAlbum() {
//   for (let span of albums) {
//     span.addEventListener("click", function(e) {
//       e.preventDefault();
//       parent = this.closest("div");
//       data = this.closest("div").innerText;
//       album_cover = parent.querySelector(".album-cover").src;
//       splitData = data.split("\n");
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

function album_detail() {
    let album_titles = document.querySelectorAll('.album-title')
    for (let title of album_titles) {
        title.addEventListener("click", function(e) {
            e.preventDefault();
            title = e.target.innerText
            fetch("/album/detail/", {
                credentials: 'include',
                method: "POST",
                headers: {
                    "Content-Type": "text/html" 
                },
                body: JSON.stringify(title)
            })
            .then(response => response.text())
            .then(data => {
                response = title
                return response
            })
        })
    }
}

document.addEventListener("DOMContentLoaded", event => {
//   saveAlbum();
  album_detail();
});

