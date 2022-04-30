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
chooseRecipe();
receiptSortingFilter(recepty);


function generateContent(receptList){

    let body = document.getElementById("recepty");

    for (let i = 0; i < receptList.length; i++){
        let box = document.createElement('div');
        box.className = "recept";
        box.dataset.item = i;
        body.appendChild(box);

        let content = document.createElement("div");
        content.className = "recept-obrazek";
        box.append(content);

        let picture = document.createElement("img");
        picture.src = receptList[i].img;
        content.append(picture);

        let textBox = document.createElement("div");
        textBox.className = "recept-info";
        box.append(textBox);

        let header = document.createElement("h3");
        header.innerHTML = receptList[i].nadpis;
        textBox.append(header);


    }
}


function filterText(){
    let input = document.getElementById("hledat");
    let bigLetters= input.value.toUpperCase();
    let recipe = document.querySelectorAll(".recept");

    for (let i = 0; i < recipe.length; i++){
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
    categoryList.reverse();
    for(let i = 0; i < categoryList.length; i++){
        let optionValue = document.createElement("option");
        optionValue.innerHTML = categoryList[i];
       // optionValue.value = tagList[i];
        //optionValue.dataset.item = i;  //pridani datasetu na jednotlive polozky comboboxu 
        optionValue.value = i;
        select.appendChild(optionValue);
    }

    }


    function sortingList(){
        let sorting = document.querySelector(".razeni");
        let box = document.createElement("label");
        box.htmlFor = "razeni";
        box.innerHTML = "Seřadit";
        sorting.append(box);

        let select = document.createElement("select");
        select.id = "razeni";
        sorting.append(select);

        let option = document.createElement("option");
        option.value = "a";
        select.appendChild(option);

        for (let i = 0; i < 2; i++){
            dropDown= ['Od nejlepších', 'Od nejhorších'];

            let option = document.createElement("option");
            option.value = i + 1 ;
            option.innerHTML = dropDown[i];
            select.appendChild(option);
            
        }


    }


function chooseRecipe(){

    let clickedRecipe;

    let recipes = document.querySelectorAll(".recept");
    let data = Array.from(recipes, recipe => recipe.dataset.item);


    for(let i = 0; i < recipes.length; i++){
        recipes[i].addEventListener('click', function(){

            clickedRecipe = Number(data[i]);


            let boxPicture = document.querySelector(".recept-detail-obrazek");
            let boxCategory = document.querySelector(".recept-kategorie");
            let boxRating = document.querySelector (".recept-hodnoceni");
            let boxNameReceipt = document.querySelector (".recept-detail-info");
            

            let picture = document.getElementById("recept-foto");
            let category = document.getElementById("recept-kategorie");
            let rating = document.getElementById("recept-hodnoceni");
            let name = document.getElementById("recept-nazev");
            let description = document.getElementById("recept-popis");
            
            category.innerHTML = recepty[clickedRecipe].kategorie;
            picture.src = recepty[clickedRecipe].img;
            rating.innerHTML = recepty[clickedRecipe].hodnoceni;
            name.innerHTML = recepty[clickedRecipe].nadpis;
            description.innerHTML = recepty[clickedRecipe].popis;

            boxPicture.appendChild(picture);
            boxCategory.appendChild(category);
            boxRating.appendChild(rating);
            boxNameReceipt.appendChild(name);
            boxNameReceipt.appendChild(description);
        })

    }
}


function receiptSortingFilter(receptList){
    
    let select = document.getElementById("razeni");

    select.addEventListener('change',function(){
        if(select.value === "1"){
            for (let i=0; i < receptList.length; i++){
                let parent = document.getElementById("recepty");
                let child = document.querySelector(".recept");
                parent.removeChild(child);
           
            }
            
            receptList.reverse(receptList.sort(function(a,b){
                if (a.hodnoceni < b.hodnoceni){
                    return -1
                }
                if (a.hodnoceni > b.hodnoceni){
                    return 1;
                }
                return 0;
        
            }))
            generateContent(receptList);
            chooseRecipe();
        
        
        }else if (select.value === "2"){

            for (let i=0; i < receptList.length; i++){
                let parent = document.getElementById("recepty");
                let child = document.querySelector(".recept");
                parent.removeChild(child);
            }

            receptList.sort(function(a,b){
                if (a.hodnoceni < b.hodnoceni){
                    return -1;
                }
                if (a.hodnoceni > b.hodnoceni){
                    return 1;
                }
                return 0;
            })
            generateContent(receptList);
            chooseRecipe();
            
        }else if (select.value === "a"){
            for (let i=0; i < recepty.length; i++){
                let parent = document.getElementById("recepty");
                let child = document.querySelector(".recept");
                parent.removeChild(child);
            }
            generateContent(recepty);
            chooseRecipe();
            console.log("Posledni podminka");
            console.log(recepty);


        }
    
    })

}





function categorySortingFilter(){
    
    let select = document.getElementById("kategorie");
    let recipes = document.getElementById("recepty");
    let collectedCategory;
 

    select.addEventListener('change',function(){
        

        if(select.value === "0"){
            collectedCategory = [];
            for (let i = 0; i < recepty.length; i++){
                if (recepty[i].stitek === "snidane"){
                    collectedCategory.push(recepty[i]);  
                    console.log(collectedCategory);
                 

    
                }
               
            }

           

        }else if(select.value ==="1"){
            collectedCategory = [];
            for (let i =0; i < recepty.length; i++){

                if (recepty[i].stitek === "hlavniJidlo"){
                    collectedCategory.push(recepty[i])
                    console.log(collectedCategory);
                }
            }

        }else if(select.value === "2"){
            collectedCategory = [];
        for (let i = 0; i < recepty.length; i++){
            if(recepty[i].stitek === "dezert"){
                collectedCategory.push(recepty[i]);
                console.log(collectedCategory);
            }
        }
        }
       
  
    })
}

                   
categorySortingFilter();





/*
function ratingSorting( a, b )
  {
  if ( a.hodnoceni < b.hodnoceni){
    return -1;
  }
  if ( a.hodnoceni > b.hodnoceni){
    return 1;
  }
  return 0;
}

*/



// je potreba vyresit filtrovani podle kategorie - je potreba dokoncit
// je potreba doresit scroll bar 
// je potreba doresit vraceni receptu do vychoziho stavu pote co se nepouziva sortovaci combo box
// je potreba doresit prostredni stranku (aby byla ciste bila bez naznaku obrazku a kategorie a bylo do ni mozne prokliknout)
// je potreba doresit ulozeni posledniho vybraneho receptu do LocalStorage


// *** NEPOVINNE / AZ BUDE VSE HOTOVO -->> PRI LOADU STRANKY ZAJISTIT NACTENI RECEPTU (NEJLEPSI, POSLEDNI, PRVNI...ETC);

