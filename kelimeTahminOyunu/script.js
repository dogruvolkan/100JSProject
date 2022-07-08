const inputsDom = document.querySelector(".inputs");
const resetBtn = document.querySelector(".resetBtn");
const ipUcuDom = document.querySelector(".ipUcu span");
const kalanHakDom = document.querySelector(".kalanTahmin span");
const typingDom = document.querySelector(".typing");
const yanlisHarfDom = document.querySelector(".yanlisHarf span");
let skorDogruDom = document.querySelector(".skor1 span");
let skorYanlisDom = document.querySelector(".skor2 span");

let kelime;
let dogruHarfDizisi = [];
let yanlisHarfDizisi = [];
let tahminHakki;
let sayacDogru = 0;
let sayacYanlis = 0;

function rastgeleKelime() {
    let rastgeleSayi = kelimeler[Math.floor(Math.random() * kelimeler.length)];
    kelime = rastgeleSayi.kelime;
    let ipUcu = rastgeleSayi.ipUcu;
    tahminHakki = 8;
    dogruHarfDizisi = [];
    yanlisHarfDizisi = [];

    ipUcuDom.innerHTML = ipUcu;
    kalanHakDom.innerHTML = tahminHakki;
    yanlisHarfDom.innerHTML = yanlisHarfDizisi;

    let htmlTaslak = "";
    for (let i = 0; i < kelime.length; i++) {
        htmlTaslak += '<input type="text" disabled>'
    }
    inputsDom.innerHTML = htmlTaslak;
}



function oyunuBaslatma(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !yanlisHarfDizisi.includes(` ${key}`) && !dogruHarfDizisi.includes(key)) {
        yanlisHarfDom.innerHTML = "";
        if (kelime.includes(key)) {
            for (let i = 0; i < kelime.length; i++) {
                if (kelime[i] === key) {
                    dogruHarfDizisi.push(key);
                    inputsDom.querySelectorAll("input")[i].value = key;
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


    setTimeout(() => {
        if (dogruHarfDizisi.length === kelime.length) {
            alert(`Kazandın ${kelime.toUpperCase()}`);
            sayacDogru++;
            skorDogruDom.innerHTML = sayacDogru;
            rastgeleKelime();
        }
        else if (tahminHakki < 1) {
            alert(`Kaybettin ${kelime.toUpperCase()}`)
            sayacYanlis++;
            skorYanlisDom.innerHTML = sayacYanlis;
            for (let i = 0; i < kelime.length; i++) {
                inputsDom.querySelectorAll("input")[i].value = kelime[i];
            }
        }
    }, 300);
}


resetBtn.addEventListener("click", rastgeleKelime);
typingDom.addEventListener("input", oyunuBaslatma);
inputsDom.addEventListener("click", () => typingDom.focus());
document.addEventListener("keydown", () => typingDom.focus());