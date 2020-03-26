let album = document.querySelector(".album");
let imgSrc = document.querySelector(".album-cover").src;
console.log("here", imgSrc);
album.addEventListener("click", function(e) {
  console.log(e.target);
  newData = [];
  data = e.target.innerText;
  newData.push(data);
  console.log(data);
  fetch("/albums/new", {
    method: "POST", // or 'PUT'
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      return response.json();
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
