// import fetch from "unfetch";
// import xml2js from "xml2js";

fetch("countries.xml")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "application/xml");

    const countries = doc.querySelectorAll("country");
    const countryOptions = Array.from(countries).map((country) => {
      const alpha3 = country.querySelector("alpha3").textContent;
      const name = country.querySelector("name").textContent;
      return `<option value="${alpha3}">${name}</option>`;
    });

    const countrySelect = document.getElementById("country-select");
    countrySelect.innerHTML = countryOptions.join("\n");
  })
  .catch((error) => {
    console.error(error);
  });
// fetch("countries.xml")
//   .then((response) => response.text())
//   .then((data) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(data, "application/xml");
//     const items = doc.getElementsByTagName("country");
//     console.log(items.length);
//     const countryNames = Array.from(items).map(
//       (countryNode) => countryNode.querySelector("name").textContent
//     );

//     console.log(countryNames);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// const countrySelect = document.getElementById("country-select");

// countryList.forEach((country) => {
//   const option = document.createElement("option");
//   option.value = country;
//   option.text = country.name;
//   countrySelect.add(option);
// });
