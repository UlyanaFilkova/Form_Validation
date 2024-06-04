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

fetch("https://ipinfo.io/json")
  .then((response) => response.json())
  .then((data) => {
    const userCountryCode = data.country;
    console.log(userCountryCode);

    // Загрузка countries.xml
    return fetch("countries.xml")
      .then((response) => response.text())
      .then((xmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "application/xml");

        // Поиск страны по коду в countries.xml
        const countryNode = Array.from(
          xmlDoc.getElementsByTagName("country")
        ).find(
          (node) => node.querySelector("alpha2").textContent === userCountryCode
        );
        if (countryNode) {
          const countryName = countryNode.querySelector("name").textContent;
          console.log("Полное название страны:", countryName);

          // Установка выбранной страны по умолчанию
          const countrySelect = document.getElementById("country-select");
          const alpha3 = countryNode.querySelector("alpha3").textContent;
          countrySelect.value = alpha3;
        } else {
          console.log("Страна не найдена в countries.xml");
        }
      });
  })
  .catch((error) => {
    console.error(error);
  });

const input = document.getElementById("phone-number");
window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function (callback) {
    $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
      var countryCode = resp && resp.country ? resp.country : "";
      callback(countryCode);
    });
  },
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.9/build/js/utils.js",
});
