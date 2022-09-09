fetch("https://dog.ceo/api/breeds/image/random")
  .then((response) => response.json())
  .then((data) => {
    var source = data.message;
    document.getElementById("Image").src = source;
  });

function nameInput() {
  console.log("Hello From Input");
}
