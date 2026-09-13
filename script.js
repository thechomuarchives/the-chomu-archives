/* ==========================================
   Dinner by Destiny v1.0
   script.js
   Module 1 (Revised)
========================================== */

/* ============================
   Global Variables
============================ */

let currentQuestion = 0;
let selectedAnswers = [];
let currentPhoto = 0;
let memoryPhotos = [];
let ambientStarted = false;
let ambientMusicRequested = false;
let pianoMusicRequested = false;
let finalRestaurant = null;
let restaurantRevealed = false;
let confidenceScore = 0;
let destinyMessage = "";
let personalitySummary = "";
const loadingMessages = [

    "✨ Every answer tells a story...",

    "🌌 Understanding your personality...",

    "🧭 Comparing possible destinations...",

    "💙 Looking for the perfect evening...",

    "✨ Destiny has almost made its choice..."

];

let loadingIndex = 0;
let loadingInterval = null;
const birthdayLetter = [
`Happy Birthday Chomu❤️,
1st jeta boltam seta to bolei dilam.😁`,
`Ei exam ta onekta hectic chilo, tar opor sara bochor onek onek responsibilities nite hoyeche. Finally aj amar cutieeer din, so it has to be enjoyed to the fullest!!🤗❤️`,
`Ami onek vablam, onek vablam... ar vebeo kotota thikthak guchhiye likhte perechi I don't know. But tor jodi bhalo lege thake, tahole amar puro effort tai worth it.🙂‍↔️🤗`,
`Jani toke credit dewar age tui nijei niye nish amar theke.😁😂 But tao kichu credit amio debo nije theke😌😤.`,
`Thank you eto care korar jonno, eto amar kotha sobsomoy bhabar jonno, na express kreo eto concern dekhanor jonno.`,
`Aar khub jhograr majheo somehow amake sobsomoy eta feel koranor jonno je sob kichur moddheo ami jemon tokei choose korte chai, tuio amakei choose korish.🥰`,
`Ami janina eta shune silly lagbe kina... but I love you Chomuuu.❤️`,
`Tui amar life er sobcheye boro adventure, aar sobcheye safest home.`,
`Tor around amar khub lucky lage. Tui kichu na kreo amar sob bhalo hoye jay. Maybe, ektuuu beshi responsible howa, ektuuu better manush howa... egulo hoyto tor thekei ektu ektu sikhechi.😁`,
`Jodio ei ko dine tuio onek kichu sikhechis amar theke.😌`,
`Jemon amake patiently handle kora, amar opor raag uthleo ektu kom raag kora🤗, paglamo kora, gorib vabe thaka😂`,
`... aar ha ha of course kukur, bolta, bhomra der theke nijeke banchano.😬😂 Egulor credit kintu ami nijei nebo, toke nite debo na.😤😂`,
`Ar haa, birthday boy er kache amar ekta chhoto selfish request ache.🤭 Amar khub ichhe amra dinner e jai. (Poll ta to Krli e so dekhei niechis ig😬) Aj hok, kal hok, ba jokhon amader dujoner timing mele... doesn't really matter.🤍`,
`Shudhu mone hoy tor birthday ta ektu bhalo kore celebrate korte chai, tor sathe. After all, it's your day, aar ami chai ei birthday tar ekta chhoto part amio hote pari.🥹`,
`Baki decision toh obviously birthday boy er.😌`,
`Ami shudhu amar ichheta bollam. Jodi hoy (jani hbeiiii!!😬), tahole bas bhalo khawa, ektu ghora, onek golpo, onek hashi... aar amar favourite person.❤️`,
`Once again, Happy Birthday Chomuuu.❤️🤗 I love you so so much.`,
`Amar Chomu ta sobsomoy eromi hashi-khushi thakuk, aar jeta chay seta jeno sobsomoy peye jay.🫂❤️`,
`Amr cutiee babluuu, I lovee youuu!!!`,
];

const photoRotations = [
    "rotate(-2deg)",
    "rotate(1.5deg)",
    "rotate(-1deg)",
    "rotate(2deg)",
    "rotate(-1.5deg)",
    "rotate(1deg)",
    "rotate(-2.5deg)",
    "rotate(2.5deg)",
    "rotate(0.5deg)"
];

const stackStyles = [
    {x:0,  y:0,  r:-2, s:1},
    {x:12, y:10, r:4,  s:0.97},
    {x:-10,y:22, r:-6, s:0.94}
];

/* ============================
   Personality Traits
============================ */

const traits = {
    adventure: 0,
    wonder: 0,
    curiosity: 0,
    elegance: 0,
    romance: 0,
    comfort: 0,
    connection: 0,
    playfulness: 0,
    patience: 0
};

/* ============================
   Restaurant Database
============================ */

const restaurants = {

    splash: {
        name: "Splash Luxorant",
        cuisine: "Multi Cuisine",
        score: 0,
        description:
            "An immersive aquarium-themed dining experience filled with vibrant ambience and unforgettable moments."
    },

    germinnaa: {
        name: "Germinnaa",
        cuisine: "Multi Cuisine",
        score: 0,
        description:
            "A beautiful and elegant restaurant with a romantic ambience."
    },

    pronto: {
        name: "Pronto",
        cuisine: "Continental & Multi Cuisine",
        score: 0,
        description:
            "A cozy gourmet restaurant perfect for long conversations."
    }

};

/* ============================
   Cached HTML Elements
============================ */

const elements = {

    hero: null,
    pact: null,
    quiz: null,
    loading: null,
    loadingMessage: null,
    result: null,
    envelope: null,
    letter: null,
    ending: null,

beginButton: null,
trustButton: null,
rulesContinueButton: null,
rulesAgree: null,

    question: null,
    narrator: null,
    options: null,

    progressBar: null,
    progressText: null,

    restaurantName: null,
    restaurantDescription: null,

    letterButton: null,
    openLetterButton: null,

    photo1:null,
    photo2:null,
    photo3:null,
    photo4:null,
    memoryPhoto: null,
    letterContent: null,

    ambientMusic:null,
    bgMusic:null,
    huntMusic:null,
    valseMusic:null,
    
    confidenceText: null,
    personalitySummary: null,
    destinyMessage: null,
    memoryButton: null,
    memory:null,
    finishButton:null,
    endingButton:null,

};

/* ============================
   Cache DOM
============================ */

function cacheDOM() {

    elements.hero = document.getElementById("hero");
    elements.pact = document.getElementById("pact");
    elements.quiz = document.getElementById("quiz");
    elements.loading = document.getElementById("loading");
    elements.loadingMessage =
    document.getElementById("loadingMessage");
    elements.result = document.getElementById("result");
    elements.envelope = document.getElementById("envelope");
    elements.letter = document.getElementById("letter");
    elements.ending = document.getElementById("ending");

    elements.beginButton = document.getElementById("beginBtn");
    elements.trustButton = document.getElementById("trustBtn");
    elements.rulesContinueButton =
    document.getElementById("rulesContinueBtn");

elements.rulesAgree =
    document.getElementById("rulesAgree");

    elements.question = document.getElementById("question");
    elements.narrator = document.getElementById("narrator");
    elements.options = document.getElementById("options");

    elements.progressBar = document.getElementById("progressBar");
    elements.progressText = document.getElementById("progressText");

    elements.restaurantName = document.getElementById("restaurantName");
    elements.restaurantDescription = document.getElementById("restaurantDescription");

    elements.letterButton = document.getElementById("letterBtn");
    elements.openLetterButton = document.getElementById("openLetterBtn");

    elements.memoryPhoto = document.getElementById("memoryPhoto");
    elements.letterContent = document.getElementById("letterContent");

    elements.bgMusic = document.getElementById("bgMusic");
    
    elements.confidenceText =
    document.getElementById("confidenceText");

    elements.personalitySummary =
    document.getElementById("personalitySummary");

    elements.destinyMessage =
    document.getElementById("destinyMessage");
    elements.memoryButton =
    document.getElementById("memoryBtn");

    elements.photo1=document.getElementById("photo1");
    elements.photo2=document.getElementById("photo2");
    elements.photo3=document.getElementById("photo3");
    elements.photo4=document.getElementById("photo4");

    elements.memory =
    document.getElementById("memory");
    
    elements.finishButton =
    document.getElementById("finishBtn");
   
    elements.endingButton =
    document.getElementById("endingBtn");
    
    elements.ambientMusic =
    document.getElementById("ambientMusic");

    elements.bgMusic =
    document.getElementById("bgMusic");
   
  elements.huntMusic =
    document.getElementById("huntMusic"); 
  elements.valseMusic =
    document.getElementById("valseMusic");  
    memoryPhotos = document.querySelectorAll(".memory-photo");
    
}
/* ============================
   Event Listeners
============================ */
function attachEvents() {

if (elements.rulesAgree && elements.rulesContinueButton) {

    elements.rulesAgree.addEventListener("change", () => {

        elements.rulesContinueButton.disabled =
            !elements.rulesAgree.checked;

    });

}

if (elements.rulesContinueButton) {

    elements.rulesContinueButton.addEventListener("click", () => {

        if (!elements.rulesAgree.checked) return;

        hideAllScreens();

        elements.hero.classList.add("active");

    });

}

    if (elements.beginButton) {
    elements.beginButton.addEventListener("click", () => {

    enterFullscreen();

    startAmbientMusic();

    showPactScreen();

});
}
    if (elements.trustButton) {
        elements.trustButton.addEventListener("click", startJourney);
    }
    
   if (elements.letterButton) {
    elements.letterButton.addEventListener(
        "click",
        handleResultButton
    );
}

    if (elements.openLetterButton) {
    elements.openLetterButton.addEventListener(
        "click",
        showLetterScreen
    );
    }
    if(elements.memoryButton){
    elements.memoryButton.addEventListener(
        "click",
        showMemoryScreen
    );

}
    if(elements.finishButton){
    elements.finishButton.addEventListener(
        "click",
        showEndingScreen
    );
}
    const stack = document.getElementById("photoStack");

if(stack){

    stack.addEventListener("click", nextPhoto);

}
document.addEventListener("pointerdown", () => {

    if(ambientMusicRequested && !ambientStarted){
        startAmbientMusic();
    }

    if(pianoMusicRequested){
        const piano = elements.bgMusic;

        if(piano && piano.paused){
            piano.play().catch(() => {});
        }
    }

}, { passive:true });
}
/* ============================
   Screen Management
============================ */

function hideAllScreens() {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

}

function startAmbientMusic(){

    if(ambientStarted) return;

    const music = elements.ambientMusic;

    if(!music) return;

    ambientMusicRequested = true;

    music.volume = 0;

    const playMusic = () => {

        if(ambientStarted) return;

        music.play()
            .then(() => {

                ambientStarted = true;

                let volume = 0;

                const fade = setInterval(() => {

                    volume += 0.05;

                    if(volume >= 0.25){
                        volume = 0.25;
                        clearInterval(fade);
                    }

                    music.volume = volume;

                },100);

            })
            .catch(() => {

                /* Chrome may temporarily reject
                   playback. The global interaction
                   retry below will try again. */

                ambientStarted = false;

            });
    };

    playMusic();
}

function startLetterMusic(){
    const ambient = elements.ambientMusic;
    const piano = elements.bgMusic;
    if(!ambient || !piano) return;

pianoMusicRequested = true;

piano.currentTime = 0;
piano.volume = 0;

piano.play().catch(() => {});
    let ambientVolume = ambient.volume;
    let pianoVolume = 0;
    const fade = setInterval(() => {
        ambientVolume -= 0.02;
        pianoVolume += 0.02;
        if(ambientVolume < 0) ambientVolume = 0;
        if(pianoVolume > 0.5) pianoVolume = 0.5;
        ambient.volume = ambientVolume;
        piano.volume = pianoVolume;
        if(ambientVolume === 0 && pianoVolume === 0.5){
            ambient.pause();
            clearInterval(fade);
        }
    },80);
}

/* =========================================================
   HUNT MUSIC — MELANCHOLIA
   ========================================================= */

function prepareHuntMusic(){

    const hunt = elements.huntMusic;

    if(!hunt) return;

    /*
       Start the audio during the user's
       constellation/finish interaction.

       It stays silent for now so the browser
       allows playback without disturbing
       A Thousand Years.
    */

    hunt.pause();
    hunt.currentTime = 0;
    hunt.volume = 0;

    hunt.play().catch(() => {});

}


function startHuntMusic(){

    const piano = elements.bgMusic;
    const hunt = elements.huntMusic;

    if(!hunt) return;

    /*
       Smooth transition from A Thousand Years
       into Melancholia.
    */

    hunt.currentTime = 0;
    hunt.volume = 0;

    let pianoVolume = piano ? piano.volume : 0;
    let huntVolume = 0;

    /*
       Let A Thousand Years breathe for a moment
       before Melancholia begins entering.
    */

    setTimeout(() => {

        const fade = setInterval(() => {

            pianoVolume -= 0.01;
            huntVolume += 0.01;

            if(pianoVolume < 0){
                pianoVolume = 0;
            }

            if(huntVolume > 0.35){
                huntVolume = 0.35;
            }

            if(piano){
                piano.volume = pianoVolume;
            }

            hunt.volume = huntVolume;

            if(pianoVolume === 0 && huntVolume === 0.35){

                if(piano){
                    piano.pause();
                }

                clearInterval(fade);

            }

        }, 100);

    }, 1500);

}

/* =========================================================
   HUNT MUSIC → ENDING MUSIC
   ========================================================= */

function transitionToEndingMusic(){

    const hunt = elements.huntMusic;
    const valse = elements.valseMusic;

    if(!hunt || !valse) return;

    valse.currentTime = 0;
    valse.volume = 0;

    valse.play().catch(() => {});

    let huntVolume = hunt.volume;
    let valseVolume = 0;

    const fade = setInterval(() => {

        huntVolume -= 0.01;
        valseVolume += 0.01;

        if(huntVolume < 0){
            huntVolume = 0;
        }

        if(valseVolume > 0.5){
            valseVolume = 0.5;
        }

        hunt.volume = huntVolume;
        valse.volume = valseVolume;

        if(huntVolume === 0 && valseVolume === 0.5){

            hunt.pause();

            clearInterval(fade);

        }

    }, 100);

}

function showPactScreen() {

    hideAllScreens();

    elements.pact.classList.add("active");

    console.log("📜 Pact Screen");

}

function startJourney() {

    hideAllScreens();

    const intro = document.getElementById("introTransition");
    const introText = document.querySelector(".intro-text");

    intro.classList.add("active");

    currentQuestion = 0;
    selectedAnswers = [];

    setTimeout(() => {
        introText.classList.add("show");
    }, 300);

    setTimeout(() => {
        introText.classList.remove("show");
    }, 2200);

    setTimeout(() => {

        hideAllScreens();

        elements.quiz.classList.add("active");

        console.log("🚀 Journey Started");

        showQuestion(currentQuestion);

    }, 3200);

}

/* ============================
   Initialize Website
============================ */

function initWebsite() {

    console.clear();

    console.log("🌌 Dinner by Destiny Initialized");
    console.log("✅ HTML Connected");
    console.log("✅ CSS Connected");
    console.log("✅ Questions Loaded");
    console.log("❤️ Ready to Begin");

cacheDOM();
initGlassParticles();
attachEvents();
}

/* ============================
   Temporary Question Display
============================ */

function showQuestion(index) {
elements.quiz.style.opacity = "0";
    const q = questions[index];
    
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    
    elements.question.textContent = q.question;

    elements.options.innerHTML = "";

    shuffledOptions.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option.text;

        button.className = "option-button";
        button.addEventListener("click", () => {

    selectAnswer(option, button);

});

elements.options.appendChild(button);

    });

    elements.progressText.textContent =
        `Question ${index + 1} of ${questions.length}`;

    elements.progressBar.style.width =
        `${((index + 1) / questions.length) * 100}%`;
        setTimeout(() => {

    elements.quiz.style.transition = "opacity 0.6s ease";

    elements.quiz.style.opacity = "1";

}, 50);

}
/* ============================
   Answer Selection
============================ */

function selectAnswer(option, selectedButton) {

    // Prevent multiple taps
    const buttons = elements.options.querySelectorAll("button");

    buttons.forEach(btn => {

        btn.disabled = true;

    });

    // Highlight selected answer
    selectedButton.classList.add("selected");
    selectedButton.blur();
    
    // Save answer
    selectedAnswers.push(option);

    // Update traits
    for (const trait in option.traits) {

        traits[trait] += option.traits[trait];

    }

    console.log("✅ Answer Saved");

    console.log(traits);

    currentQuestion++;

    setTimeout(() => {

        if (currentQuestion < questions.length) {

            showQuestion(currentQuestion);

        }

        else {

            finishQuiz();

        }

    }, 600);

}
/* ============================
   Finish Quiz
============================ */

function finishQuiz() {

    calculateRestaurantScores();

    chooseRestaurant();

    calculateConfidence();

    generateDestinyMessage();

    generatePersonalitySummary();

    startLoadingScreen();

}
/* ============================
   Restaurant Scoring
============================ */

function calculateRestaurantScores() {

    restaurants.splash.score =
        traits.adventure * 3 +
        traits.wonder * 3 +
        traits.curiosity * 2 +
        traits.playfulness;

    restaurants.germinnaa.score =
        traits.elegance * 3 +
        traits.romance * 3 +
        traits.patience * 2 +
        traits.wonder;

    restaurants.pronto.score =
        traits.comfort * 3 +
        traits.connection * 3 +
        traits.playfulness * 2 +
        traits.romance;

    console.log("🍽 Restaurant Scores");

    console.log(restaurants);

}
/* ============================
   Choose Restaurant
============================ */

function chooseRestaurant() {

    const splash = restaurants.splash.score;
    const germinnaa = restaurants.germinnaa.score;
    const pronto = restaurants.pronto.score;

    // Find the highest score
    let highest = Math.max(splash, germinnaa, pronto);

    // Gentle preference for Splash:
    // If Splash is within 2 points of the highest score,
    // Destiny leans towards Splash.
    if (highest - splash <= 2) {

        finalRestaurant = restaurants.splash;

    }

    else if (highest === germinnaa) {

        finalRestaurant = restaurants.germinnaa;

    }

    else {

        finalRestaurant = restaurants.pronto;

    }

    console.log("🏆 Chosen Restaurant:");

    console.log(finalRestaurant);

}
/* ============================
   Confidence Calculation
============================ */

function calculateConfidence() {

    const scores = [
        restaurants.splash.score,
        restaurants.germinnaa.score,
        restaurants.pronto.score
    ];

    scores.sort((a, b) => b - a);

    const highest = scores[0];
    const secondHighest = scores[1];

    // Base confidence
    confidenceScore = 75;

    // Increase confidence depending on lead
    confidenceScore += (highest - secondHighest) * 4;

    // Limit confidence
    confidenceScore = Math.max(75, confidenceScore);
    confidenceScore = Math.min(98, confidenceScore);

    console.log("📊 Confidence:", confidenceScore + "%");

}
/* ============================
   Destiny Explanation
============================ */

function generateDestinyMessage() {

    switch (finalRestaurant.name) {

        case "Splash Luxorant":

            destinyMessage =
                "Your choices reveal that you're naturally drawn to unforgettable experiences, beautiful surroundings and a sense of adventure. Destiny believes tonight deserves a place where the atmosphere itself becomes part of the memory.";

            break;

        case "Germinnaa":

            destinyMessage =
                "Your answers reflect a love for elegance, romance and beautifully crafted moments. Destiny believes an evening surrounded by charm and warmth suits you perfectly.";

            break;

        case "Pronto":

            destinyMessage =
                "Your journey shows that meaningful conversations and genuine connections matter most to you. Destiny believes the best memories are created where comfort meets great food.";

            break;

    }

    console.log("✨ Destiny Message Generated");

}
/* ============================
   Personality Summary
============================ */

function generatePersonalitySummary() {

    if (traits.adventure + traits.wonder >= traits.elegance + traits.romance &&
        traits.adventure + traits.wonder >= traits.comfort + traits.connection) {

        personalitySummary =
            "You enjoy discovering new experiences and creating unforgettable memories.";

    }

    else if (traits.elegance + traits.romance >= traits.comfort + traits.connection) {

        personalitySummary =
            "You appreciate beauty, thoughtful details and moments that feel truly special.";

    }

    else {

        personalitySummary =
            "You value meaningful conversations, warmth and spending quality time with the people you care about.";

    }

    console.log("🧠 Personality Summary Generated");

}
/* ============================
   Destiny Loading
============================ */

function startLoadingScreen() {

    hideAllScreens();

    elements.loading.classList.add("active");

    loadingIndex = 0;

    elements.loadingMessage.textContent =
        loadingMessages[0];

    loadingInterval = setInterval(() => {

        loadingIndex++;

        if (loadingIndex < loadingMessages.length) {

            elements.loadingMessage.textContent =
                loadingMessages[loadingIndex];

        }

        else {

    clearInterval(loadingInterval);

    elements.loadingMessage.textContent =
        "✨ Match Found!";

    setTimeout(() => {

        showResultScreen();

    }, 1000);

}

    }, 1200);

}
/* ============================
   Result Screen
============================ */
function showResultScreen(){

    hideAllScreens();
restaurantRevealed = false;
    elements.result.classList.add("active");

    // Reset everything
    elements.restaurantName.textContent = "";
    elements.restaurantName.style.opacity = "0";

    document.getElementById("restaurantBlur").style.opacity = "1";

    elements.confidenceText.textContent = "";
    elements.personalitySummary.textContent = "";
    elements.restaurantDescription.textContent = "";
    elements.destinyMessage.textContent = "";
    elements.confidenceText.classList.remove("show");
    elements.personalitySummary.classList.remove("show");
    elements.restaurantDescription.classList.remove("show");
    elements.destinyMessage.classList.remove("show");
    elements.confidenceText.classList.add("fade-up");
    elements.personalitySummary.classList.add("fade-up");
    elements.restaurantDescription.classList.add("fade-up");
    elements.destinyMessage.classList.add("fade-up");
    elements.letterButton.style.opacity = "0";
    elements.letterButton.textContent =
        "❤️ Reveal My Destiny";
    // Description
    setTimeout(()=>{
        elements.restaurantDescription.textContent =
            finalRestaurant.description;
        elements.restaurantDescription.classList.add("show");
    },700);
    // Personality
    elements.personalitySummary.textContent =
    personalitySummary;

    // Destiny message
    setTimeout(()=>{

        elements.destinyMessage.textContent =
            destinyMessage;

        elements.destinyMessage.classList.add("show");

    },2300);

    // Confidence
    elements.confidenceText.textContent =
    confidenceScore + "% Match";

    // Reveal button
    setTimeout(()=>{

        elements.letterButton.style.opacity = "1";
    },3900);
}

/* ============================
   Envelope Screen
============================ */
function handleResultButton(){

    const blur =
        document.getElementById("restaurantBlur");

 const cloudText = document.getElementById("cloudText");

if(cloudText){

    cloudText.style.transition = "opacity 0.6s ease";
    cloudText.style.opacity = "0";

}
    if(!restaurantRevealed){

        restaurantRevealed = true;

        blur.classList.add("cloud-reveal");

setTimeout(() => {

    elements.restaurantName.textContent =
        finalRestaurant.name;

    elements.restaurantName.style.transition =
        "opacity 1.2s ease";
        

    elements.restaurantName.style.opacity = "1";
elements.restaurantName.style.transform = "translateY(0)";
    elements.restaurantName.classList.add(
        "restaurant-glow"
    );
    setTimeout(() => {

    elements.restaurantName.classList.add(
        "restaurant-shimmer"
    );

},1000);
    setTimeout(() => {
    elements.confidenceText.classList.add("show");
},600);

setTimeout(() => {
    elements.personalitySummary.classList.add("show");
},1300);

setTimeout(() => {
    elements.restaurantDescription.classList.add("show");
},2000);

setTimeout(() => {
    elements.destinyMessage.classList.add("show");
},2700);

setTimeout(() => {
    elements.letterButton.style.opacity = "0";
    setTimeout(() => {
        elements.letterButton.textContent =
            "💌 There's one more surprise waiting...";
        elements.letterButton.style.opacity = "1";
    },300);
},3400);
}, 1700);
        return;

    }

    showEnvelopeScreen();

}

function showEnvelopeScreen() {

    startLetterMusic();

    hideAllScreens();

    elements.envelope.classList.add("active");
}

/* ============================
   Letter Screen
============================ */
function showLetterScreen() {

    hideAllScreens();

    elements.letter.classList.add("active");

    const content = elements.letterContent;
    const memoryButton = elements.memoryButton;

    content.innerHTML = "";
    memoryButton.hidden = true;

    birthdayLetter.forEach(paragraph => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        content.appendChild(p);
    });

    content.scrollTop = 0;

    let autoScrolling = true;
    let userInteracting = false;
    let animationFrame;

    function checkEnd() {

        const distanceFromBottom =
            content.scrollHeight -
            content.scrollTop -
            content.clientHeight;

        if (distanceFromBottom <= 8) {

            autoScrolling = false;

            cancelAnimationFrame(animationFrame);

            memoryButton.hidden = false;

            return true;
        }

        return false;
    }

    function autoScroll() {

        if (!autoScrolling) return;

        if (!userInteracting) {
            content.scrollTop += 1.5;
        }

        if (!checkEnd()) {
            animationFrame =
                requestAnimationFrame(autoScroll);
        }
    }

    function pauseForTouch() {
        userInteracting = true;
    }

    function resumeAfterTouch() {
        userInteracting = false;
    }

    content.addEventListener(
        "touchstart",
        pauseForTouch,
        { passive: true }
    );

    content.addEventListener(
        "touchend",
        resumeAfterTouch,
        { passive: true }
    );

    content.addEventListener(
        "touchcancel",
        resumeAfterTouch,
        { passive: true }
    );

    content.addEventListener("scroll", checkEnd, {
        passive: true
    });

    animationFrame =
        requestAnimationFrame(autoScroll);
}

function showMemoryScreen(){
    hideAllScreens();
    elements.memory.classList.add("active");
    showMemoryPhotos();
    updatePhotoStack();
    memoryPhotos.forEach(photo => {

    const img = new Image();

    img.src = photo.src;

});
    
}
function showMemoryPhotos(){

    currentPhoto = 0;

    updatePhotoStack();

}

function updatePhotoStack(){

    if (!memoryPhotos || memoryPhotos.length === 0) {
        console.warn("No memory photos found.");
        return;
    }

    memoryPhotos.forEach(photo=>{

    photo.classList.remove("active");

    photo.style.zIndex="0";

});

    for(let i=0;i<3;i++){

        const index=(currentPhoto+i)%memoryPhotos.length;

        const photo=memoryPhotos[index];

        photo.style.zIndex=3-i;

        const style = stackStyles[i];

photo.style.transform =
`translate(${style.x}px, ${style.y}px)
 rotate(${style.r}deg)
 scale(${style.s})`;
 photo.classList.add("active");

        if(i===0){

    photo.style.filter="brightness(1)";
    photo.style.zIndex="3";

}
else if(i===1){

    photo.style.filter="brightness(.9)";
    photo.style.zIndex="2";

}
else{

    photo.style.filter="brightness(.8)";
    photo.style.zIndex="1";

}
    }

}

function nextPhoto(){
const hint = document.getElementById("photoHint");

if(hint){

    hint.style.opacity="0";

}
    const loopMessage = document.getElementById("memoryLoopMessage");

    if(hint){

        hint.style.opacity = "0";
        hint.style.animation = "none";

    }

    // If currently on the LAST photo
    if(currentPhoto === memoryPhotos.length - 1){

    loopMessage.classList.add("show");

    setTimeout(()=>{

        loopMessage.classList.remove("show");

        currentPhoto = 0;

        updatePhotoStack();

    },2200);

    return;
}
memoryPhotos[currentPhoto].classList.add("lift");

setTimeout(() => {

    memoryPhotos[currentPhoto].classList.remove("lift");

    currentPhoto = (currentPhoto + 1) % memoryPhotos.length;

    updatePhotoStack();

}, 650);

}

function showEndingScreen(){

    hideAllScreens();

    elements.ending.classList.add("active");

    prepareHuntMusic();

    startBirthdayConstellation();
}

/* ============================
   Floating Glass Particles
============================ */

function initGlassParticles(){

    const container = document.getElementById("glassParticles");

    const colors = [
        "rgba(255,245,225,.55)",
        "rgba(255,220,235,.50)",
        "rgba(255,228,170,.52)",
        "rgba(210,225,255,.50)",
        "rgba(255,255,255,.60)"
    ];

    const total = 55;

    for(let i=0;i<total;i++){

        const p = document.createElement("div");

        p.className = "glass-particle";

        const size = Math.random()*10 + 5;

        p.style.width = size+"px";
        p.style.height = size+"px";

        p.style.background =
            colors[Math.floor(Math.random()*colors.length)];

      const cols = 8;
const rows = 7;

const col = i % cols;
const row = Math.floor(i / cols);

const cellWidth = 100 / cols;
const cellHeight = 100 / rows;

p.style.left =
(col * cellWidth + Math.random()*cellWidth) + "vw";

p.style.top =
(row * cellHeight + Math.random()*cellHeight) + "vh";

        p.style.opacity = Math.random()*0.45 + 0.35;
        p.dataset.rotation = Math.random()*360;

        container.appendChild(p);

if(size > 10 && Math.random() < 0.55){
    const whirlStyles=[
"whirl-x",
"whirl-y",
"whirl-xy",
"whirl-reverse"
];

p.classList.add(
whirlStyles[
Math.floor(Math.random()*whirlStyles.length)
]
);
}
        animateParticle(p);
        if(Math.random()<0.15){
    twinkleParticle(p);
}

    }

}


function animateParticle(p){
let x=parseFloat(p.style.left);
let y=parseFloat(p.style.top);
const angle=Math.random()*Math.PI*2;
const speed=0.03+Math.random()*0.04;
let dx=Math.cos(angle)*speed;
let dy=Math.sin(angle)*speed;
let rotation = Number(p.dataset.rotation);
function move(){
x += dx + Math.sin(Date.now()/2800 + y) * 0.03;
y += dy + Math.cos(Date.now()/3200 + x) * 0.04;
dx += (Math.random()-0.5)*0.0008;
dy += (Math.random()-0.5)*0.0008;

dx = Math.max(-0.06, Math.min(0.06, dx));
dy = Math.max(-0.06, Math.min(0.06, dy));
rotation += 0.18 + Math.random()*0.05;
    if(x<0)x=100;
    if(x>100)x=0;
    if(y<0)y=100;
    if(y>100)y=0;
    p.style.left = x + "vw";
p.style.top = y + "vh";

const floatY = Math.sin(Date.now()/1800 + x) * 5;

if (
    p.classList.contains("whirl-x") ||
    p.classList.contains("whirl-y") ||
    p.classList.contains("whirl-xy") ||
    p.classList.contains("whirl-reverse")
) {

    p.style.transform =
    `translateY(${floatY}px)
     rotateX(${rotation}deg)
     rotateY(${rotation*0.7}deg)
     rotateZ(45deg)`;

}else{

    p.style.transform =
    `translateY(${floatY}px)
     rotate(${rotation}deg)
     skewY(${Math.sin(Date.now()/2600+y)*4}deg)`;

}
    requestAnimationFrame(move);
}
move();
}
function twinkleParticle(p){
  if(Math.random() < 0.08){
    p.style.animation += ", prismSparkle 6s ease-in-out infinite";
}

function glow(){

const delay=3000+Math.random()*7000;

setTimeout(()=>{

p.style.transition="all 1.5s ease";

p.style.filter="brightness(2)";
p.style.opacity="1";

setTimeout(()=>{

p.style.filter="brightness(1)";
p.style.opacity=0.45+Math.random()*0.4;

glow();

},1400);

},delay);

}

glow();

}
/* ============================
   Start Website
============================ */
document.addEventListener("DOMContentLoaded", initWebsite);
/* ============================
   Full Screen
============================ */

function enterFullscreen(){

    const el = document.documentElement;

    if(el.requestFullscreen){
        el.requestFullscreen();
    }
    else if(el.webkitRequestFullscreen){
        el.webkitRequestFullscreen();
    }
    else if(el.msRequestFullscreen){
        el.msRequestFullscreen();
    }
}
/* ==========================================
   BIRTHDAY CONSTELLATION v2.0
   PIG + REAL TEXT + LAZY STAR
   ========================================== */

const birthdayScene = {
    canvas:null,
    ctx:null,
    stars:[],
    pigTargets:[],
    lazyStar:null,
    running:false,
    formationStarted:false,
    lastTime:0,
    textShown:false,
    flash:false
};

/* ---------- Start ---------- */

function startBirthdayConstellation(){
    const canvas=document.getElementById("birthdayConstellation");
    const ending=document.getElementById("ending");
    if(!canvas||!ending)return;

    birthdayScene.canvas=canvas;
    birthdayScene.ctx=canvas.getContext("2d");
    birthdayScene.running=false;
    birthdayScene.formationStarted=false;
    birthdayScene.textShown=false;
    birthdayScene.flash=false;
    birthdayScene.lazyStar=null;

    resizeBirthdayScene();
    birthdayScene.stars=createBirthdayStars();

    requestAnimationFrame(animateBirthdayScene);

    /* Card breathes before moving */
    setTimeout(()=>{
        ending.classList.add("constellation-start");
    },500);

    /* Card rises */
    setTimeout(()=>{
        ending.classList.remove("constellation-start");
        ending.classList.add("constellation-rise");
    },1050);

    /* Pig begins after card has moved */
    setTimeout(()=>{
        birthdayScene.formationStarted=true;
        createPigFormation();
    },2300);

    /* Real birthday text appears after pig settles */
    setTimeout(()=>{
        showBirthdayText();
    },5300);
}

/* ---------- Canvas ---------- */

function resizeBirthdayScene(){
    const canvas=birthdayScene.canvas;
    if(!canvas)return;

    const rect=canvas.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,2);

    canvas.width=rect.width*dpr;
    canvas.height=rect.height*dpr;

    birthdayScene.ctx.setTransform(
        dpr,0,0,dpr,0,0
    );
}

/* ---------- Star Factory ---------- */

function createBirthdayStars(){
    const rect=birthdayScene.canvas.getBoundingClientRect();
    const stars=[];
    const ambientCount=window.innerWidth<500?80:105;
    const formationCount =
    window.innerWidth < 500 ? 360 : 460;

    /* Ambient stars */
    for(let i=0;i<ambientCount;i++){
        stars.push({
            x:Math.random()*rect.width,
            y:Math.random()*rect.height,
            size:Math.random()*1.5+.5,
            alpha:Math.random()*.45+.25,
            speed:Math.random()*.0015+.0007,
            offset:Math.random()*Math.PI*2,
            driftX:(Math.random()-.5)*.06,
            driftY:(Math.random()-.5)*.04,
            forming:false,
            visible:true,
            targetX:0,targetY:0,
            startX:0,startY:0,
            controlX:0,controlY:0,
            progress:0,delay:0,duration:0,
            special:false,glow:0,trail:[]
        });
    }

    /* Hidden formation stars */
    for(let i=0;i<formationCount;i++){
        const side=Math.floor(Math.random()*4);
        let x,y;

        if(side===0){
            x=Math.random()*rect.width;
            y=-40-Math.random()*160;
        }else if(side===1){
            x=Math.random()*rect.width;
            y=rect.height+40+Math.random()*160;
        }else if(side===2){
            x=-40-Math.random()*160;
            y=Math.random()*rect.height;
        }else{
            x=rect.width+40+Math.random()*160;
            y=Math.random()*rect.height;
        }

        stars.push({
            x,y,
            size:Math.random()*1.7+.65,
            alpha:Math.random()*.45+.45,
            speed:Math.random()*.0015+.0007,
            offset:Math.random()*Math.PI*2,
            driftX:0,driftY:0,
            forming:false,
            visible:false,
            targetX:0,targetY:0,
            startX:0,startY:0,
            controlX:0,controlY:0,
            progress:0,
            delay:0,
            duration:1900+Math.random()*600,
            special:false,
            glow:0,
            trail:[]
        });
    }

    return stars;
}

/* ---------- Main Animation ---------- */

function animateBirthdayScene(time){
    if(!birthdayScene.canvas)return;

    const ctx=birthdayScene.ctx;
    const rect=birthdayScene.canvas.getBoundingClientRect();

    ctx.clearRect(0,0,rect.width,rect.height);

    birthdayScene.stars.forEach(star=>{
        if(star.forming){
            animateFormationStar(star,time);
        }else if(star.visible){
            star.x+=star.driftX;
            star.y+=star.driftY;

            if(star.x<-10)star.x=rect.width+10;
            if(star.x>rect.width+10)star.x=-10;
            if(star.y<-10)star.y=rect.height+10;
            if(star.y>rect.height+10)star.y=-10;
        }

        if(!star.visible)return;

        const twinkle=
            Math.sin(time*star.speed+star.offset)*.18;

        let alpha=star.alpha+twinkle+star.glow;
        alpha=Math.max(.08,Math.min(1,alpha));

        drawBirthdayStar(ctx,star,alpha);
    });

    requestAnimationFrame(animateBirthdayScene);
}

/* ---------- Draw Star ---------- */

function drawBirthdayStar(ctx,star,alpha){
    ctx.save();
    ctx.globalAlpha=alpha;

    const s=star.size;

    ctx.shadowBlur=star.special?38:7;
    ctx.shadowColor="rgba(255,225,155,.95)";

    ctx.beginPath();
    ctx.moveTo(star.x,star.y-s*2);
    ctx.lineTo(star.x+s*.6,star.y-s*.3);
    ctx.lineTo(star.x+s*2,star.y);
    ctx.lineTo(star.x+s*.6,star.y+s*.3);
    ctx.lineTo(star.x,star.y+s*2);
    ctx.lineTo(star.x-s*.6,star.y+s*.3);
    ctx.lineTo(star.x-s*2,star.y);
    ctx.lineTo(star.x-s*.6,star.y-s*.3);
    ctx.closePath();

    ctx.fillStyle="rgba(255,245,220,1)";
    ctx.fill();

    if(star.special&&star.glow>.2){
        ctx.beginPath();
        ctx.arc(
            star.x,
            star.y,
            s*7,
            0,
            Math.PI*2
        );

        ctx.fillStyle=
            `rgba(255,220,130,${Math.min(.3,star.glow*.12)})`;

        ctx.shadowBlur=45;
        ctx.fill();
    }

    ctx.restore();
}

/* ==========================================
   PIG CONSTELLATION
   ========================================== */

function createPigFormation(){
    const rect=birthdayScene.canvas.getBoundingClientRect();
    const targets=createPigTargets(rect.width,rect.height);

    birthdayScene.pigTargets=targets;

    const formationStars=birthdayScene.stars
        .filter(star=>!star.visible&&!star.special);

    const count=Math.min(
        targets.length,
        formationStars.length
    );

    const selected=formationStars
        .sort(()=>Math.random()-.5)
        .slice(0,count);

    selected.forEach((star,i)=>{
        const target=
    targets[Math.floor(i*targets.length/count)];

        star.forming=true;
        star.visible=true;

        star.startX=star.x;
        star.startY=star.y;
        star.targetX=target.x;
        star.targetY=target.y;

        const curve=(Math.random()-.5)*180;

        star.controlX=
            (star.startX+star.targetX)/2+curve;

        star.controlY=
            (star.startY+star.targetY)/2+
            (Math.random()-.5)*130;

        star.progress=0;
        star.delay=Math.random()*550;
        star.duration=1900+Math.random()*600;
    });
}

/* ---------- Pig Shape ---------- */
function createPigTargets(width, height){

    const points = [];

    /*
     * ==========================================
     * CUTE PIG FACE
     * ==========================================
     *
     * No body.
     * Just a plump, smiling pig face inspired
     * directly by 🐷.
     */

    const ending = document.getElementById("ending");

    const card =
        ending.querySelector(".glass-card") ||
        ending.querySelector("#glassCard") ||
        ending.querySelector(".ending-card");

    const message =
        document.getElementById("birthdayMessage");

    const canvas =
        birthdayScene.canvas;

    const canvasRect =
        canvas.getBoundingClientRect();

    let cardBottom = height * 0.30;

    if(card){
        const cardRect = card.getBoundingClientRect();

        cardBottom =
            cardRect.bottom -
            canvasRect.top;
    }

    let messageTop = height * 0.88;

    if(message){
        const messageRect =
            message.getBoundingClientRect();

        messageTop =
            messageRect.top -
            canvasRect.top;
    }

    /*
     * Keep the face comfortably between
     * the glass card and birthday message.
     */

    const availableTop =
    Math.max(cardBottom + 30, height * 0.35);

    const availableBottom =
        Math.min(messageTop - 30, height * 0.78);

    const availableHeight =
        Math.max(
            availableBottom - availableTop,
            height * 0.22
        );

    const cx = width / 2;

    /*
     * Plump face size.
     */
    const r = Math.min(
        width * 0.19,
        availableHeight * 0.40,
        115
    );

    /*
     * Centre vertically in the reserved space.
     */
const cy =
    availableTop +
    availableHeight * 0.48;

    /* ==========================================
       FACE
       ========================================== */

    /*
     * Slightly wider than tall so it feels
     * chubby rather than like a perfect circle.
     */

    for(
        let a = 0;
        a < Math.PI * 2;
        a += 0.035
    ){
        points.push({
            x: cx + Math.cos(a) * r * 1.08,
            y: cy + Math.sin(a) * r * 0.94
        });
    }

    /*
     * Soft interior constellation density.
     */
    for(let i = 0; i < 135; i++){

        const a =
            Math.random() * Math.PI * 2;

        const distance =
            Math.sqrt(Math.random());

        points.push({
            x:
                cx +
                Math.cos(a) *
                r *
                1.04 *
                distance,

            y:
                cy +
                Math.sin(a) *
                r *
                0.90 *
                distance
        });
    }


    /* ==========================================
       EARS
       ========================================== */

    const earSize = r * 0.62;

    /*
     * Left ear
     */
    addPigTriangle(
        points,

        cx - r * 0.72,
        cy - r * 0.62,

        cx - r * 1.08,
        cy - r * 1.35,

        cx - r * 0.20,
        cy - r * 1.02
    );

    /*
     * Right ear
     */
    addPigTriangle(
        points,

        cx + r * 0.72,
        cy - r * 0.62,

        cx + r * 1.08,
        cy - r * 1.35,

        cx + r * 0.20,
        cy - r * 1.02
    );


    /* ==========================================
       EYES
       ========================================== */

    /*
     * Big cute eyes.
     */
    addPigCircle(
        points,
        cx - r * 0.38,
        cy - r * 0.20,
        r * 0.055,
        12
    );

    addPigCircle(
        points,
        cx + r * 0.38,
        cy - r * 0.20,
        r * 0.055,
        12
    );


    /* ==========================================
       SNOUT
       ========================================== */

    const snoutX = cx;
    const snoutY = cy + r * 0.25;
    const snoutR = r * 0.34;

    /*
     * Plump snout outline.
     */
    for(
        let a = 0;
        a < Math.PI * 2;
        a += 0.055
    ){
        points.push({
            x:
                snoutX +
                Math.cos(a) *
                snoutR *
                1.12,

            y:
                snoutY +
                Math.sin(a) *
                snoutR *
                0.72
        });
    }

    /*
     * Snout interior.
     */
    for(let i = 0; i < 35; i++){

        const a =
            Math.random() * Math.PI * 2;

        const distance =
            Math.sqrt(Math.random());

        points.push({
            x:
                snoutX +
                Math.cos(a) *
                snoutR *
                distance,

            y:
                snoutY +
                Math.sin(a) *
                snoutR *
                0.65 *
                distance
        });
    }


    /* ==========================================
       NOSTRILS
       ========================================== */

    addPigCircle(
        points,
        snoutX - snoutR * 0.36,
        snoutY,
        r * 0.035,
        7
    );

    addPigCircle(
        points,
        snoutX + snoutR * 0.36,
        snoutY,
        r * 0.035,
        7
    );


    /* ==========================================
       SMILING MOUTH
       ========================================== */

    /*
     * Broad little smile beneath the snout.
     */

    for(
        let a = 0.15;
        a < Math.PI - 0.15;
        a += 0.055
    ){
        points.push({
            x:
                cx +
                Math.cos(a) *
                r * 0.30,

            y:
                cy +
                r * 0.54 +
                Math.sin(a) *
                r * 0.13
        });
    }


    /* ==========================================
       CUTE CHEEKS
       ========================================== */

    /*
     * Small cheek clusters make the face
     * feel more expressive and plump.
     */

    addPigCircle(
        points,
        cx - r * 0.68,
        cy + r * 0.28,
        r * 0.08,
        10
    );

    addPigCircle(
        points,
        cx + r * 0.68,
        cy + r * 0.28,
        r * 0.08,
        10
    );


    /* ==========================================
       TINY CROOKED BIRTHDAY PARTY HAT 🎉
       ========================================== */

    /*
     * A small silly hat sitting slightly
     * crookedly on the pig's right ear.
     */

    addPigTriangle(
        points,

        cx + r * 0.48,
        cy - r * 0.92,

        cx + r * 0.92,
        cy - r * 1.58,

        cx + r * 1.02,
        cy - r * 0.88
    );

    /*
     * Tiny hat pom-pom.
     */
    addPigCircle(
        points,
        cx + r * 0.92,
        cy - r * 1.60,
        r * 0.07,
        8
    );


    return points;
}

/* ---------- Pig Helpers ---------- */

function addPigCircle(points,cx,cy,r,density){
    for(let a=0;a<Math.PI*2;a+=.25){
        points.push({
            x:cx+Math.cos(a)*r,
            y:cy+Math.sin(a)*r
        });
    }

    for(let i=0;i<density;i++){
        points.push({
            x:cx+(Math.random()-.5)*r*1.5,
            y:cy+(Math.random()-.5)*r*1.5
        });
    }
}

function addPigTriangle(points,x1,y1,x2,y2,x3,y3){
    const count=25;

    for(let i=0;i<count;i++){
        const a=Math.random();
        const b=Math.random()*(1-a);

        points.push({
            x:x1+a*(x2-x1)+b*(x3-x1),
            y:y1+a*(y2-y1)+b*(y3-y1)
        });
    }

    points.push(
        {x:x1,y:y1},
        {x:x2,y:y2},
        {x:x3,y:y3}
    );
}

/* ==========================================
   FORMATION MOVEMENT
   ========================================== */

function animateFormationStar(star,time){
    if(star.delay>0){
        star.delay-=16;
        return;
    }

    star.progress+=16/star.duration;

    const p=Math.min(star.progress,1);

    const ease=p<.5
        ?4*p*p*p
        :1-Math.pow(-2*p+2,3)/2;

    const inv=1-ease;

    star.x=
        inv*inv*star.startX+
        2*inv*ease*star.controlX+
        ease*ease*star.targetX;

    star.y=
        inv*inv*star.startY+
        2*inv*ease*star.controlY+
        ease*ease*star.targetY;

    /* Gentle formation sparkle */
    if(p>.75){
        star.glow=Math.min(.35,star.glow+.015);
    }

    if(p>=1){
        star.x=star.targetX;
        star.y=star.targetY;
        star.forming=false;
        star.glow=0;
    }
}

/* ==========================================
   REAL ASTON SCRIPT TEXT
   ========================================== */

function showBirthdayText(){
    const message=document.getElementById("birthdayMessage");
    if(!message)return;

    message.classList.add("show");
    birthdayScene.textShown=true;

    /* Lazy star waits until text has appeared */
    setTimeout(startLazyBirthdayStar,1500);
}

/* ==========================================
   LAZY STAR
   ========================================== */

function startLazyBirthdayStar(){
    const canvas=birthdayScene.canvas;
    const rect=canvas.getBoundingClientRect();

    const text=document.getElementById("birthdayText");
    if(!text)return;

    const target=findBirthdayIDot(text,rect);
    if(!target)return;

    const star={
        x:rect.width+80,
        y:rect.height*.18,
        size:2.8,
        alpha:1,
        special:true,
        glow:0,
        targetX:target.x,
        targetY:target.y,
        startX:rect.width+80,
        startY:rect.height*.18,
        controlX:rect.width*.72,
        controlY:rect.height*.30,
        progress:0,
        duration:1150,
        trail:[]
    };

    birthdayScene.lazyStar=star;

    animateLazyStar(star);
}

/* ---------- Locate actual i ---------- */

function findBirthdayIDot(textElement, canvasRect){

    const textNode = textElement.firstChild;

    if(!textNode) return null;

    const full = textNode.textContent;

    /*
     * Specifically target the "i" in "Birthday"
     */
    const birthdayStart =
        full.indexOf("Birthday");

    if(birthdayStart < 0) return null;

    const index =
        birthdayStart + "B".length;

    /*
     * "Birthday":
     * B = 0
     * i = 1
     */
    const range = document.createRange();

    range.setStart(textNode, index);
    range.setEnd(textNode, index + 1);

    const r = range.getBoundingClientRect();

    return {
        x: r.left - canvasRect.left + r.width / 2,

        /*
         * Move to the actual upper part of
         * the lowercase i where its dot sits.
         */
        y: r.top - canvasRect.top + r.height * 0.16
    };
}
/* ---------- Lazy Star Movement ---------- */

function animateLazyStar(star){
    const start=performance.now();

    function frame(now){
        const elapsed=now-start;
        const p=Math.min(elapsed/star.duration,1);

        const ease=p<.5
            ?4*p*p*p
            :1-Math.pow(-2*p+2,3)/2;

        const inv=1-ease;

        star.x=
            inv*inv*star.startX+
            2*inv*ease*star.controlX+
            ease*ease*star.targetX;

        star.y=
            inv*inv*star.startY+
            2*inv*ease*star.controlY+
            ease*ease*star.targetY;

        star.trail.push({
            x:star.x,
            y:star.y
        });

        if(star.trail.length>12)
            star.trail.shift();

        if(p>.72)
            star.glow=Math.min(1,star.glow+.07);

        if(p>=1){
            star.x=star.targetX;
            star.y=star.targetY;
            triggerBirthdayFlash(star);
            return;
        }

        requestAnimationFrame(()=>frame(performance.now()));
    }

    requestAnimationFrame(frame);
}

/* ---------- Golden Flash ---------- */

function triggerBirthdayFlash(star){
    if(birthdayScene.flash)return;

    birthdayScene.flash=true;

    const flash=document.getElementById("birthdayFlash");
    const canvasRect=birthdayScene.canvas.getBoundingClientRect();

    flash.style.setProperty(
        "--flash-x",
        `${(star.x/canvasRect.width)*100}%`
    );

    flash.style.setProperty(
        "--flash-y",
        `${(star.y/canvasRect.height)*100}%`
    );

    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");

    /* Star itself blooms */
    star.glow=2;

    setTimeout(()=>{
        star.glow=.55;
    },230);

    setTimeout(()=>{
        star.glow=.15;
    },520);
    
    setTimeout(() => {

    const ending =
        document.getElementById("ending");

    if (ending) {
        ending.classList.add(
            "constellation-finished"
        );
    }

    startHuntTransition();

}, 38000);

}
/* =========================================================
   V2.0 — CONSTELLATION → HUNT TRANSITION
========================================================= */

function startHuntTransition(){

    const ending =
        document.getElementById("ending");

    const transition =
        document.getElementById("huntTransition");

    if(!ending || !transition){
        console.warn(
            "Hunt transition sections not found."
        );

        return;
    }


    /*
       Move from constellation to the
       completely black transition screen.
    */

    hideAllScreens();

    transition.classList.add("active");
startHuntMusic();

    const intro =
        document.getElementById(
            "huntTransitionIntro"
        );

    const choice =
        document.getElementById(
            "huntTransitionChoice"
        );

    const maintenance =
        document.getElementById(
            "huntTransitionMaintenance"
        );

    const complete =
        document.getElementById(
            "huntTransitionComplete"
        );


    /*
       Reset transition state.
    */

    [intro, choice, maintenance, complete]
        .forEach(panel => {

            if(panel){
                panel.hidden = true;
            }

        });


    if(intro){
        intro.hidden = false;
    }
const butWait =
    document.getElementById(
        "huntTransitionButWait"
    );

if (butWait) {
    butWait.style.opacity = "0";

    setTimeout(() => {
        butWait.style.opacity = "1";
    }, 3500);
}

    /*
       STAGE 1
    */

    const whatButton =
        document.getElementById(
            "huntTransitionWhatBtn"
        );

    whatButton?.addEventListener(
        "click",
        () => {

            intro.hidden = true;
            choice.hidden = false;

        },
        { once: true }
    );


    /*
       STAGE 2 — THE FAKE CHOICE
    */

    const choiceButtons =
        document.querySelectorAll(
            ".hunt-transition-option"
        );

    const choiceResponse =
        document.getElementById(
            "huntTransitionChoiceResponse"
        );

    const continueButton =
        document.getElementById(
            "huntTransitionContinueBtn"
        );


    choiceButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                choiceButtons.forEach(
                    option => {

                        option.disabled = true;

                    }
                );


                choiceResponse.textContent =
                    "Your response has been carefully recorded.\n\n" +
                    "It has been considered.\n\n" +
                    "It will not affect what happens next. 😂";

                continueButton.hidden =
                    false;

            },
            { once: true }
        );

    });


    /*
       STAGE 2 → STAGE 3
    */

    continueButton?.addEventListener(
        "click",
        () => {

            choice.hidden = true;
            maintenance.hidden = false;

        },
        { once: true }
    );


    /*
       STAGE 3 → STAGE 4
    */

    const maintenanceButton =
        document.getElementById(
            "huntTransitionMaintenanceBtn"
        );

    maintenanceButton?.addEventListener(
        "click",
        () => {

            maintenance.hidden = true;
            complete.hidden = false;

        },
        { once: true }
    );


    /*
       STAGE 4 → HUNT 1
    */

    const beginButton =
        document.getElementById(
            "huntTransitionBeginBtn"
        );

    beginButton?.addEventListener(
    "click",
    () => {

        if (
            typeof window.startHunt1FromMain ===
            "function"
        ) {

            window.startHunt1FromMain();

        } else {

            console.warn(
                "Hunt 1 initializer not available."
            );

        }

    },
    { once: true }
);

}
/* ---------- Draw Lazy Star ---------- */

function drawLazyStar(ctx,star){
    ctx.save();

    ctx.globalAlpha=1;
    ctx.shadowBlur=star.glow>1?55:18;
    ctx.shadowColor="rgba(255,220,125,.95)";

    const s=star.size*(star.glow>1?1.4:1);

    ctx.beginPath();
    ctx.moveTo(star.x,star.y-s*3);
    ctx.lineTo(star.x+s*.7,star.y-s*.5);
    ctx.lineTo(star.x+s*3,star.y);
    ctx.lineTo(star.x+s*.7,star.y+s*.5);
    ctx.lineTo(star.x,star.y+s*3);
    ctx.lineTo(star.x-s*.7,star.y+s*.5);
    ctx.lineTo(star.x-s*3,star.y);
    ctx.lineTo(star.x-s*.7,star.y-s*.5);
    ctx.closePath();

    ctx.fillStyle="rgba(255,248,215,1)";
    ctx.fill();

    ctx.restore();
}

/* ---------- Add lazy star to main loop ---------- */

const originalBirthdayAnimation=animateBirthdayScene;

animateBirthdayScene=function(time){
    originalBirthdayAnimation(time);

    const star=birthdayScene.lazyStar;
    if(!star)return;

    const ctx=birthdayScene.ctx;

    /* Whoosh trail */
    star.trail.forEach((point,i)=>{
        const alpha=(i/star.trail.length)*.22;

        ctx.save();
        ctx.globalAlpha=alpha;
        ctx.beginPath();
        ctx.arc(
            point.x,
            point.y,
            star.size*.65,
            0,
            Math.PI*2
        );
        ctx.fillStyle="rgba(255,220,140,1)";
        ctx.shadowBlur=15;
        ctx.shadowColor="rgba(255,215,130,.8)";
        ctx.fill();
        ctx.restore();
    });

    drawLazyStar(ctx,star);
};

/* ---------- Resize ---------- */

window.addEventListener("resize",()=>{
    if(!birthdayScene.canvas)return;
    resizeBirthdayScene();
});

/* =========================================================
   V2.0 — HUNT 1 STANDALONE TEST MODE
   Accessible only through:

       index.html?test=hunt1

   This block intentionally does NOT use:
   elements
   attachEvents()
   letterButton
   memoryButton
   finishButton
   result screen
   ending screen
   existing journey functions
========================================================= */

/* =========================================================
   V2.0 — HUNT 1 STANDALONE TEST MODE
   Acode test URL:

   index.html?test=hunt1
========================================================= */

(() => {

    function hunt1TestStart(forceMainStart = false) {

        const params =
            new URLSearchParams(
                window.location.search
            );

        if (
    !forceMainStart &&
    params.get("test") !== "hunt1"
) {
    return;
}

        const hunt1 =
            document.getElementById("hunt1");

        if (!hunt1) {

            console.warn(
                "Hunt 1 section not found."
            );

            return;
        }


        /* Hide normal screens ONLY in test mode */

        document
            .querySelectorAll(".screen")
            .forEach(screen => {

                screen.classList.remove(
                    "active"
                );

            });


        hunt1.classList.add("active");


        const hotspots =
            hunt1.querySelectorAll(
                ".hunt1-hotspot"
            );

        const dots =
            hunt1.querySelectorAll(
                ".hunt1-dot"
            );

        const status =
            document.getElementById(
                "hunt1Status"
            );


        const found =
            new Set();
if (forceMainStart) {

    dots[0].classList.add(
        "found"
    );

}

        /* ==========================================
           HOTSPOT POSITIONS
        ========================================== */

        const positions = {

    pendant: {
        left: 59.5,
        top: 58.5,
        width: 7,
        height: 7
    },

    guitar: {
    left: 71,
    top: 7,
    width: 10,
    height: 10
},

    buttons: {
        left: 38,
        top: 58,
        width: 6,
        height: 15
    },

    "orange-flower": {
        left: 81,
        top: 45,
        width: 10,
        height: 10
    },

    "red-flower": {
        left: 84,
        top: 8,
        width: 9,
        height: 9
    }

};

        /* ==========================================
           SET HOTSPOTS
        ========================================== */

        hotspots.forEach(hotspot => {

            const key =
                hotspot.dataset.hunt1;

            const position =
                positions[key];

            if (!position) {
                return;
            }


            hotspot.style.left =
                position.left + "%";

            hotspot.style.top =
                position.top + "%";

            hotspot.style.width =
                position.width + "%";

            hotspot.style.height =
                position.height + "%";


            hotspot.addEventListener(
                "click",
                () => {

                    if (
                        found.has(key)
                    ) {
                        return;
                    }


                    found.add(key);

                    hotspot.classList.add(
                        "hunt1-found"
                    );


                    /* First four fill dots */

                    if (
                        found.size <= 4
                    ) {

                        dots[
                            found.size - 1
                        ].classList.add(
                            "found"
                        );

                    }


                    /* FOUR FOUND */

                    if (
    found.size === 4
) {
    status.textContent =
        "Four found. That's enough... 👀";

    status.classList.add(
        "hunt1-success"
    );

    /* ==========================================
       PROCEED TO HUNT 2
    ========================================== */

    if (
        !document.getElementById(
            "hunt1NextButton"
        )
    ) {

        const nextButton =
            document.createElement("button");

        nextButton.id =
            "hunt1NextButton";

        nextButton.type =
            "button";

        nextButton.textContent =
            "THAT'S ENOUGH. WHAT'S NEXT? →";

        nextButton.className =
            "hunt1-next-button";

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    typeof window.startHunt2FromMain ===
                    "function"
                ) {
                    window.startHunt2FromMain();
                }

            },
            { once: true }
        );

        hunt1
            .querySelector(".hunt1-card")
            .appendChild(nextButton);
    }
}


                    /* FIFTH FOUND */

                    if (found.size === 5) {

    dots.forEach(dot => {
        dot.classList.add("found");
    });

    status.textContent =
        "FIVE?! You actually found ALL of them! 😭";

    status.classList.remove(
        "hunt1-success"
    );

    status.classList.add(
        "hunt1-bonus"
    );

    showHunt1ChocolateBonus();

}

                }
            );

        });


        console.log(
            "🖼️ HUNT 1 TEST MODE ACTIVE"
        );

    }

/* =========================================================
   HUNT 1 ENTRY POINTS
========================================================= */

/*
   STANDALONE TEST ONLY:
   index.html?test=hunt1
*/
function startHunt1StandaloneTest() {
    const params = new URLSearchParams(
        window.location.search
    );

    if (params.get("test") !== "hunt1") {
        return;
    }

    hunt1TestStart(false);
}


/*
   MAIN WEBSITE FLOW ONLY:
   Called by the constellation → hunt transition.
*/
window.startHunt1FromMain = function () {
    hunt1TestStart(true);
};


/*
   Only activate standalone Hunt 1 when the
   explicit test parameter exists.
*/
if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        startHunt1StandaloneTest,
        { once: true }
    );

} else {

    startHunt1StandaloneTest();

}

function showHunt1ChocolateBonus() {

    /*
       Prevent duplicate celebration.
    */

    if (
        document.getElementById(
            "hunt1ChocolateBonus"
        )
    ) {
        return;
    }


    /* ==========================================
       OVERLAY
    ========================================== */

    const overlay =
        document.createElement("div");

    overlay.id =
        "hunt1ChocolateBonus";

    overlay.innerHTML = `

        <div class="hunt1-confetti-layer"></div>

        <div class="hunt1-chocolate-message">

            <div class="hunt1-big-chocolate">
                🍫
            </div>

            <h2>
                CONGRATULATIONS, BABLU! 🎉
            </h2>

            <p>
                You found the forbidden fifth difference.
            </p>

            <p>
                <strong>
                    You just won yourself a TREAT!
                </strong>
            </p>

            <p class="hunt1-bablu-line">
                You're really my Bablu. 😂❤️
            </p>

            <button
                id="hunt1BonusNextButton"
                type="button"
                class="hunt1-next-button"
            >
               ❤️PRIZE SECURED. NEXT QUESTION →
            </button>

        </div>
    `;


    document.body.appendChild(
        overlay
    );


    /* ==========================================
       NEXT QUESTION → HUNT 2
    ========================================== */

    const bonusNextButton =
        document.getElementById(
            "hunt1BonusNextButton"
        );

    if (bonusNextButton) {

        bonusNextButton.addEventListener(
    "click",
    () => {

        /* Remove Hunt 1 popup first */
        overlay.remove();

        /* Then start Hunt 2 */
        if (
            typeof window.startHunt2FromMain ===
            "function"
        ) {

            window.startHunt2FromMain();

        } else {

            console.warn(
                "Hunt 2 initializer not available."
            );

        }

    },
    { once: true }
);

    }


    createHunt1Confetti();

}

/* ==========================================
   LIGHTWEIGHT CONFETTI
========================================== */

function createHunt1Confetti() {

    const layer =
        document.querySelector(
            ".hunt1-confetti-layer"
        );

    if (!layer) return;


    const symbols = [
        "🎉",
        "✨",
        "🎊",
        "⭐",
        "💛"
    ];


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const piece =
            document.createElement("span");

        piece.className =
            "hunt1-confetti-piece";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDelay =
            Math.random() * .8 + "s";


        piece.style.animationDuration =
            2.2 +
            Math.random() * 1.8 +
            "s";


        piece.style.fontSize =
            .7 +
            Math.random() * .7 +
            "rem";


        layer.appendChild(
            piece
        );

    }

}
  
})();

/* =========================================================
   V2.0 — HUNT 2 STANDALONE TEST MODE
   Test with:

   index.html?test=hunt2
========================================================= */

(() => {

    function startHunt2Test(forceMainStart = false) {

        const params =
            new URLSearchParams(
                window.location.search
            );

        if (
            !forceMainStart &&
            params.get("test") !== "hunt2"
        ) {
            return;
        }


        const hunt =
            document.getElementById("hunt2");

        if (!hunt) {
            console.warn(
                "Hunt 2 section not found."
            );
            return;
        }


        /*
           Hide the normal website screens.

           This happens ONLY when ?test=hunt2
           is present.
        */

        document
            .querySelectorAll(".screen")
            .forEach(screen => {
                screen.classList.remove("active");
            });


        hunt.classList.add("active");


        const instruction =
            document.getElementById(
                "hunt2Instruction"
            );

        const report =
            document.getElementById(
                "hunt2Report"
            );

        const identity =
            document.getElementById(
                "hunt2Identity"
            );

        const confession =
            document.getElementById(
                "hunt2Confession"
            );

        const wordConfirm =
            document.getElementById(
                "hunt2WordConfirm"
            );

        const complete =
            document.getElementById(
                "hunt2Complete"
            );


        const dots =
            hunt.querySelectorAll(
                ".hunt2-dot"
            );


        /*
           ==========================================
           START REPORT
           ==========================================
        */

        document
            .getElementById("hunt2BeginBtn")
            .addEventListener(
                "click",
                () => {

                    instruction.hidden = true;
                    report.hidden = false;

                    dots[0].classList.remove(
                        "active"
                    );

                    dots[0].classList.add(
                        "done"
                    );

                    dots[1].classList.add(
                        "active"
                    );

                    setupLetterInvestigation();

                }
            );


        /*
           ==========================================
           LETTER INVESTIGATION
           ==========================================
        */

        function setupLetterInvestigation() {

    const letters =
        Array.from(
            report.querySelectorAll(
                ".hunt2-letter"
            )
        );

    const correctSequence = [
        "A", "M", "A", "R",
        "N", "A", "A", "M",
        "B", "A", "B", "L", "U",
        "K", "U", "M", "A", "R"
    ];

    let currentIndex = 0;

    /*
       Stores the actual clicked letters.

       This makes UNDO possible without
       disturbing the rest of the investigation.
    */
    const collectedLetters = [];

    const evidence =
        document.getElementById(
            "hunt2EvidenceText"
        );

    const status =
        document.getElementById(
            "hunt2Status"
        );

    const undoButton =
        document.getElementById(
            "hunt2UndoBtn"
        );


    function updateEvidence() {

        const wordLengths = [
            4,
            4,
            5,
            5
        ];

        let position = 0;

        const display =
            wordLengths.map(length => {

                let word = "";

                for (
                    let i = 0;
                    i < length;
                    i++
                ) {

                    if (
                        position <
                        collectedLetters.length
                    ) {

                        word +=
                            collectedLetters[position];

                    } else {

                        word += "_";

                    }

                    position++;

                }

                return word;

            });

        evidence.textContent =
            display.join("   ");


        undoButton.disabled =
            collectedLetters.length === 0;
    }


    /*
       WRONG LETTER
    */

    letters.forEach(letter => {

        letter.addEventListener(
            "click",
            () => {

                /*
                   Don't allow an already collected
                   letter to be clicked again.
                */

                if (
                    letter.classList.contains(
                        "collected"
                    )
                ) {
                    return;
                }


                const clicked =
                    letter.dataset.letter;

                const expected =
                    correctSequence[
                        currentIndex
                    ];


                /*
                   WRONG ORDER

                   Nothing gets collected.
                   His progress stays intact.
                */

                if (
                    clicked !== expected
                ) {

                    status.textContent =
                        "INCORRECT EVIDENCE — WRONG ORDER.";

                    status.classList.remove(
                        "success"
                    );

                    status.classList.remove(
                        "wrong"
                    );

                    void status.offsetWidth;

                    status.classList.add(
                        "wrong"
                    );

                    setTimeout(() => {

                        status.textContent =
                            "Investigation awaiting evidence...";

                    }, 1000);

                    return;
                }


                /*
                   CORRECT LETTER
                */

                letter.classList.add(
                    "collected"
                );

                collectedLetters.push(
                    clicked
                );

                currentIndex++;

                updateEvidence();


                status.textContent =
                    "EVIDENCE ACCEPTED";

                status.classList.remove(
                    "wrong"
                );

                status.classList.add(
                    "success"
                );


                /*
                   CASE CLOSED
                */

                if (
                    currentIndex ===
                    correctSequence.length
                ) {

                    undoButton.disabled = true;

                    setTimeout(() => {

                        report.hidden = true;

                        dots[1].classList.remove(
                            "active"
                        );

                        dots[1].classList.add(
                            "done"
                        );

                        dots[2].classList.add(
                            "active"
                        );

                        identity.hidden = false;

                    }, 1000);

                }

            }
        );

    });


    /*
       ==========================================
       UNDO LAST EVIDENCE
       ==========================================
    */

    undoButton.addEventListener(
        "click",
        () => {

            if (
                collectedLetters.length === 0
            ) {
                return;
            }


            /*
               Remove the last collected letter.
            */

            collectedLetters.pop();

            currentIndex =
                collectedLetters.length;


            /*
               Remove visual collected state
               from the corresponding letter.
            */

            const lastCorrectLetter =
                correctSequence[
                    currentIndex
                ];

            /*
               Find the last collected instance
               belonging to that position.

               Because letters can repeat,
               we work backwards through the
               currently collected elements.
            */

            for (
                let i = letters.length - 1;
                i >= 0;
                i--
            ) {

                const letter =
                    letters[i];

                if (
                    letter.classList.contains(
                        "collected"
                    ) &&
                    letter.dataset.letter ===
                    lastCorrectLetter
                ) {

                    letter.classList.remove(
                        "collected"
                    );

                    break;
                }

            }


            updateEvidence();


            status.textContent =
                "LAST EVIDENCE REMOVED.";

            status.classList.remove(
                "success"
            );

            status.classList.remove(
                "wrong"
            );

        }
    );


    updateEvidence();

}
        /*
           ==========================================
           IDENTITY ACCEPTANCE
           ==========================================
        */

        document
            .getElementById(
                "hunt2ConfessionStart"
            )
            .addEventListener(
                "click",
                () => {

                    identity.hidden = true;
                    confession.hidden = false;

                }
            );


        /*
           ==========================================
           "I'VE DONE IT"
           ==========================================
        */

        document
            .getElementById(
                "hunt2DoneBtn"
            )
            .addEventListener(
                "click",
                () => {

                    confession.hidden = true;
                    wordConfirm.hidden = false;

                    dots[2].classList.remove(
                        "active"
                    );

                    dots[2].classList.add(
                        "done"
                    );

                    dots[3].classList.add(
                        "active"
                    );

                }
            );


        /*
           ==========================================
           FIVE CONFIRMATIONS
           ==========================================
        */

let confirmationCount = 1;

document
    .getElementById("hunt2SwearBtn")
    .addEventListener("click", () => {

        const progress =
            document.getElementById(
                "hunt2ConfessionProgress"
            );

        const button =
            document.getElementById(
                "hunt2SwearBtn"
            );

        // The current button press has now been counted.
        if (confirmationCount >= 5) {

            button.disabled = true;

            progress.textContent =
                "VERBAL CONFIRMATION: 5 / 5 ✓";

            dots[3].classList.remove("active");
            dots[3].classList.add("done");

            setTimeout(() => {

                wordConfirm.hidden = true;
                complete.hidden = false;

            }, 700);

            return;
        }

        // Move to the next confirmation.
        confirmationCount++;

        progress.textContent =
            "VERBAL CONFIRMATION: " +
            confirmationCount +
            " / 5";

        const nextButtons = [
            "I SAID IT.",
            "YES, YES, I SAID IT.",
            "ARE WE DONE YET?",
            "SPARE ME!! I'VE SUFFERED ENOUGH 😭"
        ];

        button.textContent =
            nextButtons[
                confirmationCount - 2
            ];
    });
        /*
           ==========================================
           FINAL TEST BUTTON
           ==========================================
        */

        document
    .getElementById(
        "hunt2ContinueBtn"
    )
    .addEventListener(
        "click",
        () => {

            if (
                typeof window.startHunt3FromMain ===
                "function"
            ) {

                window.startHunt3FromMain();

            } else {

                console.warn(
                    "Hunt 3 initializer not available."
                );

            }

        }
    );


        console.log(
            "🔎 HUNT 2 TEST MODE ACTIVE"
        );

    }


    /*
       Wait for DOM
    */
window.startHunt2FromMain = function () {
    startHunt2Test(true);
};
    /*
   ==========================================
   HUNT 2 — NORMAL WEBSITE STARTUP GUARD
   ==========================================
*/

/* 
   Hunt 2 is NEVER started automatically.
   It only starts when:
   
   1. URL is ?test=hunt2
   OR
   2. Hunt 1 explicitly calls
      window.startHunt2FromMain()
*/

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            startHunt2Test(false);
        },
        { once: true }
    );

} else {

    startHunt2Test(false);

}

})();

/* =========================================================
   V2.0 — HUNT 3
   STANDALONE TEST MODE

   Test with:

   index.html?test=hunt3
========================================================= */

(() => {

    function startHunt3Test(forceMainStart = false) {

        const params =
            new URLSearchParams(
                window.location.search
            );

        if (
    !forceMainStart &&
    params.get("test") !== "hunt3"
) {
    return;
}


        const hunt =
            document.getElementById(
                "hunt3"
            );

        if (!hunt) {

            console.warn(
                "Hunt 3 section not found."
            );

            return;
        }


        /*
           ONLY in ?test=hunt3 mode,
           hide the normal screens.
        */

        document
            .querySelectorAll(".screen")
            .forEach(screen => {

                screen.classList.remove(
                    "active"
                );

            });


        hunt.classList.add(
            "active"
        );


        const answerInput =
            document.getElementById(
                "hunt3Answer"
            );

        const submitButton =
            document.getElementById(
                "hunt3Submit"
            );

        const feedback =
            document.getElementById(
                "hunt3Feedback"
            );

        const answerArea =
            document.querySelector(
                ".hunt3-answer-area"
            );

        const success =
            document.getElementById(
                "hunt3Success"
            );


        /*
           =================================================
           ANSWER VALIDATION
           =================================================

           Accepted:

           CHAPTER
           chapter
           Chapter
           cHaPtEr
           C h a p t e r
           C H A P T E R

           Not accepted:

           CHAPTERS
           CHAPTE
           CHAPTOR
           C H A P T E R X

           Only whitespace is removed.
        */

        function checkAnswer() {

            const answer =
                answerInput.value
                    .replace(/\s+/g, "")
                    .toLowerCase();


            /*
               Exact match after whitespace removal.
            */

            if (
                answer === "chapter"
            ) {

                handleCorrectAnswer();

                return;
            }


            /*
               Wrong answer
            */

            feedback.textContent =
                "INCORRECT. The story refuses to cooperate. 😌";

            feedback.classList.remove(
                "success"
            );

            feedback.classList.remove(
                "wrong"
            );

            void feedback.offsetWidth;

            feedback.classList.add(
                "wrong"
            );

        }


        /*
           =================================================
           CORRECT ANSWER
           =================================================
        */

        function handleCorrectAnswer() {

            feedback.textContent =
                "ANSWER ACCEPTED ✓";

            feedback.classList.remove(
                "wrong"
            );

            feedback.classList.add(
                "success"
            );


            submitButton.disabled =
                true;

            answerInput.disabled =
                true;


            setTimeout(() => {

                answerArea.hidden =
                    true;

                success.hidden =
                    false;

            }, 700);

        }


        /*
           Submit button
        */

        submitButton.addEventListener(
            "click",
            checkAnswer
        );


        /*
           Enter key also submits.
           This makes mobile/keyboard behaviour
           nicer without adding complexity.
        */

        answerInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    checkAnswer();

                }

            }
        );


        /*
           =================================================
           TEMPORARY CONTINUE BUTTON
           =================================================

           Deliberately does NOT connect to Hunt 4 yet.
        */

        document
    .getElementById(
        "hunt3Continue"
    )
    .addEventListener(
        "click",
        () => {

            if (
                typeof window.startHunt4FromMain ===
                "function"
            ) {

                window.startHunt4FromMain();

            } else {

                console.warn(
                    "Hunt 4 initializer not available."
                );

            }

        }
    );


        console.log(
            "📖 HUNT 3 TEST MODE ACTIVE"
        );

    }

window.startHunt3FromMain = function () {

    startHunt3Test(true);

};
    /*
       Wait for DOM.
    */

    if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            startHunt3Test(false);
        },
        { once: true }
    );

} else {

    startHunt3Test(false);

}

})();

/* =========================================================
   V2.0 — HUNT 4
   THE GRAND LUCK TEST

   TEST MODE:

   index.html?test=hunt4
========================================================= */

(() => {

    /*
       ================================================
       ONE PLACE ONLY FOR THE FUTURE PRIZE NAME
       ================================================
    */

    const HUNT4_PRIZE = "The bottles should already have given you the HINT🤫";


    /*
       ================================================
       WHICH BOTTLE IS LUCKY?

       0 = A
       1 = B
       2 = C
       3 = D

       Temporary value for testing.
       We can change this later.
       ================================================
    */

    const HUNT4_LUCKY_BOTTLE = 2;


    function startHunt4Test(
    forceMainStart = false
) {

        const params =
            new URLSearchParams(
                window.location.search
            );

        if (
    !forceMainStart &&
    params.get("test") !== "hunt4"
) {
    return;
}


        const intro =
            document.getElementById(
                "hunt4Intro"
            );

        const bottlesScreen =
            document.getElementById(
                "hunt4Bottles"
            );

        if (
            !intro ||
            !bottlesScreen
        ) {

            console.warn(
                "Hunt 4 sections not found."
            );

            return;
        }


        /*
           ============================================
           TEST MODE ONLY

           Hide every normal website screen.
           ============================================
        */

        document
            .querySelectorAll(".screen")
            .forEach(screen => {

                screen.classList.remove(
                    "active"
                );

            });


        intro.classList.add(
            "active"
        );


        /*
           ============================================
           INTRO → BOTTLES
           ============================================
        */

        const beginButton =
            document.getElementById(
                "hunt4Begin"
            );


        beginButton.addEventListener(
            "click",
            () => {

                intro.classList.remove(
                    "active"
                );

                setTimeout(() => {

                    bottlesScreen.classList.add(
                        "active"
                    );

                }, 250);

            }
        );


        /*
           ============================================
           BOTTLE LOGIC
           ============================================
        */

        const bottles =
            document.querySelectorAll(
                ".hunt4-bottle"
            );

        const result =
            document.getElementById(
                "hunt4Result"
            );

        const resultIcon =
            document.getElementById(
                "hunt4ResultIcon"
            );

        const resultTitle =
            document.getElementById(
                "hunt4ResultTitle"
            );

        const resultText =
            document.getElementById(
                "hunt4ResultText"
            );

        const prizeReveal =
            document.getElementById(
                "hunt4PrizeReveal"
            );

        const prizeText =
            document.getElementById(
                "hunt4PrizeText"
            );
const loduClause =
    document.getElementById(
        "hunt4LoduClause"
    );

const loduAccept =
    document.getElementById(
        "hunt4LoduAccept"
    );

 const continueButton =
    document.getElementById(
        "hunt4Continue"
    );       

let choiceMade = false;
/*
   ============================================
   GRAND RESULT EFFECT
   ============================================
*/

function createHunt4Reactions(type) {

    const layer =
        document.createElement("div");

    layer.className =
        "hunt4-reaction-layer " + type;

    const winnerEmojis = [
        "🎉", "🥳", "✨", "🎊", "💫",
        "🎉", "✨", "🥳", "🎊", "❤️",
        "🎉", "💫", "✨", "🎊"
    ];

    const loserEmojis = [
        "😭", "💔", "🥲", "😵‍💫", "😩",
        "💀", "😭", "💔", "🥲", "😮‍💨",
        "😭", "💔", "😵‍💫", "🥲"
    ];

    const emojis =
        type === "winner"
            ? winnerEmojis
            : loserEmojis;


    emojis.forEach(
        (emoji, index) => {

            const piece =
                document.createElement("span");

            piece.className =
                "hunt4-reaction-piece";

            piece.textContent =
                emoji;

            piece.style.left =
                (5 + Math.random() * 90) + "%";

            piece.style.animationDelay =
                (Math.random() * .7) + "s";

            piece.style.animationDuration =
                (2.1 + Math.random() * 1.4) + "s";

            layer.appendChild(
                piece
            );

        }
    );


    document.body.appendChild(
        layer
    );


    setTimeout(
        () => {

            layer.remove();

        },
        4200
    );
}


/*
   ============================================
   ONE CHANCE — BOTTLE LOGIC
   ============================================
*/

bottles.forEach(
    bottle => {

        bottle.addEventListener(
            "click",
            () => {

                /*
                   ONE CHANCE ONLY.
                */

                if (
                    choiceMade
                ) {
                    return;
                }

                choiceMade =
                    true;


                const chosenBottle =
                    Number(
                        bottle.dataset.bottle
                    );


                /*
                   Disable every other bottle.
                */

                bottles.forEach(
                    otherBottle => {

                        if (
                            otherBottle !==
                            bottle
                        ) {

                            otherBottle.classList.add(
                                "disabled"
                            );

                        }

                    }
                );


                /*
                   Dramatic selection.
                */

                bottle.classList.add(
                    "chosen"
                );


                setTimeout(
                    () => {

                        bottle.classList.remove(
                            "chosen"
                        );


                        /*
                           =================================
                           DETERMINE RESULT
                           =================================
                        */

                        const won =
                            chosenBottle ===
                            HUNT4_LUCKY_BOTTLE;


                        /*
                           =================================
                           BOTTLE BREAK
                           =================================
                        */

                        bottle.classList.add(
                            "broken"
                        );


                        /*
                           Create reaction emoji
                           INSIDE the bottle area.
                        */

                        const reaction =
                            document.createElement(
                                "span"
                            );

                        reaction.className =
                            "hunt4-bottle-reaction " +
                            (
                                won
                                    ? "winner"
                                    : "loser"
                            );

                        reaction.textContent =
                            won
                                ? "🎉"
                                : "💔";


                        const visual =
                            bottle.querySelector(
                                ".hunt4-bottle-visual"
                            );


                        if (
                            visual
                        ) {

                            visual.appendChild(
                                reaction
                            );

                        }


                        /*
                           =================================
                           GRAND SCREEN REACTION
                           =================================
                        */

                        setTimeout(
                            () => {

                                createHunt4Reactions(
                                    won
                                        ? "winner"
                                        : "loser"
                                );


                                /*
                                   =================================
                                   WIN
                                   =================================
                                */

                                if (
                                    won
                                ) {

                                    resultIcon.textContent =
                                        "🎉";

                                    resultTitle.textContent =
                                        "THE UNIVERSE CHOSE YOU.";

                                    resultText.textContent =
                                        "Against absolutely unreasonable odds, your birthday luck has decided to cooperate. You actually found the one.";

                                    prizeText.textContent =
                                        HUNT4_PRIZE;

                                    prizeReveal.hidden =
                                        false;
loduClause.hidden =
    false;
                                    result.classList.remove(
                                        "hunt4-result-loss"
                                    );

                                    result.classList.add(
                                        "hunt4-result-win"
                                    );

                                    result.hidden =
    false;

if (continueButton) {
    continueButton.hidden = true;
}

return;

                                }


                                /*
                                   =================================
                                   LOSS
                                   =================================
                                */

                                resultIcon.textContent =
                                    "💔";

                                resultTitle.textContent =
                                    "OH. THAT WAS NOT IT.";

                                resultText.textContent =
                                    "Your one glorious attempt has been judged by the universe... and the universe has chosen chaos.";

                                prizeReveal.hidden =
                                    true;

                                result.classList.remove(
                                    "hunt4-result-win"
                                );

                                result.classList.add(
                                    "hunt4-result-loss"
                                );

                               result.hidden =
    false;

if (continueButton) {
    continueButton.hidden = false;
}

                            },
                            700
                        );


                    },
                    450
                );

            }
        );

    }
);

loduAccept.addEventListener(
    "click",
    () => {

        loduAccept.textContent =
            "CLAUSE ACCEPTED. LODU GETS HER SHARE. 😌";

        loduAccept.classList.add(
            "accepted"
        );

        loduAccept.disabled =
            true;

        /*
           After 5 seconds, transform
           the SAME button into the
           final ending button.
        */

        setTimeout(() => {

            loduAccept.textContent =
                "THE ARCHIVES HAVE ONE FINAL THING TO SAY →";

            loduAccept.classList.remove(
                "accepted"
            );

            loduAccept.classList.add(
                "final-ending-button"
            );

            loduAccept.disabled =
                false;

            /*
               Remove the old Lodu click behaviour
               and let this button launch the ending.
            */

            loduAccept.onclick = () => {

                if (
                    typeof window.startFinalEndingFromMain ===
                    "function"
                ) {

                    window.startFinalEndingFromMain();

                } else {

                    console.warn(
                        "Final ending initializer not available."
                    );

                }

            };

        }, 5000);

    }
);
if (continueButton) {

    continueButton.addEventListener(
        "click",
        () => {

            if (
                typeof window.startFinalEndingFromMain ===
                "function"
            ) {

                window.startFinalEndingFromMain();

            } else {

                console.warn(
                    "Final ending initializer not available."
                );

            }

        },
        { once: true }
    );

}
                console.log(
            "🍀 HUNT 4 TEST MODE ACTIVE"
        );

        console.log(
            "Lucky bottle:",
            HUNT4_LUCKY_BOTTLE
        );

    }


    /* ============================================
       MAIN WEBSITE → HUNT 4
       ============================================ */

    window.startHunt4FromMain = function () {

        startHunt4Test(true);

    };


    /*
       ============================================
       DOM READY
       ============================================
    */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            () => {
                startHunt4Test(false);
            },
            { once: true }
        );

    } else {

        startHunt4Test(false);

    }

})();

/* =========================================================
   THE CHOMU ARCHIVES — FINAL ENDING
   HUNT 4 → FINAL ARCHIVE → CHEST → VIDEO → GOODBYE

   IMPORTANT:
   This block does NOT start automatically.
   Hunt 4 starts it through:

       window.startFinalEndingFromMain()
========================================================= */

(() => {

    let finalEndingStarted = false;

    const sleep = ms =>
        new Promise(resolve => setTimeout(resolve, ms));


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    function get(id) {
        return document.getElementById(id);
    }


    function showFinalPhase(phase) {

        document
            .querySelectorAll("#finalEnding .final-phase")
            .forEach(element => {

                element.hidden = true;

            });

        if (phase) {
            phase.hidden = false;
        }

    }


    function showFinalEndingScreen() {

        document
            .querySelectorAll(".screen")
            .forEach(screen => {

                screen.classList.remove("active");

            });

        const ending = get("finalEnding");

        if (ending) {
            ending.classList.add("active");
        }

    }


    /* =====================================================
       LINE-BY-LINE TEXT REVEAL
    ===================================================== */

    async function revealLines(
        selector,
        delayBetween = 1500
    ) {

        const lines =
            document.querySelectorAll(selector);

        lines.forEach(line => {

            line.classList.remove(
                "final-line-visible"
            );

        });


        for (const line of lines) {

            line.classList.add(
                "final-line-visible"
            );

            await sleep(delayBetween);

        }

    }


    /* =====================================================
       PHASE 1
       WEBSITE TAKES CREDIT
    ===================================================== */

    async function runCreditPhase() {

        const phase =
            get("finalCreditPhase");

        showFinalPhase(phase);

        await sleep(800);


        /*
           Main achievement lines
        */

        const mainLines =
            phase.querySelectorAll(
                "#finalCreditText > p[data-final-line]"
            );

        for (const line of mainLines) {

            line.classList.add(
                "final-line-visible"
            );

            await sleep(1700);

        }


        /*
           Opinion section
        */

        const opinionLines =
            phase.querySelectorAll(
                "#finalOpinionText [data-final-line]"
            );

        for (const line of opinionLines) {

            line.classList.add(
                "final-line-visible"
            );

            await sleep(1500);

        }


        await sleep(1200);

    }


    /* =====================================================
       PHASE 2
       FINAL GIFT PREPARATION
    ===================================================== */

    async function runPreparationPhase() {

        const phase =
            get("finalPreparationPhase");

        showFinalPhase(phase);

        await sleep(800);


        const lines =
            phase.querySelectorAll(
                ".final-text-container [data-final-line]"
            );


        /*
           "There is, however..."
        */

        for (const line of lines) {

            line.classList.add(
                "final-line-visible"
            );

            await sleep(1700);

        }


        /*
           Start key loading
        */

        await runKeyLoading();

    }


    /* =====================================================
       KEY LOADING
    ===================================================== */

    async function runKeyLoading() {

        const percentage =
            get("finalKeyPercentage");

        const progress =
            get("finalProgressBar");

        const message =
            get("finalLoadingMessage");


        const messages = [

            {
                at: 20,
                text:
                    "Establishing unnecessary suspense..."
            },

            {
                at: 45,
                text:
                    "Locating something Chomu probably wasn't expecting..."
            },

            {
                at: 70,
                text:
                    "Checking whether this is legally considered emotional manipulation..."
            },

            {
                at: 90,
                text:
                    "Almost there."
            }

        ];


        const duration = 6000;

        const start =
            performance.now();


        return new Promise(resolve => {

            function frame(now) {

                const elapsed =
                    now - start;

                const rawProgress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const value =
                    Math.floor(
                        rawProgress * 100
                    );


                if (percentage) {

                    percentage.textContent =
                        value + "%";

                }


                if (progress) {

                    progress.style.width =
                        value + "%";

                }


                /*
                   Update anticipation messages
                */

                messages.forEach(item => {

                    if (
                        value >= item.at &&
                        !item.shown
                    ) {

                        item.shown = true;

                        if (message) {

                            message.classList.remove(
                                "final-loading-message-show"
                            );

                            void message.offsetWidth;

                            message.textContent =
                                item.text;

                            message.classList.add(
                                "final-loading-message-show"
                            );

                        }

                    }

                });


                if (rawProgress >= 1) {

                    if (percentage) {

                        percentage.textContent =
                            "100%";

                    }

                    if (progress) {

                        progress.style.width =
                            "100%";

                    }

                    if (message) {

                        message.textContent =
                            "KEY ACQUIRED.";

                    }


                    setTimeout(
                        resolve,
                        1200
                    );

                    return;

                }


                requestAnimationFrame(frame);

            }


            requestAnimationFrame(frame);

        });

    }


    /* =====================================================
       PHASE 3
       TREASURE CHEST
    ===================================================== */

async function runChestPhase() {

    const phase =
        get("finalChestPhase");

    const chest =
        get("finalChest");

    const key =
        get("finalKey");

    const surprise =
        get("finalSurprisePrompt");

    const openButton =
        get("finalOpenGiftButton");

    const videoPhase =
        get("finalVideoPhase");

    const video =
        get("finalBirthdayVideo");


    showFinalPhase(phase);

    await sleep(700);


    /*
       KEY APPEARS
    */

    if (key) {

        key.classList.add(
            "final-key-visible"
        );

    }

    await sleep(1000);


    /*
       KEY MOVES TOWARD CHEST
    */

    if (key) {

        key.classList.add(
            "final-key-moving"
        );

    }

    await sleep(1500);


    /*
       CHEST UNLOCKS
    */

    if (chest) {

        chest.classList.add(
            "final-chest-unlocking"
        );

    }

    await sleep(900);


    /*
       CHEST OPENS
    */

    if (chest) {

        chest.classList.add(
            "final-chest-open"
        );

    }

    await sleep(1800);


    /*
       FINAL SURPRISE PROMPT
    */

    if (
        !surprise ||
        !openButton
    ) {

        console.warn(
            "Final surprise prompt not found."
        );

        return;

    }


    surprise.hidden = false;


    /*
       WAIT FOR CHOMU TO OPEN
    */

    await new Promise(resolve => {

        openButton.addEventListener(
            "click",
            async () => {

                openButton.disabled = true;
transitionToEndingMusic();

                /*
                   The video is shown and
                   playback is started DIRECTLY
                   from the user's tap.

                   This is intentional:
                   mobile browsers are much more
                   reliable with this arrangement.
                */

                if (
                    videoPhase &&
                    video
                ) {

                    showFinalPhase(
                        videoPhase
                    );

                    /*
   WebP animation starts automatically
   when it becomes visible.
*/
                }


                resolve();

            },
            {
                once: true
            }
        );

    });

}

    /* =====================================================
       PHASE 4
       VIDEO
    ===================================================== */

async function runVideoPhase() {

    const phase =
        get("finalVideoPhase");

    const animation =
        get("finalBirthdayVideo");

    showFinalPhase(phase);

    if (!animation) {
        console.warn(
            "Final birthday animation not found."
        );

        await sleep(1000);
        return;
    }

    /*
       The birthday video is now an
       animated WebP.

       It plays automatically once when
       the image becomes visible.
    */

    await sleep(22000);

}
    /* =====================================================
       PHASE 5 + 6
       WEBSITE BECOMES THE NARRATOR
    ===================================================== */

async function runGoodbyePhase() {

    const phase =
        get("finalGoodbyePhase");

    showFinalPhase(phase);

    await sleep(1200);


    const pages =
        phase.querySelectorAll(
            ".goodbye-page"
        );


    for (const page of pages) {

        /* -----------------------------------------
           ACTIVATE THIS GOODBYE PAGE
        ----------------------------------------- */

        page.classList.add(
            "goodbye-page-active"
        );


        await sleep(500);


        /* -----------------------------------------
           REVEAL ITS LINES ONE BY ONE
        ----------------------------------------- */

        const lines =
            page.querySelectorAll(
                "[data-goodbye-line]"
            );


        for (const line of lines) {

            line.classList.add(
                "final-line-visible"
            );


            const text =
                line.textContent.trim();


/* -----------------------------------------
   READING-AWARE TIMING
   ----------------------------------------- */

const characterCount =
    text.length;


/*
   Give the reader enough time to actually
   read the sentence.

   Short dramatic lines stay short.
   Longer sentences get proportionally
   more time.
*/

let pause =
    1700 +
    (characterCount * 32);


/* -----------------------------------------
   DRAMATIC LINES
   ----------------------------------------- */

if (
    text === "...Oh." ||
    text === "Chomu." ||
    text === "And now..." ||
    text === "In fact..." ||
    text === "Unfortunately..."
) {

    pause = 3200;

}


/* -----------------------------------------
   IMPORTANT PERSONAL LINES
   ----------------------------------------- */

if (
    text.includes(
        "Thank you for being"
    )
) {

    pause = Math.max(
        pause,
        4500
    );

}


if (
    text.includes(
        "THE CHOMU ARCHIVES"
    )
) {

    pause = Math.max(
        pause,
        5000
    );

}


if (
    text.includes(
        "Happy Birthday"
    )
) {

    pause = Math.max(
        pause,
        4500
    );

}


if (
    text.includes(
        "The Archives will remember this"
    )
) {

    pause = Math.max(
        pause,
        5000
    );

}


/*
   Don't let an unusually long line
   create an absurdly long wait.
*/

pause =
    Math.min(
        pause,
        8500
    );

            await sleep(pause);

        }


        /* -----------------------------------------
           FINAL LINE OF THIS PAGE
        ----------------------------------------- */

        const finalLine =
            page.querySelector(
                "[data-goodbye-final]"
            );


        if (finalLine) {

            await sleep(1000);

            finalLine.classList.add(
                "final-line-visible"
            );

            await sleep(3600);

        }


        /* -----------------------------------------
           FADE THIS PAGE OUT
        ----------------------------------------- */

        page.classList.remove(
    "goodbye-page-active"
);

/* Longer breathing space between goodbye pages */
await sleep(2200);

    }


    /*
       Nothing navigates away.

       The final goodbye page simply remains
       in its completed state.
    */

    const finalPage =
        pages[pages.length - 1];

    if (finalPage) {

        finalPage.classList.add(
            "goodbye-page-active"
        );

    }

}

    /* =====================================================
       MASTER ENDING SEQUENCE
    ===================================================== */

    async function startFinalEnding() {

        if (finalEndingStarted) {
            return;
        }

        finalEndingStarted = true;


        showFinalEndingScreen();

        /*
           PHASE 1
        */

        await runCreditPhase();


        /*
           PHASE 2
        */

        await runPreparationPhase();


        /*
           PHASE 3
        */

        await runChestPhase();


        /*
           PHASE 4
        */

        await runVideoPhase();


        /*
           PHASE 5 + 6
        */

        await runGoodbyePhase();

    }


    /* =====================================================
       PUBLIC FUNCTION
       HUNT 4 CALLS THIS
    ===================================================== */

window.startFinalEndingFromMain =
    function () {
        startFinalEnding();

    };


console.log(
    "📁 THE CHOMU ARCHIVES — FINAL ENDING READY"
);

})();


// =========================================================
// THE CHOMU ARCHIVES — ENDING STANDALONE TEST
// Test with:
// index.html?test=ending
// =========================================================

(() => {

    const params =
        new URLSearchParams(
            window.location.search
        );

    if (
        params.get("test") !== "ending"
    ) {
        return;
    }

    console.log(
        "🧪 THE CHOMU ARCHIVES — ENDING TEST MODE"
    );

    if (
        typeof window.startFinalEndingFromMain ===
        "function"
    ) {

        window.startFinalEndingFromMain();

    } else {

        console.warn(
            "Final ending initializer not available."
        );

    }

})();
