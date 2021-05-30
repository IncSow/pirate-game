let keyNeeded = 38 //Fléche du haut
let keyCombo = 0

function konamiCode(event) {    // Ce code permets de detecter un konami code

    if (event.keyCode== keyNeeded) { //Si touche appuyée = touche demandée, combo +1
        keyCombo += 1

        if (keyCombo== 2) { // Une fois que l'on a appuyé 2 fois sur haut
            console.log('maintenant, bas')
            keyNeeded = 40 // Fléche du bas
        }
        else if (keyCombo== 4) { // Après avoir appuyé 2 fois sur la touche du bas
            keyNeeded = 37 // Fléche de gauche
            console.log("maintenant, gauche")
        }

        else if (keyCombo == 5) { 
            keyNeeded = 39 // Touche de droite
            console.log("maintenant, droite")
        }

        else if (keyCombo == 6) { 
            keyNeeded = 37 // Touche de gauche
            console.log("maintenant, gauche")
        }

        else if (keyCombo == 7) {
            keyNeeded = 39 //Touche de droite
            console.log("maintenant, droite")
        }

        else if (keyCombo == 8) { // Une fois le konami code réalisé (sans b a start select), réussite!
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ") // Lien vers la vidéo de succès
        }

        else{
            console.log("again") // Instruction disant de réappuyer sur la touche du haut/bas durant le combo
        }
    }
    else{ // Réintilisation en cas d'erreur!
        keyCombo = 0
        keyNeeded = 38
    }
}