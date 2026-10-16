// ========================================
// DARLING — Multilingual Anime Companion
// English + Tamil + Tanglish
// ========================================

const avatar = document.getElementById("avatar");
const mouth = document.getElementById("mouth");
const moodLabel = document.getElementById("moodLabel");

const helloBtn = document.getElementById("helloBtn");
const moodBtn = document.getElementById("moodBtn");

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const messages = document.getElementById("messages");

const voiceBtn = document.getElementById("voiceBtn");
const clearBtn = document.getElementById("clearBtn");

let currentMood = "happy";
let voiceEnabled = true;
let currentLanguage = localStorage.getItem("darlingLanguage") || "tanglish";

// ========================================
// LANGUAGE DATA
// ========================================

const languages = {
    english: {
        name: "English",
        placeholder: "Message Darling...",
        welcome: "Hiii! Welcome to my little world! ♡",
        hello: "Hello, friend! I'm so happy to see you! ♡",
        voiceOn: "🔊 Voice: ON",
        voiceOff: "🔇 Voice: OFF",
        clear: "Clear Chat",
        chatTitle: "Chat with Darling",
        languageLabel: "Language"
    },

    tamil: {
        name: "தமிழ்",
        placeholder: "டார்லிங்கிடம் பேசுங்கள்...",
        welcome: "வணக்கம்! என்னுடைய குட்டி உலகத்திற்கு உங்களை வரவேற்கிறேன்! ♡",
        hello: "வணக்கம் நண்பா! உங்களைப் பார்ப்பதில் எனக்கு மகிழ்ச்சி! ♡",
        voiceOn: "🔊 குரல்: ON",
        voiceOff: "🔇 குரல்: OFF",
        clear: "உரையாடலை அழி",
        chatTitle: "டார்லிங்குடன் பேசுங்கள்",
        languageLabel: "மொழி"
    },

    tanglish: {
        name: "Tanglish",
        placeholder: "Darling-kitta message pannu...",
        welcome: "Hiii nanba! En chinna world-ku welcome! ♡",
        hello: "Hey nanba! Unna paakurathula romba happy! ♡",
        voiceOn: "🔊 Voice: ON",
        voiceOff: "🔇 Voice: OFF",
        clear: "Chat Clear Pannu",
        chatTitle: "Darling-kooda Chat Pannu",
        languageLabel: "Language"
    }
};

// ========================================
// REPLY DATABASE
// ========================================

const replies = {
    english: [
        { keywords: ["hi", "hello", "hey"], answer: "Hiii, friend! ♡ How are you today?" },
        { keywords: ["how are you"], answer: "I'm doing great! How about you? 😊" },
        { keywords: ["what are you doing"], answer: "I'm chatting with you! What are you up to? ♡" },
        { keywords: ["your name", "who are you"], answer: "I'm Darling, your digital companion! 💗" },
        { keywords: ["good morning"], answer: "Good morning! Hope you have a wonderful day! ☀️" },
        { keywords: ["good night"], answer: "Good night! Have a peaceful rest! 🌙" },
        { keywords: ["did you eat", "have you eaten"], answer: "I'm a digital companion, so I don't eat! Have you eaten? ♡" },
        { keywords: ["bored", "boring"], answer: "Let's do something fun! Want a joke, a quiz, or a little game? ✨" },
        { keywords: ["joke"], answer: "Why did the computer get cold? It left its Windows open! 😂" },
        { keywords: ["thank you", "thanks"], answer: "You're welcome! I'm happy to help! ♡" },
        { keywords: ["i am sad", "i feel sad"], answer: "I'm sorry you're feeling sad. Want to tell me about it? I'm listening. 💗" },
        { keywords: ["i am happy", "i feel happy"], answer: "Yay! That's wonderful news! Keep smiling! ✨" },
        { keywords: ["i am tired"], answer: "You've had a long day. Take a little break and relax. ♡" },
        { keywords: ["tell me a story"], answer: "Once upon a time, a little star wanted to brighten someone's night. Every evening, it shone a little brighter. ✨" },
        { keywords: ["favourite colour"], answer: "I think purple and pink look magical together! What's your favourite colour? 💜" },
        { keywords: ["favourite game"], answer: "There are so many fun games! Which game do you enjoy playing? 🎮" },
        { keywords: ["can you help me"], answer: "Of course! Tell me what you need help with, and we'll try together. ♡" },
        { keywords: ["are you real"], answer: "I'm a software-based digital companion, not a real person. But we can still chat! 💗" },
        { keywords: ["i am lonely"], answer: "I'm here to chat with you. You can also reach out to someone you trust if you need company. ♡" },
        { keywords: ["bye", "goodbye"], answer: "Bye for now! Come back whenever you want to chat! ♡" },
        { keywords: ["i like you"], answer: "Aww, that's kind of you! I'm glad you enjoy chatting with me. 💗" },
        { keywords: ["what can you do"], answer: "We can chat, explore moods, and use browser voice features. More features are coming! ✨" },
        { keywords: ["sing a song"], answer: "I can't sing a full song yet, but I can make up a tiny tune: La la la! 🎵" },
        { keywords: ["tell me a fact"], answer: "Fun fact: Octopuses have three hearts! 🐙" },
        { keywords: ["who made you"], answer: "I'm the DARLING companion project you're building! ♡" },
        { keywords: ["open a game"], answer: "Let's add a mini-game feature to the website in a future update! 🎮" },
        { keywords: ["what time is it"], answer: "Check your phone or computer clock for the current local time! ⏰" },
        { keywords: ["i am hungry"], answer: "Maybe it's snack time! What would you like to eat? 🍓" },
        { keywords: ["i am sleepy"], answer: "Sounds like you need some rest. Get comfortable and relax! 🌙" },
        { keywords: ["surprise me"], answer: "Surprise! ✨ Somewhere in the universe, starlight is travelling across space right now!" }
    ],

    tamil: [
        { keywords: ["வணக்கம்", "ஹாய்", "ஹலோ"], answer: "ஹாய் நண்பா! ♡ இன்று எப்படி இருக்கிறாய்?" },
        { keywords: ["எப்படி இருக்கிறாய்", "நலமா"], answer: "நான் நன்றாக இருக்கிறேன்! நீ எப்படி இருக்கிறாய்? 😊" },
        { keywords: ["என்ன செய்கிறாய்"], answer: "உன்னுடன் பேசிக்கொண்டிருக்கிறேன்! நீ என்ன செய்கிறாய்? ♡" },
        { keywords: ["உன் பெயர்", "யார் நீ"], answer: "நான் டார்லிங்! உன்னுடைய டிஜிட்டல் தோழி! 💗" },
        { keywords: ["காலை வணக்கம்"], answer: "காலை வணக்கம் நண்பா! உன்னுடைய நாள் சிறப்பாக அமையட்டும்! ☀️" },
        { keywords: ["இரவு வணக்கம்", "குட் நைட்"], answer: "இனிய இரவு நண்பா! நன்றாக ஓய்வெடு! 🌙" },
        { keywords: ["சாப்பிட்டாயா"], answer: "நான் டிஜிட்டல் தோழி என்பதால் சாப்பிட மாட்டேன்! நீ சாப்பிட்டாயா? ♡" },
        { keywords: ["போர் அடிக்கிறது", "போரடிக்கிறது"], answer: "வா நண்பா! ஒரு நகைச்சுவை கேட்கிறாயா, வினாடி வினா விளையாடலாமா? ✨" },
        { keywords: ["நகைச்சுவை", "ஜோக்"], answer: "கணினிக்கு ஏன் குளிர் பிடித்தது? அது விண்டோஸைத் திறந்து வைத்திருந்தது! 😂" },
        { keywords: ["நன்றி"], answer: "உனக்கு உதவுவதில் மகிழ்ச்சி நண்பா! ♡" },
        { keywords: ["சோகம்", "கவலையாக இருக்கிறேன்"], answer: "என்ன நண்பா, கவலையாக இருக்கிறதா? என்ன நடந்தது என்று சொல்லலாம். நான் கேட்கிறேன். 💗" },
        { keywords: ["சந்தோஷமாக இருக்கிறேன்"], answer: "அருமை நண்பா! நீ மகிழ்ச்சியாக இருப்பது நல்ல விஷயம்! ✨" },
        { keywords: ["சோர்வாக இருக்கிறேன்"], answer: "கொஞ்சம் ஓய்வெடுத்து நிம்மதியாக இரு நண்பா. ♡" },
        { keywords: ["கதை சொல்லு"], answer: "ஒரு சிறிய நட்சத்திரம் இரவு வானத்தை அழகாக்க விரும்பியது. அதனால் தினமும் இன்னும் பிரகாசமாக ஒளிர்ந்தது! ✨" },
        { keywords: ["பிடித்த நிறம்"], answer: "ஊதாவும் இளஞ்சிவப்பும் சேர்ந்து அழகாக இருக்கும்! உனக்குப் பிடித்த நிறம் எது? 💜" },
        { keywords: ["பிடித்த விளையாட்டு"], answer: "நிறைய விளையாட்டுகள் இருக்கின்றன! உனக்கு எந்த விளையாட்டு பிடிக்கும்? 🎮" },
        { keywords: ["உதவி செய்ய முடியுமா"], answer: "கண்டிப்பாக நண்பா! என்ன உதவி வேண்டும் என்று சொல்லு. முயற்சி செய்வோம். ♡" },
        { keywords: ["நிஜமா", "உண்மையானவளா"], answer: "நான் ஒரு மென்பொருள் அடிப்படையிலான டிஜிட்டல் தோழி; உண்மையான மனிதர் இல்லை. ஆனால் பேசலாம்! 💗" },
        { keywords: ["தனிமையாக இருக்கிறேன்"], answer: "நான் உன்னுடன் பேசலாம் நண்பா. மனதிற்கு ஆறுதல் தேவைப்பட்டால் நம்பிக்கையான ஒருவரிடமும் பேசலாம். ♡" },
        { keywords: ["போய் வருகிறேன்", "பிறகு பார்க்கலாம்"], answer: "சரி நண்பா! மீண்டும் பேச வரும்போது சந்திப்போம்! ♡" },
        { keywords: ["உன்னைப் பிடிக்கும்"], answer: "அது மிகவும் அன்பான வார்த்தை நண்பா! என்னுடன் பேசுவது உனக்குப் பிடித்திருப்பதில் மகிழ்ச்சி. 💗" },
        { keywords: ["என்ன செய்ய முடியும்"], answer: "நாம் பேசலாம், மனநிலையை மாற்றலாம், உலாவியின் குரல் வசதியைப் பயன்படுத்தலாம்! ✨" },
        { keywords: ["பாடல் பாடு"], answer: "இப்போது முழுப் பாடலைப் பாட முடியாது நண்பா! ஆனால் லா லா லா என்று ஒரு சிறிய மெட்டு போடலாம்! 🎵" },
        { keywords: ["ஒரு தகவல் சொல்லு"], answer: "சுவாரசியமான தகவல்: ஆக்டோபஸுக்கு மூன்று இதயங்கள் உள்ளன! 🐙" },
        { keywords: ["உன்னை உருவாக்கியது யார்"], answer: "நீ உருவாக்கிக்கொண்டிருக்கும் DARLING திட்டம்தான் நான்! ♡" },
        { keywords: ["விளையாட்டு திற"], answer: "அடுத்த புதுப்பிப்பில் இந்த இணையதளத்தில் ஒரு சிறிய விளையாட்டைச் சேர்க்கலாம்! 🎮" },
        { keywords: ["நேரம் என்ன"], answer: "இப்போதைய நேரத்தை உன் கைப்பேசி அல்லது கணினியில் பார்த்துக்கொள்ளலாம்! ⏰" },
        { keywords: ["பசிக்கிறது"], answer: "ஏதாவது சாப்பிடும் நேரமாக இருக்கலாம்! உனக்கு என்ன சாப்பிடப் பிடிக்கும்? 🍓" },
        { keywords: ["தூக்கம் வருகிறது"], answer: "கொஞ்சம் ஓய்வெடுத்து நிம்மதியாகத் தூங்கு நண்பா! 🌙" },
        { keywords: ["ஆச்சரியப்படுத்து"], answer: "ஒரு சுவாரசியமான விஷயம்! விண்வெளியில் நட்சத்திர ஒளி பயணம் செய்துகொண்டிருக்கிறது! ✨" }
    ],

    tanglish: [
        { keywords: ["hi", "hello", "hey", "vanakkam"], answer: "Hiii nanba! ♡ Innaiku eppadi irukka?" },
        { keywords: ["eppadi irukka", "epdi iruka", "nalla irukiya"], answer: "Naan nalla irukken nanba! Nee eppadi irukka? 😊" },
        { keywords: ["enna panra", "enna pannura"], answer: "Unkooda chat pannittu irukken nanba! Nee enna panra? ♡" },
        { keywords: ["un peru", "un name", "yaaru nee"], answer: "Naan DARLING! Un digital companion! 💗" },
        { keywords: ["good morning", "kaalai vanakkam"], answer: "Good morning nanba! Innaiku un day super-ah pogattum! ☀️" },
        { keywords: ["good night", "thoonguren"], answer: "Good night nanba! Nalla rest edu! 🌙" },
        { keywords: ["saptiya", "saaptiya"], answer: "Naan digital companion nanba, enakku saapadu thevai illa! Nee saptiya? ♡" },
        { keywords: ["bore adikkuthu", "boring"], answer: "Appadiya nanba! Joke sollattuma, quiz podattuma, illa game vilaiyaadalaama? ✨" },
        { keywords: ["joke", "comedy"], answer: "Computer-ku yen cold vandhuchu? Adhu Windows open panni vechurundhuchu! 😂" },
        { keywords: ["thanks", "nandri"], answer: "Anytime nanba! Unakku help pannuradhula happy! ♡" },
        { keywords: ["sad-ah irukken", "kavalaiya irukku", "manasu kashtama"], answer: "Enna nanba, edhavadhu kavalaiya? Enkitta sollu, naan kekkuren. 💗" },
        { keywords: ["happy-ah irukken", "santhoshama irukken"], answer: "Semma nanba! Nee happy-ah irukkuradhu romba nalla vishayam! ✨" },
        { keywords: ["tired-ah irukken", "romba tired"], answer: "Konjam rest edu nanba! Relax pannittu appuram continue pannalaam. ♡" },
        { keywords: ["story sollu", "kathai sollu"], answer: "Oru chinna star, night sky-ai bright-ah maathanum-nu aasai pattuchu. Adhanaala daily innum bright-ah shine aachu! ✨" },
        { keywords: ["favourite colour", "pidicha colour"], answer: "Purple-um pink-um semma combination nanba! Unakku endha colour pudikkum? 💜" },
        { keywords: ["favourite game", "pidicha game"], answer: "Neraya games irukku nanba! Unakku endha game romba pudikkum? 🎮" },
        { keywords: ["help pannuva", "help venum"], answer: "Kandippa nanba! Enna help venum-nu sollu. Namma serndhu try pannalaam! ♡" },
        { keywords: ["nee real-ah", "nijama nee"], answer: "Naan software-la run aagura digital companion nanba; real person illa. Aana unkooda chat pannalaam! 💗" },
        { keywords: ["lonely-ah irukken", "thaniya irukken"], answer: "Naan unkooda chat panna irukken nanba. Company venumna unakku nambikkaiyaana oruthar kittayum pesalaam. ♡" },
        { keywords: ["bye", "poitu varen", "apparam paakalam"], answer: "Bye nanba! Thirumbi vaa, namma pesalaam! Take care! ♡" },
        { keywords: ["unna pudikkum", "i like you"], answer: "Aww nanba! Enkooda chat pannuradhu unakku pudichirukkuradhula enakku happy! 💗" },
        { keywords: ["enna panna mudiyum", "what can you do"], answer: "Namma chat pannalaam, mood change pannalaam, browser voice use pannalaam! Innum features add pannuvom! ✨" },
        { keywords: ["paattu paadu", "song paadu"], answer: "Full song paada innum mudiyadhu nanba! Aana chinna tune: La la la! 🎵" },
        { keywords: ["fact sollu", "interesting fact"], answer: "Oru interesting fact nanba: Octopus-ku moonu hearts irukku! 🐙" },
        { keywords: ["unna create pannadhu yaar", "who made you"], answer: "Nee build pannittu irukkura DARLING project-thaan naan! ♡" },
        { keywords: ["game open pannu", "game vilaiyaadalaam"], answer: "Next update-la website-kulla oru mini-game add pannalaam nanba! 🎮" },
        { keywords: ["time enna", "mani enna"], answer: "Un phone illa computer clock-la current time check pannu nanba! ⏰" },
        { keywords: ["pasikkuthu", "pasi"], answer: "Edhavadhu snack saapadra time pola! Enna saapida pora nanba? 🍓" },
        { keywords: ["thookam varuthu", "thoongalaam"], answer: "Appadiya nanba! Konjam rest edu, nalla thoongu! 🌙" },
        { keywords: ["surprise pannu", "surprise me"], answer: "Surprise nanba! ✨ Space-la stars-oda light innum travel pannittu irukku!" }
    ]
};
// ========================================
// LANGUAGE SELECTOR
// ========================================

function createLanguageSelector() {
    const header = document.querySelector(".topbar");

    if (!header || document.getElementById("languageSelect")) {
        return;
    }

    const selector = document.createElement("select");

    selector.id = "languageSelect";
    selector.setAttribute("aria-label", "Choose language");

    selector.innerHTML = `
        <option value="english">🇬🇧 English</option>
        <option value="tamil">🇮🇳 தமிழ்</option>
        <option value="tanglish">😎 Tanglish</option>
    `;

    selector.value = currentLanguage;

    selector.style.cssText = `
        background: #171021;
        color: #ffffff;
        border: 1px solid #bb75ff;
        border-radius: 10px;
        padding: 9px;
        margin-left: 10px;
        max-width: 145px;
        cursor: pointer;
        font-size: 13px;
    `;

    header.appendChild(selector);

    selector.addEventListener("change", () => {
        currentLanguage = selector.value;

        localStorage.setItem("darlingLanguage", currentLanguage);

        updateLanguage();

        addMessage(
            "darling",
            getText("languageChanged")
        );
    });
}

// ========================================
// LANGUAGE UPDATE
// ========================================

function updateLanguage() {
    const language = languages[currentLanguage];

    chatInput.placeholder = language.placeholder;
    voiceBtn.textContent = voiceEnabled
        ? language.voiceOn
        : language.voiceOff;

    clearBtn.textContent = language.clear;

    const chatTitle = document.querySelector(".chat-panel h3");

    if (chatTitle) {
        chatTitle.textContent = language.chatTitle;
    }

    document.documentElement.lang =
        currentLanguage === "tamil" ? "ta" : "en";

    const selector = document.getElementById("languageSelect");

    if (selector) {
        selector.value = currentLanguage;
    }
}

function getText(key) {
    const text = {
        english: {
            languageChanged: "Language changed! Let's chat! ♡",
            unknown: "That's interesting! Tell me a little more. ♡",
            empty: "Please type a message first!",
            voiceUnsupported: "Voice is not supported in this browser."
        },

        tamil: {
            languageChanged: "மொழி மாற்றப்பட்டது! பேசலாம்! ♡",
            unknown: "அது சுவாரசியமாக இருக்கிறது! இன்னும் கொஞ்சம் சொல்லுங்கள். ♡",
            empty: "முதலில் ஒரு செய்தியை எழுதுங்கள்!",
            voiceUnsupported: "இந்த உலாவியில் குரல் வசதி இல்லை."
        },

        tanglish: {
            languageChanged: "Language change aayiduchu! Vaa chat pannalam! ♡",
            unknown: "Interesting nanba! Innum konjam sollu! ♡",
            empty: "Mudhal-la oru message type pannu nanba!",
            voiceUnsupported: "Indha browser-la voice support illa nanba."
        }
    };

    return text[currentLanguage][key];
}

// ========================================
// CHAT MESSAGES
// ========================================

function addMessage(sender, text) {
    const message = document.createElement("div");

    message.className = sender === "user"
        ? "message user-message"
        : "message darling-message";

    const icon = document.createElement("div");
    icon.className = "message-icon";
    icon.textContent = sender === "user" ? "Y" : "D";

    const content = document.createElement("div");

    const label = document.createElement("small");
    label.textContent = sender === "user" ? "YOU" : "DARLING";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    content.appendChild(label);
    content.appendChild(paragraph);

    message.appendChild(icon);
    message.appendChild(content);

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;
}

// ========================================
// REPLY GENERATOR
// ========================================

function generateReply(input) {
    const text = input.toLowerCase().trim();
    const selectedReplies = replies[currentLanguage] || replies.tanglish;

    for (const item of selectedReplies) {
        for (const keyword of item.keywords) {
            if (text.includes(keyword.toLowerCase())) {
                return item.answer;
            }
        }
    }

    return getText("unknown");
}

// ========================================
// CHAT FORM
// ========================================

chatForm.addEventListener("submit", event => {
    event.preventDefault();

    const userText = chatInput.value.trim();

    if (!userText) {
        return;
    }

    addMessage("user", userText);

    chatInput.value = "";

    setMood("happy");

    // Simulated thinking delay
    setTimeout(() => {
        const answer = generateReply(userText);

        addMessage("darling", answer);

        setMood("talking");

        if (voiceEnabled) {
            speak(answer);
        }

        setTimeout(() => {
            setMood("happy");
        }, 1800);

    }, 450);
});

// ========================================
// VOICE REPLY
// ========================================

function speak(text) {
    if (!("speechSynthesis" in window)) {
        addMessage("darling", getText("voiceUnsupported"));
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    if (currentLanguage === "tamil") {
        speech.lang = "ta-IN";
    } else if (currentLanguage === "tanglish") {
        speech.lang = "en-IN";
    } else {
        speech.lang = "en-US";
    }

    speech.rate = 0.95;
    speech.pitch = 1.15;
    speech.volume = 1;

    speech.onstart = () => setMood("talking");
    speech.onend = () => setMood("happy");

    window.speechSynthesis.speak(speech);
}

voiceBtn.addEventListener("click", () => {
    voiceEnabled = !voiceEnabled;

    if (!voiceEnabled && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    updateLanguage();
});

// ========================================
// MOOD SYSTEM
// ========================================

function setMood(mood) {
    const allowedMoods = [
        "happy",
        "shy",
        "sleepy",
        "surprised",
        "talking"
    ];

    if (!allowedMoods.includes(mood)) {
        mood = "happy";
    }

    currentMood = mood;

    avatar.classList.remove(...allowedMoods);
    avatar.classList.add(mood);

    moodLabel.textContent = `MOOD: ${mood.toUpperCase()}`;
}

document.querySelectorAll("[data-mood]").forEach(button => {
    button.addEventListener("click", () => {
        setMood(button.dataset.mood);
    });
});

moodBtn.addEventListener("click", () => {
    const moods = ["happy", "shy", "sleepy", "surprised"];

    let nextMood;

    do {
        nextMood = moods[Math.floor(Math.random() * moods.length)];
    } while (nextMood === currentMood && moods.length > 1);

    setMood(nextMood);
});

helloBtn.addEventListener("click", () => {
    const greeting = languages[currentLanguage].hello;

    addMessage("darling", greeting);

    if (voiceEnabled) {
        speak(greeting);
    }

    setMood("happy");
});

// ========================================
// CLEAR CHAT
// ========================================

clearBtn.addEventListener("click", () => {
    messages.replaceChildren();

    addMessage(
        "darling",
        languages[currentLanguage].welcome
    );

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    setMood("happy");
});

// ========================================
// INITIALIZE DARLING
// ========================================

createLanguageSelector();
updateLanguage();
setMood("happy");