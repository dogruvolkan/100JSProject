const selectMenu = document.querySelectorAll("select");
const anlikSaatDom = document.querySelector("h1");
const btnAlarm = document.querySelector("button");
btnAlarm.addEventListener("click", setAlarm);
const contentDom = document.querySelector(".content");
const tarihDom = document.querySelector("h6");


let alarmTime;
let alarmVoice = new Audio("ringtone.mp3");
let isAlarmSet = false;

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let optionTaslak = `<option value="${i}">${i}</option>`
    selectMenu[0].value += optionTaslak;
    selectMenu[0].innerHTML += optionTaslak;
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let optionTaslak = `<option value="${i}">${i}</option>`
    selectMenu[1].valu += optionTaslak;
    selectMenu[1].innerHTML += optionTaslak;
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let optionTaslak = `<option value="${ampm}">${ampm}</option>`
    selectMenu[2].value += optionTaslak;
    selectMenu[2].innerHTML += optionTaslak;
}


setInterval(() => {

    let tarihObjesi = new Date();
    let saat = tarihObjesi.getHours();
    let dakika = tarihObjesi.getMinutes();
    let saniye = tarihObjesi.getSeconds();

    let gun = tarihObjesi.getDate();
    let gun2 = tarihObjesi.getDay();
    let ay = tarihObjesi.getMonth();
    let yil = tarihObjesi.getFullYear();

    let gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    let aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    gun = gun < 10 ? "0" + gun : gun;
    let tarihTaslak = `${gunler[gun2]}, ${gun} ${aylar[ay]} ${yil}`;
    tarihDom.innerHTML = tarihTaslak;

    ampm = "AM";

    if (saat >= 12) {
        saat = saat - 12;
        ampm = "PM";
    }

    saat = saat == 0 ? saat = 12 : saat;

    saat = saat < 10 ? "0" + saat : saat;
    dakika = dakika < 10 ? "0" + dakika : dakika;
    saniye = saniye < 10 ? "0" + saniye : saniye;

    anlikSaatDom.innerText = `${saat}:${dakika}:${saniye}:${ampm}`;

    if (alarmTime == `${saat}:${dakika}:${ampm}`) {
        alarmVoice.play();
        alarmVoice.loop = true;
        
    }

}, 1000);


function setAlarm() {

    if (isAlarmSet) {
        alarmTime = "";
        alarmVoice.pause();
        contentDom.classList.remove("disable");
        btnAlarm.innerText = "Alarm Kur";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`;
    // if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    //     return alert("alanları boş bırakmayın");
    // }

    isAlarmSet = true;
    alarmTime = time;
    contentDom.classList.add("disable");
    btnAlarm.innerText = "Alarmı Temizle";


}

setAlarm();