
// Recupero dati da Html
var ordiniTbl = document.getElementById("ordiniTbl"); 
var ordiniBtn = document.getElementById("ordiniBtn");
var aggiornaBtn = document.getElementById("aggiornaBtn");
var ordiniForm = document.getElementById("ordiniForm");



// array che conterra gli item che vado ad inserire
var Items = [];
var sumItems=0; //variabile che tieneconto  del numero degli item in magazzino
// funzione che verifica se l`argomento sia un numero
function isNumber(number) {
    return !isNaN(parseInt(number)); // isNaN(is Not an Number) funzione fornita dal js che serve per vedere se la stringa non sia un numero
}

// Funzione che inizializza la tabella
function creaTabella(){
    var i=1;
    while(i<5)
        {
            sumItems += i;
            var item="Item"+i;
            Items.push(item);
            var row = ordiniTbl.insertRow(ordiniTbl.rows.length); //Inserisco una nuova riga infondo alla tabella
            var cell1 = row.insertCell(0); // inserisco due colonne 
            var cell2 = row.insertCell(1);
            cell1.innerHTML = item; // specifico il contenuto delle celle
            cell2.innerHTML = i;
            i++;
            
        }
    
}

// funzione che fa comparire la form per gli ordini
function ordina () {
    document.getElementById("ordiniForm").hidden=false;// vado a modificare l`attributo hidden(inizialmente true)
    document.getElementById("aggiornaBtn").hidden=false;
    var threshold= document.getElementById("limitTxt").value;

    if (sumItems>threshold){
        alert("Capacita magazzino superata!");
    }
}

// funzione di aggiornamento della tabella
function aggiornaTabella () {
    
    // recupero i valori degli input e cerco l`indice del item all`interno della lista
    
    var nome = document.getElementById("nomeTxt").value;
    var quantita = document.getElementById("quantitaTxt").value;
    var indexOf = Items.indexOf(nome);                         
    var threshold= document.getElementById("limitTxt").value; //leggo la capacita del magazzino


    if (nome !== "" && isNumber(quantita)) { // verifica del input
        
        sumItems += parseInt(quantita);
        


        if (indexOf == -1) {      // index=-1 -> item non trovato dunque inserisco un nuovo item in modo analogo all`inizzializzazione
            Items.push(nome);
            var row = ordiniTbl.insertRow(ordiniTbl.rows.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = nome;
            cell2.innerHTML = quantita;
            

        } else {                                        // item e` presente
            var cell =ordiniTbl.rows[indexOf].cells;      // recupero la riga/celle corrispondenti al item
            var cellValue = parseInt(cell[1].innerHTML);//recupero il valore da aggiornare
            cellValue += parseInt(quantita);       // sommo il valore vecchio alla quantita aggiunta
            cell[1].innerHTML=cellValue;                // inserisco il nuovo valore
         
        }
        
        if (sumItems > threshold) { //controllo sulla quantita di item inseriti 
            alert("Capacita magazzino superata!");
           
        } 
        
       document.getElementById("ordiniForm").hidden=true; //nascondo di nuovo la form
       document.getElementById("aggiornaBtn").hidden=true;
       ordiniForm.reset();                                // resetto i valori della form

    }

}