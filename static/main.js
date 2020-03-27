let albums = document.querySelectorAll(".album");

// here we add an event listener to div class album
for (let album of albums) {
  album.addEventListener("click", function(e) {
    e.preventDefault();
    let album_cover = document.querySelector(".album-cover").src;
    data = e.target.innerText;
    splitData = data.split("\n");
    dataObject = {
      album_cover,
      name: splitData[0],
      artist: splitData[1],
      release_date: splitData[2]
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
