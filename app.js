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

generateContent();
categoryList();
sortingList();

function generateContent(){

    let body = document.getElementById("recepty");

    for (i = 0; i < recepty.length; i++){
        let box = document.createElement('div');
        box.className = "recept";
        body.appendChild(box);

        let content = document.createElement("div");
        content.className = "recept-obrazek";
        box.append(content);

        let picture = document.createElement("img");
        picture.src = recepty[i].img;
        content.append(picture);

        let textBox = document.createElement("div");
        textBox.className = "recept-info";
        box.append(textBox);

        let header = document.createElement("h3");
        header.innerHTML = recepty[i].nadpis;
        textBox.append(header);


    }
}


function filterText(){
    let input = document.getElementById("hledat");
    let bigLetters= input.value.toUpperCase();
    let recipe = document.querySelectorAll(".recept");

    for (i = 0; i < recipe.length; i++){
        let box = recipe[i].getElementsByTagName("h3")[0];
        let txtValue = box.textContent || box.innerText;
        if (txtValue.toUpperCase().indexOf(bigLetters) > -1 ){
            recipe[i].style.display = "";
        }else {
            recipe[i].style.display = "none";
        }

    }   

}


function categoryList(){

    let kategorie = document.querySelector(".kategorie");
    let box = document.createElement("label");
    box.htmlFor = 'kategorie';
    box.innerHTML = "Kategorie";
    kategorie.append(box);

    let select = document.createElement("select");
    select.id = 'kategorie';
    kategorie.append(select);

    let option = document.createElement("option");
    option.value = " ";
    select.appendChild(option);

    let categoryList = [...new Set(recepty.map((item) => item.kategorie))]; // vytvoreni seznamu unikatnich hodnot - vyber unikatnich kategorii
    let tagList = [...new Set(recepty.map((item) => item.stitek))];
    for(i = 0; i < categoryList.length; i++){
        let optionValue = document.createElement("option");
        optionValue.innerHTML = categoryList[i];
        optionValue.value = tagList[i];
        select.appendChild(optionValue);
    }

    }


    function sortingList(){
        let razeni = document.querySelector(".razeni");
        let box = document.createElement("label");
        box.htmlFor = "razeni";
        box.innerHTML = "Seřadit";
        razeni.append(box);

        let select = document.createElement("select");
        select.id = "razeni";
        razeni.append(select);

        let option = document.createElement("option");
        option.value = " ";
        select.appendChild(option);

        let option1 = document.createElement("option");
        option1.value = "1";
        option1.innerHTML = "Od nejlepších";
        select.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = "2";
        option2.innerHTML = "Od nejhorších";
        select.appendChild(option2);


    }

  

// je potreba vyresit filtrovani podle kategorie
// je potreba vyresit filtrovani podle oblibenosti (poctu hvezdicek)
// je potreba vyresit proklik receptu na hlavni stranku
