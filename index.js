// Used to fetch the url of a dog image
fetch("https://dog.ceo/api/breeds/image/random")
  .then((response) => response.json())
  .then((data) => {
    var source = data.message;
    document.getElementById("Image").src = source;
  });

// This function is called when the user clicks on the input section button
// It uses fetch from 3 APIs
function nameInput() {
  // Element with id message displays the below if the user inputs a name,
  // no need for an 'if' condition
  document.getElementById("Message").innerHTML = "Your Results Below:";

  // create a var name to store the name sent from input
  var name = document.getElementById("input").value;

  // if name is not null or a space
  if (name && name != " ") {
    // **** START GENDERIZE SECTION ****
    // Create two vars, gender and proba, to store the latter
    var gen_gender;
    var gen_proba;
    // Call fetch, and store the values of gender and proba
    fetch("https://api.genderize.io/?name=" + name)
      .then((response) => response.json())
      .then((data) => {
        gen_gender = data.gender;
        gen_proba = data.probability;
        document.getElementById(
          "Gender"
        ).innerHTML = `Chance of being ${gen_gender} is ${gen_proba * 100}%`;
      });

    // **** START AGIFY SECTION ****
    // Create vars agi_age to store the age
    var agi_age;
    // Call fetch and store the value of age
    fetch("https://api.agify.io/?name=" + name)
      .then((response) => response.json())
      .then((data) => {
        agi_age = data.age;
        document.getElementById("Age").innerHTML = `Age is ${agi_age}`;
      });

    // **** START NATIONALIZE SECTION ****
    // Create cty_country to store the countries dictionary
    var cty_country;
    // Create two arrays to store country IDs and the proba for each (Easier to loop through next)
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
    // If the input is invalid, change message to waiting, empty all result divs, and alert user
    document.getElementById("Message").innerHTML = "Waiting for input...";
    document.getElementById("Gender").innerHTML = "";
    document.getElementById("Age").innerHTML = "";
    document.getElementById("Nationality").innerHTML = "";
    alert("WOOF WOOF!\nPlease input a valid name");
  }
}
