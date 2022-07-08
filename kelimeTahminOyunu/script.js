const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".resetBtn");
const ipUcuDom = document.querySelector(".ipUcu span");
const kalanHakDom = document.querySelector(".kalanTahmin span");
const typingDom = document.querySelector(".typing");
const yanlisHarfDom = document.querySelector(".yanlisHarf span");

let kelime;
let dogruHarfDizisi = [];
let yanlisHarfDizisi = [];
let tahminHakki;

function randomWord() {
    let randObj = kelimeler[Math.floor(Math.random() * kelimeler.length)];
    kelime = randObj.kelime;
    let ipUcu = randObj.ipUcu;
    tahminHakki = 8;

    ipUcuDom.innerHTML = ipUcu;
    kalanHakDom.innerHTML = tahminHakki;

    let html = "";
    for (let i = 0; i < kelime.length; i++) {
        html += '<input type="text" disabled>'
    }
    inputs.innerHTML = html;


}

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !yanlisHarfDizisi.includes(` ${key}`) && !dogruHarfDizisi.includes(key)) {
        console.log(key);
        yanlisHarfDom.innerHTML = "";
        if (kelime.includes(key)) {
            for (let i = 0; i < kelime.length; i++) {
                if (kelime[i] === key) {
                    dogruHarfDizisi.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }
        else {
            tahminHakki--;

            yanlisHarfDizisi.push(` ${key}`);

        }
        kalanHakDom.innerHTML = tahminHakki;
        yanlisHarfDom.innerHTML = yanlisHarfDizisi;
    }


    typingDom.value = "";
}


resetBtn.addEventListener("click", randomWord);
typingDom.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingDom.focus());