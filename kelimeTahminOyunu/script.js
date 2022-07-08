const inputsDom = document.querySelector(".inputs");
const resetBtn = document.querySelector(".resetBtn");
const ipUcuDom = document.querySelector(".ipUcu span");
const kalanHakDom = document.querySelector(".kalanTahmin span");
const typingDom = document.querySelector(".typing");
const yanlisHarfDom = document.querySelector(".yanlisHarf span");
let skorDogruDom = document.querySelector(".skor1 span");
let skorYanlisDom = document.querySelector(".skor2 span");
let dakikaDom = document.querySelector(".dakika");
let saniyeDom = document.querySelector(".saniye");

let kelime;
let dogruHarfDizisi = [];
let yanlisHarfDizisi = [];
let tahminHakki;
let sayacDogru = 0;
let sayacYanlis = 0;

let dakika = 0;
let saniye = 0;

//stopwatch fonksiyonu
function stopwatch() {
    saniye++;
    if (saniye < 10) {
        saniyeDom.innerHTML = "0" + saniye;
    } else {
        saniyeDom.innerHTML = saniye;
    }
    if (saniye == 59) {
        saniye = 0;
        dakika++;
        if (dakika < 10) {
            dakikaDom.innerHTML = "0" + dakika;
        } else {
            dakikaDom.innerHTML = dakika;
        }
    }
}
setInterval(stopwatch, 1000);




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
    //girilen harf alındı
    let harf = e.target.value;
    if (harf.match(/^[A-Za-z]+$/) && !yanlisHarfDizisi.includes(` ${harf}`) && !dogruHarfDizisi.includes(harf)) {
        yanlisHarfDom.innerHTML = "";
        if (kelime.includes(harf)) {
            for (let i = 0; i < kelime.length; i++) {
                if (kelime[i] === harf) {
                    dogruHarfDizisi.push(harf);
                    inputsDom.querySelectorAll("input")[i].value = harf;
                }
            }
        }
        else {
            tahminHakki--;
            yanlisHarfDizisi.push(` ${harf}`);
        }
        kalanHakDom.innerHTML = tahminHakki;
        yanlisHarfDom.innerHTML = yanlisHarfDizisi;

    }
    //gizli input alanı
    typingDom.value = "";

    //girilen son harfi göstermesi için fonksiyon gecikmeli başlatıldı
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
    }, 1000);
}


resetBtn.addEventListener("click", rastgeleKelime);
typingDom.addEventListener("input", oyunuBaslatma);
inputsDom.addEventListener("click", () => typingDom.focus());
document.addEventListener("keydown", () => typingDom.focus());