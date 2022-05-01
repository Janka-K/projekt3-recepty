/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

generateContent(recepty);
categoryList();
sortingList();
chooseRecipe(recepty);
receiptSortingFilter();
categorySortingFilter();

function generateContent(receiptList) {
  let body = document.getElementById("recepty");

  let valueLastClicked = localStorage.getItem("lastClickedRecipe"); // vytazeni dat z localStorage (skutecna data/null, lastClickedRecie -->> promenna, do ktere se ukladaji kliknute recepty )

  if (valueLastClicked === null || valueLastClicked === undefined) { // overuje zda v localStorage je nejaka hodnota,pokud je localStorage prazdna -> zobrazi se prazdna stranka bez detaily receptu
    let middleBox = document.querySelector(".recept-detail");
    middleBox.style.display = "none";
  } else {
    let lastClicked = JSON.parse(localStorage.lastClickedRecipe); // v pripade, ze v localStorage je ulozeny nejaky obsah - provede parsovani ulozenych hodnot a vypise nize uvedeny kod

    let boxPicture = document.querySelector(".recept-detail-obrazek"); // do budoucna kod na radcich 39 - 60 nahradit funkci, z duvodu casoveho nedostatku reseno takto
    let boxCategory = document.querySelector(".recept-kategorie");
    let boxRating = document.querySelector(".recept-hodnoceni");
    let boxNameReceipt = document.querySelector(".recept-detail-info");

    let picture = document.getElementById("recept-foto");
    let category = document.getElementById("recept-kategorie");
    let rating = document.getElementById("recept-hodnoceni");
    let name = document.getElementById("recept-nazev");
    let description = document.getElementById("recept-popis");

    category.innerHTML = lastClicked.kategorie;
    picture.src = lastClicked.img;
    rating.innerHTML = lastClicked.hodnoceni;
    name.innerHTML = lastClicked.nadpis;
    description.innerHTML = lastClicked.popis;

    boxPicture.appendChild(picture);
    boxCategory.appendChild(category);
    boxRating.appendChild(rating);
    boxNameReceipt.appendChild(name);
    boxNameReceipt.appendChild(description);
  }

  for (let i = 0; i < receiptList.length; i++) {
    let box = document.createElement("div");
    box.className = "recept";
    box.dataset.item = i;
    body.appendChild(box);

    let content = document.createElement("div");
    content.className = "recept-obrazek";
    box.append(content);

    let picture = document.createElement("img");
    picture.src = receiptList[i].img;
    content.append(picture);

    let textBox = document.createElement("div");
    textBox.className = "recept-info";
    box.append(textBox);

    let header = document.createElement("h3");
    header.innerHTML = receiptList[i].nadpis;
    textBox.append(header);
  }
}

function filterText() {
  let input = document.getElementById("hledat");
  let bigLetters = input.value.toUpperCase();
  let recipe = document.querySelectorAll(".recept");

  for (let i = 0; i < recipe.length; i++) {
    let box = recipe[i].getElementsByTagName("h3")[0];
    let txtValue = box.textContent || box.innerText;
    if (txtValue.toUpperCase().indexOf(bigLetters) > -1) {
      recipe[i].style.display = "";
    } else {
      recipe[i].style.display = "none";
    }
  }
}

function categoryList() {
  let kategorie = document.querySelector(".kategorie");
  let box = document.createElement("label");
  box.htmlFor = "kategorie";
  box.innerHTML = "Kategorie";
  kategorie.append(box);

  let select = document.createElement("select");
  select.id = "kategorie";
  kategorie.append(select);

  let option = document.createElement("option");
  option.value = " ";
  select.appendChild(option);

  let categoryList = [...new Set(recepty.map((item) => item.kategorie))]; // vytvoreni seznamu unikatnich hodnot - vyber unikatnich kategorii
  categoryList.reverse();
  for (let i = 0; i < categoryList.length; i++) {
    let optionValue = document.createElement("option");
    optionValue.innerHTML = categoryList[i];
    optionValue.value = i;
    select.appendChild(optionValue);
  }
}

function sortingList() {
  dropDown = ["Od nejlepších", "Od nejhorších"];

  let sorting = document.querySelector(".razeni");
  let box = document.createElement("label");
  box.htmlFor = "razeni";
  box.innerHTML = "Seřadit";
  sorting.append(box);

  let select = document.createElement("select");
  select.id = "razeni";
  sorting.append(select);

  let option = document.createElement("option");
  option.value = " ";
  select.appendChild(option);

  for (let i = 0; i < dropDown.length; i++) {
    let option = document.createElement("option");
    option.value = i + 1;
    option.innerHTML = dropDown[i];
    select.appendChild(option);
  }
}

function chooseRecipe(receiptList) {
  let clickedRecipe;

  let recipes = document.querySelectorAll(".recept");
  let data = Array.from(recipes, (recipe) => recipe.dataset.item);

  for (let i = 0; i < recipes.length; i++) {
    recipes[i].addEventListener("click", function () {
      clickedRecipe = Number(data[i]);

      let lastClickedRecipe = receiptList[clickedRecipe];
      localStorage.lastClickedRecipe = JSON.stringify(lastClickedRecipe);

      let boxPicture = document.querySelector(".recept-detail-obrazek");
      let boxCategory = document.querySelector(".recept-kategorie");
      let boxRating = document.querySelector(".recept-hodnoceni");
      let boxNameReceipt = document.querySelector(".recept-detail-info");

      let picture = document.getElementById("recept-foto");
      let category = document.getElementById("recept-kategorie");
      let rating = document.getElementById("recept-hodnoceni");
      let name = document.getElementById("recept-nazev");
      let description = document.getElementById("recept-popis");

      category.innerHTML = receiptList[clickedRecipe].kategorie;
      picture.src = receiptList[clickedRecipe].img;
      rating.innerHTML = receiptList[clickedRecipe].hodnoceni;
      name.innerHTML = receiptList[clickedRecipe].nadpis;
      description.innerHTML = receiptList[clickedRecipe].popis;

      boxPicture.appendChild(picture);
      boxCategory.appendChild(category);
      boxRating.appendChild(rating);
      boxNameReceipt.appendChild(name);
      boxNameReceipt.appendChild(description);

      let middleBox = document.querySelector(".recept-detail");
      middleBox.style.display = "block";
    });
  }
}

function receiptSortingFilter() {
  let receptyCopy = [...recepty];

  let select = document.getElementById("razeni");

  select.addEventListener("change", function () {
    if (select.value === "1") {
      for (let i = 0; i < receptyCopy.length; i++) {
        let parent = document.getElementById("recepty");
        let child = document.querySelector(".recept");
        parent.removeChild(child);
      }

      receptyCopy.reverse(
        receptyCopy.sort(function (a, b) {
          if (a.hodnoceni < b.hodnoceni) {
            return -1;
          }
          if (a.hodnoceni > b.hodnoceni) {
            return 1;
          }
          return 0;
        })
      );
      generateContent(receptyCopy);
      chooseRecipe(receptyCopy);
    } else if (select.value === "2") {
      for (let i = 0; i < receptyCopy.length; i++) {
        let parent = document.getElementById("recepty");
        let child = document.querySelector(".recept");
        parent.removeChild(child);
      }

      receptyCopy.sort(function (a, b) {
        if (a.hodnoceni < b.hodnoceni) {
          return -1;
        }
        if (a.hodnoceni > b.hodnoceni) {
          return 1;
        }
        return 0;
      });
      generateContent(receptyCopy);
      chooseRecipe(receptyCopy);
    } else if (select.value === " ") {
      for (let i = 0; i < recepty.length; i++) {
        let parent = document.getElementById("recepty");
        let child = document.querySelector(".recept");
        parent.removeChild(child);
      }
      generateContent(recepty);
      chooseRecipe(recepty);
    }
  });
}

function categorySortingFilter() {
  let select = document.getElementById("kategorie");
  let recipes = document.getElementById("recepty");

  let breakfast = [];

  let mainMeal = [];

  let sweets = [];

  for (let i = 0; i < recepty.length; i++) {
    if (recepty[i].stitek === "snidane") {
      breakfast.push(recepty[i]);
    } else if (recepty[i].stitek === "hlavniJidlo") {
      mainMeal.push(recepty[i]);
    } else if (recepty[i].stitek === "dezert") {
      sweets.push(recepty[i]);
    }
  }

  select.addEventListener("change", function () {
    if (select.value === "0") {
      for (let i = 0; i < recepty.length; i++) {
        let child = document.querySelector(".recept");
        if (child != null) {
          recipes.removeChild(child);
        }
      }
      generateContent(breakfast);
      chooseRecipe(breakfast);
    } else if (select.value === "1") {
      for (let i = 0; i < recepty.length; i++) {
        let child = document.querySelector(".recept");
        if (child != null) {
          recipes.removeChild(child);
        }
      }
      generateContent(mainMeal);
      chooseRecipe(mainMeal);
    } else if (select.value === "2") {
      for (let i = 0; i < recepty.length; i++) {
        let child = document.querySelector(".recept");
        if (child != null) {
          recipes.removeChild(child);
        }
      }
      generateContent(sweets);
      chooseRecipe(sweets);
    } else if (select.value === " ") {
      for (let i = 0; i < recepty.length; i++) {
        let child = document.querySelector(".recept");
        if (child != null) {
          recipes.removeChild(child);
        }
      }
      generateContent(recepty);
      chooseRecipe(recepty);
    }
  });
}

