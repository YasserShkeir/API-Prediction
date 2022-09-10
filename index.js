fetch("https://dog.ceo/api/breeds/image/random")
  .then((response) => response.json())
  .then((data) => {
    var source = data.message;
    document.getElementById("Image").src = source;
  });

function nameInput() {
  document.getElementById("Message").innerHTML = "Your Results Below:";
  var name = document.getElementById("input").value;
  if (name && name != " ") {
    var gen_gender;
    var gen_proba;
    fetch("https://api.genderize.io/?name=" + name)
      .then((response) => response.json())
      .then((data) => {
        gen_gender = data.gender;
        gen_proba = data.probability;
        document.getElementById(
          "Gender"
        ).innerHTML = `Chance of being ${gen_gender} is ${gen_proba * 100}%`;
      });

    var agi_age;
    var agi_count;
    fetch("https://api.agify.io/?name=" + name)
      .then((response) => response.json())
      .then((data) => {
        agi_age = data.age;
        agi_count = data.count;
        document.getElementById("Age").innerHTML = `Age is ${agi_age}`;
      });

    var cty_country;
    var arr_ids = [];
    var arr_proba = [];
    fetch("https://api.nationalize.io/?name=" + name)
      .then((response) => response.json())
      .then((data) => {
        cty_country = data.country;
        var nationality = "";
        cty_country.forEach((element, index) => {
          arr_ids.push(element.country_id);
          arr_proba.push(element.probability);

          nationality +=
            "Probability to be from " +
            arr_ids[index] +
            " is " +
            Math.round(arr_proba[index] * 100) +
            "%<br/>";
        });
        document.getElementById("Nationality").innerHTML = nationality;
      });
  } else {
    document.getElementById("Message").innerHTML = "Waiting for input...";
    document.getElementById("Gender").innerHTML = "";
    document.getElementById("Age").innerHTML = "";
    document.getElementById("Nationality").innerHTML = "";
    alert("Please input a valid name");
  }
}
