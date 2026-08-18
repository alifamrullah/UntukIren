const trackingURL =
    "https://script.google.com/macros/s/AKfycbx_ZjH6NmBEL6e_uh-rYE2Y6TWt_bTZXfPCAFxEoFSp31K4h0BS0z1DLfozNXDKZD06/exec";

let currentPage = 1;
const totalPages = 5;
let noClickCount = 0;

const backButton = document.getElementById("backButton");

const teaseMessages = [
    "ehhhhh",
    "kenapaaa??",
    "sumpahhh????",
    "rennnn???",
    "yakin kamuuuu???",
    "yahhh, gabisa di pencet yaaa wkwkwkwkwk"
];


/* =========================
   BACK BUTTON
========================= */

function updateBackButton() {

    if (currentPage > 1 && currentPage <= totalPages) {
        backButton.classList.add("visible");
    } else {
        backButton.classList.remove("visible");
    }
}


/* =========================
   NEXT PAGE
========================= */

function nextPage() {

    if (currentPage >= totalPages) return;

    const current = document.getElementById(
        `page${currentPage}`
    );

    const next = document.getElementById(
        `page${currentPage + 1}`
    );

    current.classList.remove("active");

    setTimeout(() => {
        next.classList.add("active");
    }, 100);

    currentPage++;

    updateBackButton();
}


/* =========================
   PREVIOUS PAGE
========================= */

function previousPage() {

    if (currentPage <= 1) return;

    const current = document.getElementById(
        `page${currentPage}`
    );

    const previous = document.getElementById(
        `page${currentPage - 1}`
    );

    current.classList.remove("active");

    setTimeout(() => {
        previous.classList.add("active");
    }, 100);

    currentPage--;

    updateBackButton();

    // Kalau kembali ke page 5,
    // tombol bercanda kita reset
    if (currentPage === 5) {

        const noButton =
            document.getElementById("noButton");

        noButton.style.transform = "translate(0, 0)";

        noClickCount = 0;

        document.getElementById(
            "teaseText"
        ).textContent = "";
    }
}


/* =========================
   TOMBOL "ENTAR"
========================= */

function moveNoButton() {

    const button =
        document.getElementById("noButton");

    const tease =
        document.getElementById("teaseText");

    noClickCount++;

    const messageIndex = Math.min(
        noClickCount - 1,
        teaseMessages.length - 1
    );

    tease.textContent =
        teaseMessages[messageIndex];


    /*
        Posisi aman untuk layar HP.

        Kita sengaja tidak menggunakan
        posisi random yang terlalu jauh,
        supaya tombol tetap bisa disentuh
        di iPhone.
    */

    const positions = [

        { x: 70, y: 0 },

        { x: -70, y: 0 },

        { x: 60, y: -45 },

        { x: -60, y: -45 },

        { x: 55, y: 45 },

        { x: -55, y: 45 }

    ];

    const position =
        positions[
            (noClickCount - 1) %
            positions.length
        ];

    button.style.transform =
        `translate(${position.x}px, ${position.y}px)`;
}

/* =========================
   TRACKING JAWABAN
========================= */

function sendAnswer(answer) {

    const data = {
        answer: answer,
        noClicks: noClickCount,
        userAgent: navigator.userAgent
    };

    fetch(trackingURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
    })
    .catch(error => {
        console.log("Tracking gagal:", error);
    });
}

/* =========================
   JAWABAN IYA
========================= */

function answerYes() {

    // Catat jawaban Iren
    sendAnswer("MAUUU PAKE BANGETTT 💗");

    const questionPage =
        document.getElementById("page5");

    const yesPage =
        document.getElementById("yesPage");

    questionPage.classList.remove("active");

    backButton.classList.remove("visible");

    setTimeout(() => {

        yesPage.classList.add("active");

        createConfetti();

    }, 200);
}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const container =
        document.getElementById("confetti");

    /*
        Bersihkan confetti lama
        supaya tidak menumpuk kalau
        fungsi terpanggil lagi.
    */

    container.innerHTML = "";

    const symbols = [
        "♡",
        "♥",
        "✦",
        "✨",
        "💗"
    ];

    for (let i = 0; i < 35; i++) {

        const item =
            document.createElement("div");

        item.classList.add("confetti");

        item.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        item.style.left =
            Math.random() * 100 + "%";

        item.style.animationDelay =
            Math.random() * 1.5 + "s";

        item.style.fontSize =
            12 +
            Math.random() * 15 +
            "px";

        container.appendChild(item);
    }
}


/* =========================
   INITIAL STATE
========================= */

updateBackButton();