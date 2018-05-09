// Made with love by Lijerbul LJOBOY : +243991888702
'use strict';
var context = document.getElementById('puzzle').getContext('2d'); //On réccupère le canvas

var Coup = document.getElementById('nbCoup'); //On réccupère le compteur de coup
var nbCoup = 0; //On crée une variable compteur qui comptera le nombre des coup

var startTime = new Date().getTime(); //On reccupère l'heure de départ

var img = new Image(); //On crée un objet de type image
img.addEventListener('load', divCarro, false); //On ajoute un écouteur d'événement et on y met l'évenelent 'load' ou chargement car elle es déclencher par le charment de la page

//On réccupère le radio bouton qui détermine le niveau
var easy = document.getElementById('easy'); //facile
var medium = document.getElementById('medium'); //moyen
var hard = document.getElementById('hard'); //difficile

var images = [ //On crée un objet tableau qui contient les noms et les titres de tous nos images
    { src: 'images/puzzle/london-bridge.jpg', title: 'London Bridge' },
    { src: 'images/puzzle/cr7.jpg', title: 'Cristiano RONALDO' },
    { src: 'images/puzzle/rick.jpg', title: 'Rick M\'SEWA' },
    { src: 'images/puzzle/gloire.jpg', title: 'Gloire MISELA' },
    { src: 'images/puzzle/mis.jpg', title: 'MISELA Gloire' },
    { src: 'images/puzzle/clara.jpg', title: 'Clara' },
    { src: 'images/puzzle/clara2.jpg', title: 'Clarisse' },
    { src: 'images/puzzle/dora.jpg', title: 'Dora MWEMBO' },
    { src: 'images/puzzle/moloto.jpg', title: 'Alain MOLOTO' },
    { src: 'images/puzzle/dora2.jpg', title: 'MWEMBO Dora' },
    { src: 'images/puzzle/flowers.jpg', title: 'Fleurs Orange' },
    { src: 'images/puzzle/lotus-temple.jpg', title: 'Lotus Temple' },
    { src: 'images/puzzle/qutub-minar.jpg', title: 'Qutub Minar' },
    { src: 'images/puzzle/ell.jpg', title: 'Pervinah VUVU' },
    { src: 'images/puzzle/statue-of-liberty.jpg', title: 'Statue de la Liberté' },
    { src: 'images/puzzle/prisca.jpg', title: 'Prisca MULOMBOLE' },
    { src: 'images/puzzle/taj-mahal.jpg', title: 'Taj Mahal' }
];

var imgMin = document.getElementById('actualImage'); //On réccupère l'image minimifier en tant qu'objet
imgMin.src = img.src; //On place l'image actuelle dans l'image minimifier

var tayEcran = document.getElementById('puzzle').width; //On réccupère la taille de notre puzzle
var nbCarro;
//On vérifie le niveau par le radio boutton qui est coché et on réccupère ca valeur
if (easy.checked) { //niveau facile
    nbCarro = easy.value; //On réccupère sa valeur
} else if (medium.checked) { //niveau moyen
    nbCarro = medium.value; //On réccupère sa valeur
} else if (hard.checked) { //niveau difficile
    nbCarro = hard.value; //On réccupère sa valeur
}

var tayCarro = tayEcran / nbCarro; //On calcule la taille d'un carreau par rapport à leur nombre

var posClic = new Object; //On déclare un objet pour réccupérer la position du carreau sur le quel on a cliquer
//Par rapport à l'axe des x et y
posClic.x = 0; //l'axe des x instancier à 0
posClic.y = 0; //l'axe des y instancier à 0

var caseVide = new Object; //On déclare un objet pour réccupérer la position du carreau vide
caseVide.x = 0;
caseVide.y = 0;

var gagner = false; //On déclare un booléen pour vérifier s'il a gagné ou pas

var partEcran; // On déclare une variable partionnement de l'ecran
Ecran(); //On fait appelle à la fonction de partitionnement de l'écran

function checnivo() { //On crée une fonction pour vérifier le niveau par le bouton radio qui sera concher
    //voir le début
    if (easy.checked) {
        nbCarro = easy.value;
    } else if (medium.checked) {
        nbCarro = medium.value;
    } else if (hard.checked) {
        nbCarro = hard.value;
    }
    nbCoup = 0; //On réinitialise le nombre des coups à 0
    startTime = new Date().getTime(); //On réinitialise le temps de début
    Coup.innerHTML = nbCoup; //On affiche le nombre des coups
    tayCarro = tayEcran / nbCarro; //On rédefini la taille d'une case ou carreau
    Ecran(); //On fait appelle à la fonction de partitionnement de l'écran
    divCarro(); //On fait appelle à la fonction qui place les images dans notre écran
}


//On déclare notre fonction qui va écouter l'évenement click sur notre puzzle et qui réccupère en paramètres l'évenement de la souris
document.getElementById('puzzle').onclick = function(e) {
    posClic.x = Math.floor((e.pageX - this.offsetLeft) / tayCarro); //On réccupère la position par rapport à x la position du carreau ou l'on a cliquer
    posClic.y = Math.floor((e.pageY - this.offsetTop) / tayCarro); //On fait la même chose par rapport à y
    //On vérifie que le carreau cliquer est à coter du carreau vide
    if (distance(posClic.x, posClic.y, caseVide.x, caseVide.y) == 1) { //et pour ca on fais appel à la fonction distance
        depEcran(caseVide, posClic); //On appel la fonction qui déplace les carreaux en lui donnant en paramètres la case vide et la position du clic
        divCarro(); //On rédivise les carreaux
    }
    if (gagner) { //Si l'on gagne à l'espace d'une demie séconde on fait appel à la fonction swal
        //N.B: nous avons fait appel à la fonction swal de material design pour embelir le jeux
        var now = new Date().getTime();
        var winTimes = parseInt((now - startTime) / 1000, 10);
        setTimeout(function() {
            swal({
                    title: "C'est gagner ! en " + nbCoup + " Coups et " + temps(winTimes) + ' Séc.', //titre de la page qui s'affichera
                    text: "Vous pouvez soit changer d'image soit passer au niveau suivant.", //texte à afficher
                    type: "success", //type de message n.b: il y a (warning, info, success et error) comme type
                    showCancelButton: true, //afficher le bouton annuler
                    confirmButtonColor: "#DD6B55", //couleur du boutton confirmer ou suivant
                    confirmButtonText: "Niveau suivant", //texte du boutton confirmer
                    cancelButtonText: "Changer d'image", //texte du boutton annuler
                    closeOnConfirm: false, //fermer quand on click sur suivant: Ici nous avons mis le booléen faux
                    closeOnCancel: false
                }, //fermer quand on click sur annuler: Ici nous avons mis le booléen faux
                //On crée une fonction pour le cas où l'on click sur le bouton confirmer
                function(isConfirm) { //On le donne en paramètre notre bouton
                    if (isConfirm) { //On vérifie qu'il est cliquer
                        swal("Bonne Chance!", "Vous voilà au niveau suivant, faites preuve de courage et continuer", "success"); //On affiche un message
                        //Puis on vérifie le niveau actuel pour passer aux suivant
                        if (easy.checked) { //si le niveau est à facile
                            easy.checked = false; //On décoche le niveau facile
                            medium.checked = true; //On coche le niveau moyen
                        } else if (medium.checked) { //Si c'est moyen
                            medium.checked = false; //On décoches moyen
                            hard.checked = true; //On coche le niveau difficile
                        } else if (hard.checked) { //Si c'est oui
                            //On affiche un message d'erreur parcequ'il n'y a pas des niveau supérieure à difficile
                            swal("Mauvaise nouvelle", "Vous êtes déjà dans le dernier niveau je ne peux que changer votre image svp! :)", "error");
                        }
                        chFoto(); //Puis on changes d'images (dans tous les cas)
                    } else { //Sinon donc lorsqu'on click sur annuler(changer d'image)
                        //On affiche un message
                        swal("Bonne chance!", "Réessayer avec la nouvelle image et on verra si vous aurez toujours autant de chance! :)", "warning");
                        chFoto(); //On change d'images
                    }
                });
        }, 500); //500 millisécondes (une demie séconde)
    }
};

//On crée une fonction qui divise notre écran en case
function Ecran() {
    partEcran = new Array(nbCarro); //On crée un tableau avec comme indice max les nombres des cases réprésentant le niveau des difficultés
    for (var i = 0; i < nbCarro; ++i) { //On crée une première boucle qui tourne jusqu'au nombre des cases
        partEcran[i] = new Array(nbCarro); //On crée un deuxième tableau toujours avec les nombres des cases
        // (partEcran devient alors un tableau multidimensionnelles)
        for (var j = 0; j < nbCarro; ++j) { //Une deuxième boucle qui tourne toujours jusqu'à nbCarro
            partEcran[i][j] = new Object; //partEcran(bidimensionnelle) devient objet
            partEcran[i][j].x = (nbCarro - 1) - i; //On affecte sa position par rapport à x
            partEcran[i][j].y = (nbCarro - 1) - j; //puis à y
        }
    }
    caseVide.x = partEcran[nbCarro - 1][nbCarro - 1].x; //On place la case vide par rapport à x
    caseVide.y = partEcran[nbCarro - 1][nbCarro - 1].y; //Puis par rapport à y
    gagner = false; //On dit que gagner = faux
}

//On crée la fonction qui découpe notre image et la place dans nos carreaux ou cases
function divCarro() {
    context.clearRect(0, 0, tayEcran, tayEcran); //On vide notre écran
    for (var i = 0; i < nbCarro; i++) { //On crée une première boucle qui tourne jusqu'au nombre des cases
        for (var j = 0; j < nbCarro; j++) { //On crée une deuxième boucle qui tourne jusqu'au nombre des cases
            //On affecte à x et à y la valeur contenu dans partEcran donc la position de notre case
            var x = partEcran[i][j].x;
            var y = partEcran[i][j].y;
            //On vérifie que l'on a pas encore ganger et que la case actuelle est différente de la case vide
            if (i != caseVide.x || j != caseVide.y || gagner == true) {
                //On utilise la méthode drawImage() qui découpe notre image en partie et reduit sa taille
                //Elle prend en paramètre l'image, son sa position par rapport à x et y, sa hauteur, sa largeur,
                //sa position de début par rapport x, sa position de début par rapport y, la taille de l'image découpée (largeur, longueur)
                context.drawImage(img, x * tayCarro, y * tayCarro, tayCarro, tayCarro, i * tayCarro, j * tayCarro, tayCarro, tayCarro);
            }
        }
    }
}

//On crée la fonction distance qui vérifie la distance entre 2 case (1 quand c'est proche)
function distance(x1, y1, x2, y2) { //elle prend en paramètres les coordonnées des 2 cases donc leurs x et y respectivements
    return Math.abs(x1 - x2) + Math.abs(y1 - y2); //puis return un nombre resultent de l'addition de la différence de leur x et de leur y
}

//On crée une fonction qui déplace nos carreaux
function depEcran(toLoc, fromLoc) { //elle prend en paramètres les deux cases en tant qu'objet
    if (!gagner) { //On vérifie que gagner soit faux (Quand on gagne on ne déplace plus rien on reconstitue
        partEcran[toLoc.x][toLoc.y].x = partEcran[fromLoc.x][fromLoc.y].x; //On déplace le x du premier dans le second
        partEcran[toLoc.x][toLoc.y].y = partEcran[fromLoc.x][fromLoc.y].y; //On déplace le y du premier dans le second
        //On fait nbCarro moins 1 pour mettre le sécond dans la place du premier
        partEcran[fromLoc.x][fromLoc.y].x = nbCarro - 1; //par rapport à x
        partEcran[fromLoc.x][fromLoc.y].y = nbCarro - 1; //par rapport à y
        //On déplace leur image maintenant
        toLoc.x = fromLoc.x; //par rapport à x
        toLoc.y = fromLoc.y; //par rapport à y
        nbCoup = ++nbCoup; //On incrémente le nombre des coups
        Coup.innerHTML = nbCoup; //puis on l'affiche (le nombre des coups)
        checkgagner(); //On vérifie s'il a gagné
    }
}

//On crée la fonction qui vérifie si l'on a gagné
function checkgagner() {
    var flag = true; //On crée un drapeau qui sera lévé si l'on gagne (il baisser par )
    for (var i = 0; i < nbCarro; ++i) { //On crée une première boucle qui tourne jusqu'au nombre des carreaux (longueur)
        for (var j = 0; j < nbCarro; ++j) { //On crée une deuxième boucle qui tourne jusqu'au nombre des carreaux (largeur)
            if (partEcran[i][j].x != i || partEcran[i][j].y != j) { //si la position actuelle est différent de la vrai positon
                flag = false; //le drapeau est baisser
            }
        }
    }
    gagner = flag; //Gagner prend le drapeau
}

var titre = document.getElementById('imgTitle'); //déclare l'objet qui va contenir le titre de l'image
titre.innerHTML = img.title; //On affiche le titre de l'image actuelle
chFoto(); //On fait appel à la foncttion qui change des photos aléatoirement
function chFoto() { //On crée la fonction qui change des photos aléatoirement
    var i = Math.floor(Math.random() * images.length); //on déclare une variable qui contient un nombre aléatoire compris entre 1 et le nombre d'images qu'on a
    img.src = images[i].src; //On réccupère une images dans notre tableau qui a pour indice notre nombre aléatoire
    img.title = images[i].title; //On réccupère le titre de la même image
    imgMin.src = img.src; //On réccupère la même image pour l'afficher en petit
    titre.innerHTML = img.title; //On affiche le titre
    checnivo(); //On vérifie le niveau pour découper l'image
}

//Fonction qui recharge la page
document.getElementById('rejouer').onclick = function() { //On vérifie l'évenement click
    window.location.reload(true); //On récharge la page
};

var drClick = document.getElementById('page'); //On réccupère le click droit (événement)
//On crée la fonction qui redirige en cas de clic droit
drClick.oncontextmenu = function redirect() {
    window.location.replace("halte.html"); //On remplace la page actuelle par une page de mise en garde
};

function temps(sec) {
    var temp;
    if (sec >= 60) {
        var min = Math.floor(sec / 60);
        sec = sec % 60;
        temp = min.toString() + ' Min ' + sec.toString();
    } else {
        temp = sec.toString();
    }
    if (min >= 60) {
        var h = Math.floor(min / 60);
        min = min % 60;
        temp = h.toString() + ' H ' + min.toString() + ' Min ' + sec.toString();
    }
    if (h >= 24) {
        var jour = Math.floor(h / 24);
        h = h % 24;
        temp = jour.toString() + " Jour " + h.toString() + ' H ' + min.toString() + ' Min ' + sec.toString();
    }
    return temp;
}

//Fonction pour compter le temps
function clock() {
    autoplay(); //On fait appel à la fonction autoplay qui fais jouer la music
    var now = new Date().getTime(); //On réccupère le temps actuelle
    var elapsedTime = parseInt((now - startTime) / 1000, 10); //On reccupère le temps en faisant le temps actuelle moins le temps de début
    document.getElementById('temps').innerHTML = temps(elapsedTime); //On l'affiche
    document.getElementById('annee').innerHTML = new Date().getFullYear().toString();
    setTimeout(clock, 50); //On refais la même chose en 50 millisécondes
}

//On Vérifie si la touche control est appuyer
drClick.onkeydown = function isKeyPressed(e) { //On crée la fonction
    if (e.ctrlKey) { //Si l'événement correspond à l'appui de la touche control
        window.location.replace("halte.html"); //On remplace la page actuelle par la page halte.html
    }
};
var son = document.getElementById('son');

function autoplay() {
    if (!son.autoplay || son.ended) {
        var nbSon = Math.floor(Math.random() * 22);
        var ext = '.mp3';
        if (nbSon == 18) {
            ext = '.m4a';
        }
        son.src = "audio/" + nbSon.toString() + ext;
        son.autoplay = true;
        son.load();
    }
}

function aide() {
    swal("Page d'aide!", "Cliquez sur l'image que vous voulez déplacer, si vous cliquez sur image non déplaceable rien ne se passera. Essayer de reconstituer l'image que vous voyez en moins de temps et des coups que possible.", "warning"); //On affiche un message
}

function apropos() {
    swal("A-propos du jeux!", "Ce jeux a été crée par Lijerbul LJOBOY pour un travail pratique démandé par Mr Jack SAFARI dans le cadre du cours de javascript", "success"); //On affiche un message
}