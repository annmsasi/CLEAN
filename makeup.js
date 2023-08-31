"use strict"
/* const products = require('./sephora_website_dataset.json');
 */
const ingredients = ["Titanium dioxide",
"Retinol/retinyl esters",
"Cocamide diethanolamine",
"Butylated hydroxyanisole",
"Carbon black",
"Mica",
"Silica",
"Mineral oil",
"Triethanolamine",
"Talc",
"Estragole",
"Methyleugenol",
"Formaldehyde",
"Coffee",
"Cocamide MEA",
"monoethanolamine",
"Toluene",
"1,4-Dioxane",
"Styrene",
"Acetaldehyde",
"Coal tar",
"Phenacetin",
"Safrole",
"Benzophenone",
"Ethylene oxide",
"Progesterone",
"Lauramide diethanolamine",
"Diethanolamine",
"Benzophenone-3",
"Ginkgo biloba extract",
"Caffeine",
"Di-n-butyl phthalate (DBP)",
"Ethylene glycol",
"Oil Orange SS","FD&C Orange No. 2",
"Quartz",
"N-Methylpyrrolidone",
"Quinoline",
"Arsenic",
"retinoic acid",
"o-Phenylphenol",
"Aspirin",
"Lead",
"Methyl chloride",
"2,4-Hexadienal",
"beta-Myrcene",
"Dichloromethane","methylene chloride",
"Genistein",
"Lead acetate",
"Methanol",
"o-Phenylenediamine",
"Selenium sulfide",
"C.I. Acid Red 114",
"Propylene oxide",
"Pulegone",
"Benzene",
"Benzyl chloride",
"Caffeic acid",
"Ethyl acrylate",
"Mercury",
"Musk xylene",
"N-Nitrosodimethylamine",
"Acrylamide",
"Avobenzone",
"Chromium (hexavalent compounds)",
"Dichloroacetic acid",
"Propylene glycol mono-t-butyl ether",
"Benzophenone-4",
"Ethanol in alcoholic beverages",
"Nickel (metallic)",
"p-Aminodiphenylamine",
"Permethrin",
"TEA-Lauryl sulfate","triethanolamine lauryl sulfate",
"Acetylsalicylic acid",
"Cadmium",
"Sodium bromate",
"Titanium dioxide ",
"Methenamine",
"Quaternium-15",
"Diazolidinyl Urea",
"DMDM Hydantoin",
"Imidazolidinyl Urea",
"Coal tar",
"Coal tar solution",
"Coal tar pitch",
"Cresols",
"Cresylic Acid",
"Naphthalene",
"Phenol",
"Benzo(a)pyrene",
"Phenanthrene",
"Anthracene",
"Chrysene",
"Hydroquinone",
"Lead",
"Arsenic",
"Cadmium",
"Mercury",
"Diethyl Phthalate (DEP)",
"Diethyl Phthalate",
"Dimethyl Phthalate",
"Dimethyl Phthalate (DMP)",
"Di-n-butyl Phthalate",
"Di-n-butyl Phthalate (DBP)",
"Di(2-ethylhexyl) Phthalate",
"Di(2-ethylhexyl) Phthalate (DEHP)",
"Toluene",
"Methylparaben",
"Ethylparaben",
"Propylparaben",
"Butylparaben",
"Triclosan",
"Benzophenone-3",
"Oxybenzone",
"Oxybenzone",
"Benzophenone-4",
"Benzophenone-5",
"Sulisobenzone",
"Sulisobenzone",
"Talc",
"Petrolatum",
"Mineral Oil",
"Butylated Hydroxyanisole (BHA)",
"Butylated Hydroxytoluene (BHT)",
"Butylated Hydroxytoluene",
"Butylated Hydroxyanisole",
"Sodium Lauryl Sulfate",
"Sodium Laureth Sulfate",
"Diethanolamine",
"Triethanolamine",
"Monoethanolamine",
"Polyethylene Glycols",
"Sodium Lauryl Sulfate (SLS)",
"Sodium Laureth Sulfate (SLES)",
"Diethanolamine (DEA)",
"Triethanolamine (TEA)",
"Monoethanolamine (MEA)",
"Ethylene Oxide",
"Polyethylene Glycols (PEGs)",
"Sodium Myreth Sulfate",
"Cocamide DEA",
"Lauramide DEA",
"Oleamide DEA",
"Retinyl Palmitate",
"Vitamin A Palmitate",
"Aluminum Compounds",
"Cyclotetrasiloxane (D4)",
"Cyclopentasiloxane (D5)",
"Cyclohexasiloxane (D6)",
"Cyclotetrasiloxane"
];
document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("product");
    const submitButton = document.getElementById("Enter");
    const output = document.getElementById("result");

    submitButton.addEventListener("click", function() {
        const product = userInput.value;
        

fetch('./sephora_website_dataset.json')
    .then(response => response.text())
    .then(parsedData =>{
        try{
        console.log(product)
        const products = JSON.parse(parsedData);
        let prod_ing = "";
        for (const productObj of products) {
            if (productObj.name.toLowerCase() == product.toLowerCase()) {
                prod_ing = productObj.ingredients;
                break;
                }
            }
            console.log(product)
            console.log(prod_ing)
        if (prod_ing === "unknown" || prod_ing === "") {
            output.textContent = ("Sorry, the ingredients of this product are currently not accessible to me.");
        }else{
        let parts = prod_ing.split("Clean at Sephora", 2);
        prod_ing = parts[0];
        prod_ing = prod_ing.replace("(+/-)", "");
        let ings = prod_ing.split("-");
        let final_ingredients = []

        for (let prod of ings){
            final_ingredients.push(prod.trimStart())
        }
        for (let prod in final_ingredients){
            prod = prod.replace(".", "")
            prod = prod.replace("*","")
            prod = prod.replace(" ","")
        }
        
        let lower_ing = [];
        for (let i of ingredients){
            lower_ing.push(i.toLowerCase())
        }
        let count = 0;
        let carc_ings = [];
        for (let i in final_ingredients){
            let ing = final_ingredients[i].toLowerCase();
            if (final_ingredients[i] in ingredients){
                carc_ings.push(ing);
                count++;
            } else if (lower_ing.includes(ing)) {
                carc_ings.push(ing);
                count++;

            } else if (ing.includes("peg")) {
                carc_ings.push(ing);
                count++;

            } else if (ing.includes("dea")) {
                carc_ings.push(ing);
                count++;
            } else if (ing.includes("bha")) {
                carc_ings.push(ing);
                count++;
            } else if (ing.includes("aluminum")) {
                carc_ings.push(ing);
                count++;
            } else if (ing.includes("bht")) {
                carc_ings.push(ing);
                count++;

            } else if (ing.includes("lead")) {
                carc_ings.push(ing);
                count++;

            } else if (ing.includes("mica")) {
                carc_ings.push(ing);
                count++;
            }
            }
            console.log(carc_ings.length)
            let grade = ""
            if (carc_ings.length > 0 ){
                output.textContent = `I found the following potentially harmful ingredients:\n ${carc_ings}`;
            }
            else if(carc_ings.length == 0){
                output.textContent = `I found no potentially harmful products in ${product}!`;
            }
        }
        } catch (error) {
            if (error instanceof ReferenceError) {
                output.textContent = "A product was not entered."
            } else {
                output.textContent = "Sorry! I encountered an error :("
            }
        }
    })
    .catch(error => console.error(error));
});
});