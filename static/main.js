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

// Sortable.js Here
let container = document.querySelector(".album-list");
let names = document.querySelectorAll(".album-block");
localStorage.setItem(names, "[data-id]");
console.log(localStorage);

new Sortable(container, {
  animation: 150
});

// Sortable.create(el, {
//   group: "localStorage-example",
//   store: {
//     /**
//      * Get the order of elements. Called once during initialization.
//      * @param   {Sortable}  sortable
//      * @returns {Array}
//      */
//     get: function(sortable) {
//       var order = localStorage.getItem(sortable.options.group.name);
//       return order ? order.split("|") : [];
//     },

//     /**
//      * Save the order of elements. Called onEnd (when the item is dropped).
//      * @param {Sortable}  sortable
//      */
//     set: function(sortable) {
//       var order = sortable.toArray();
//       localStorage.setItem(sortable.options.group.name, order.join("|"));
//     }
//   }
// });

document.addEventListener("DOMContentLoaded", event => {
  saveAlbum();
});
