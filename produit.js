import { get } from "./config.js" // Importation de la requête AJAX
import { environment } from "./config.js"
/////////////////////

// Fonction de création de la page en fonction du produit choisi

const createItem = function () { // On créé une fonction qui va récupérer les informations du produit en question et les afficher dans la page
        
        const hash = window.location.hash // On créé une variable "hash" qui correspond au hash de l'URL qui a été chargée par l'utilisateur
        const id = hash.replace("#", "") // On reformate le "hash" pour lui enlever le symbole "#"
        const url = environment + "/api/cameras/" + id // L'URL chargée sera celle correspondant à l'id du produit

        get(url).then(function (response) { // Elle fera appel à la fonction get avec l'URL appropriée, la fonction get contenant une promesse, on lui indique quoi faire en cas de succès de la requête
                const item = response//Si la requête Xrh aboutie, il faudra créer une constante "item", qui sera la réponse de la promesse à savoir les informations du produit demandé
                // Création du titre contenant le nom de l'article
                const h3 = document.querySelector(".sheet .sheet__title")
                h3.innerText = item.name
                // Création des éléments nécessaires pour afficher la photo de l'article
                const img = document.querySelector(".sheet .sheet__img img")
                img.setAttribute("src", item.imageUrl) // On lui donne la source de l'image
                img.setAttribute("alt", item.name) // On lui donne l'attribut a renseigner pour l'image, ici le nom de l'appareil
                // Création du paragraphe contenant la description de l'article
                const specs = document.querySelector(".sheet .sheet__specs")
                specs.innerText = item.description
                // Création de l'ID du produit
                const id = document.querySelector(".sheet .sheet__id")
                id.innerText = item._id
                // Création du formulaire de choix de la lentille 
                // Création de la séléction de la lentille
                const select = document.getElementById("lenses-select")
                for (let i = 0; i < item.lenses.length; i++) {
                        const lense = item.lenses[i]
                        const option = select.appendChild(document.createElement("option"))
                        option.setAttribute("value", lense)
                        option.innerText = lense
                }
                // Ajout du prix
                const price = document.getElementById("price")
                const itemPrice = ((item.price) / 100)
                price.innerText = itemPrice + " €"

        }).catch(function (error) {// Si la requête Xhr échoue, on transmet un message d'erreur et on indique qu'un problème à eu lieu lors de la requête
                console.error("Erreur lors de la requête", error) // Le message est transmis à la console pour accès aux détails
                const sheet = document.querySelector(".sheet") // On accède à l'élément section de classe "main"
                const alert = sheet.appendChild(document.createElement("div")) // On y créer une "div"
                alert.classList.add("error") // On ajoute la classe "error" à la div pour traitement CSS
                alert.innerText = "Une erreur s'est produite lors du chargement de l'article" // On y affiche le message d'erreur
        })
}

// Ajout d'un écouteur d'événement sur le clique du formulaire, permettant d'ajouter le produit au panier et chargeant la page panier.htmls

const submit = document.getElementById("btn")
const id = document.querySelector(".sheet__id")
const lense = document.getElementById("lenses-select")
const qte = document.getElementById("qte")

submit.addEventListener("click", function (event) {
        //event.preventDefault()
        const order = {                       // Au moment du clique sur le bouton : création d'une constante "order" 
                _id: id.innerText,                     //qui contient l'id du produit
                lense: lense.value,                    //la valeur de la lentille selectionnée
                qte: qte.value,                         // la quantité voulue
        }     
 const stringOrder = JSON.stringify(order)      // On transforme cet objet en chaine de caractère
 sessionStorage.setItem("newOrder",stringOrder) // Qu'on va stocker dans le "session storage" du navigateur et qu'on nomme "newOrder"
})


createItem() // On appel la fonction pour créer notre page produit




