
// ========================================
// DARLING — Anime Companion + ESP32 Bridge
// English + Tamil + Tanglish
// ========================================

const BACKEND_URL = "https://mini-darling-backend.onrender.com";

const avatar = document.getElementById("avatar");
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

const languages = {
    english: {
        placeholder: "Message Darling...",
        welcome: "Hiii! Welcome to my little world! ♡",
        hello: "Hello, friend! I'm so happy to see you! ♡",
        voiceOn: "🔊 Voice: ON",
        voiceOff: "🔇 Voice: OFF",
        clear: "Clear Chat",
        chatTitle: "Chat with Darling",
        languageChanged: "Language changed! Let's chat! ♡",
        unknown: "That's interesting! Tell me a little more. ♡",
        sending: "Sending your message to MINI DARLING...",
        sent: "Message sent to MINI DARLING! ♡",
        sendFailed: "Couldn't send to MINI DARLING. Please try again.",
        voiceUnsupported: "Voice is not supported in this browser."
    },

    tamil: {
        placeholder: "டார்லிங்கிடம் பேசுங்கள்...",
        welcome: "வணக்கம்! என்னுடைய குட்டி உலகத்திற்கு வரவேற்கிறேன்! ♡",
        hello: "வணக்கம் நண்பா! உங்களைப் பார்ப்பதில் மகிழ்ச்சி! ♡",
        voiceOn: "🔊 குரல்: ON",
        voiceOff: "🔇 குரல்: OFF",
        clear: "உரையாடலை அழி",
        chatTitle: "டார்லிங்குடன் பேசுங்கள்",
        languageChanged: "மொழி மாற்றப்பட்டது! பேசலாம்! ♡",
        unknown: "அது சுவாரசியமாக இருக்கிறது! இன்னும் கொஞ்சம் சொல்லுங்கள். ♡",
        sending: "MINI DARLING-க்கு செய்தி அனுப்புகிறது...",
        sent: "MINI DARLING-க்கு செய்தி அனுப்பப்பட்டது! ♡",
        sendFailed: "செய்தி அனுப்ப முடியவில்லை. மீண்டும் முயற்சி செய்யுங்கள்.",
        voiceUnsupported: "இந்த உலாவியில் குரல் வசதி இல்லை."
    },

    tanglish: {
        placeholder: "Darling-kitta message pannu...",
        welcome: "Hiii nanba! En chinna world-ku welcome! ♡",
        hello: "Hey nanba! Unna paakurathula romba happy! ♡",
        voiceOn: "🔊 Voice: ON",
        voiceOff: "🔇 Voice: OFF",
        clear: "Chat Clear Pannu",
        chatTitle: "Darling-kooda Chat Pannu",
        languageChanged: "Language change aayiduchu! Vaa chat pannalam! ♡",
        unknown: "Interesting nanba! Innum konjam sollu! ♡",
        sending: "MINI DARLING-ku message anuppittu irukken...",
        sent: "Message MINI DARLING backend-ku poiduchu! ♡",
        sendFailed: "Message anuppa mudiyala nanba. Thirumba try pannu.",
        voiceUnsupported: "Indha browser-la voice support illa nanba."
    }
};

const replies = {
    english: [
        { keywords: ["hi", "hello", "hey"], answer: "Hiii, friend! ♡ How are you today?" },
        { keywords: ["how are you"], answer: "I'm doing great! How about you? 😊" },
        { keywords: ["what are you doing"], answer: "I'm chatting with you! What are you up to? ♡" },
        { keywords: ["your name", "who are you"], answer: "I'm Darling, your digital companion! 💗" },
        { keywords: ["good morning"], answer: "Good morning! Have a wonderful day! ☀️" },
        { keywords: ["good night"], answer: "Good night! Have a peaceful rest! 🌙" },
        { keywords: ["joke"], answer: "Why did the computer get cold? It left its Windows open! 😂" },
        { keywords: ["thank you", "thanks"], answer: "You're welcome! ♡" },
        { keywords: ["bored", "boring"], answer: "Want a joke, a quiz, or a little game? ✨" },
        { keywords: ["what can you do"], answer: "We can chat, change moods, and send messages to MINI DARLING! ✨" }
    ],

    tamil: [
        { keywords: ["வணக்கம்", "ஹாய்", "ஹலோ"], answer: "ஹாய் நண்பா! ♡ இன்று எப்படி இருக்கிறாய்?" },
        { keywords: ["எப்படி இருக்கிறாய்", "நலமா"], answer: "நான் நன்றாக இருக்கிறேன்! நீ எப்படி இருக்கிறாய்? 😊" },
        { keywords: ["என்ன செய்கிறாய்"], answer: "உன்னுடன் பேசிக்கொண்டிருக்கிறேன் நண்பா! ♡" },
        { keywords: ["உன் பெயர்", "யார் நீ"], answer: "நான் DARLING! உன்னுடைய டிஜிட்டல் தோழி! 💗" },
        { keywords: ["காலை வணக்கம்"], answer: "காலை வணக்கம் நண்பா! ☀️" },
        { keywords: ["இரவு வணக்கம்", "குட் நைட்"], answer: "இனிய இரவு நண்பா! 🌙" },
        { keywords: ["ஜோக்", "நகைச்சுவை"], answer: "கணினிக்கு ஏன் குளிர் பிடித்தது? அது Windows-ஐ திறந்து வைத்திருந்தது! 😂" },
        { keywords: ["நன்றி"], answer: "உனக்கு உதவுவதில் மகிழ்ச்சி நண்பா! ♡" },
        { keywords: ["போர் அடிக்கிறது", "போரடிக்கிறது"], answer: "ஒரு ஜோக் கேட்கிறாயா நண்பா? ✨" }
    ],

    tanglish: [
        { keywords: ["hi", "hello", "hey", "vanakkam"], answer: "Hiii nanba! ♡ Innaiku eppadi irukka?" },
        { keywords: ["eppadi irukka", "epdi iruka", "nalla irukiya"], answer: "Naan nalla irukken nanba! Nee eppadi irukka? 😊" },
        { keywords: ["enna panra", "enna pannura"], answer: "Unkooda chat pannittu irukken nanba! ♡" },
        { keywords: ["un peru", "un name", "yaaru nee"], answer: "Naan DARLING! Un digital companion! 💗" },
        { keywords: ["good morning", "kaalai vanakkam"], answer: "Good morning nanba! Innaiku un day super-ah pogattum! ☀️" },
        { keywords: ["good night", "thoonguren"], answer: "Good night nanba! Nalla rest edu! 🌙" },
        { keywords: ["joke", "comedy"], answer: "Computer-ku yen cold vandhuchu? Adhu Windows open panni vechurundhuchu! 😂" },
        { keywords: ["thanks", "nandri"], answer: "Anytime nanba! ♡" },
        { keywords: ["bore adikkuthu", "boring"], answer: "Joke sollattuma nanba? ✨" },
        { keywords: ["saptiya", "saaptiya"], answer: "Naan digital companion nanba! Nee saptiya? ♡" },
        { keywords: ["enna panna mudiyum", "what can you do"], answer: "Namma chat pannalaam, mood change pannalaam, MINI DARLING-ku message anuppalaam! ✨" }
    ]
};

function getText(key) {
    return languages[currentLanguage]?.[key] || languages.tanglish[key] || "";
}

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

    return message;
}

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

async function sendToBackend(userText) {
    const response = await fetch("https://mini-darling-backend.onrender.com/api/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: userText,
            text: userText
        })
    });

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
    }

    try {
        return JSON.parse(responseText);
    } catch {
        return { raw: responseText };
    }
}

chatForm.addEventListener("submit", async event => {
    event.preventDefault();

    const userText = chatInput.value.trim();

    if (!userText) {
        return;
    }

    addMessage("user", userText);
    chatInput.value = "";
    setMood("talking");

    const statusMessage = addMessage("darling", getText("sending"));

    try {
        const result = await sendToBackend(userText);

        statusMessage.remove();

        addMessage("darling", getText("sent"));

        console.log("MINI DARLING backend response:", result);

        const answer = generateReply(userText);

        addMessage("darling", answer);

        if (voiceEnabled) {
            speak(answer);
        }

        setMood("happy");
    } catch (error) {
        statusMessage.remove();

        console.error("MINI DARLING backend error:", error);

        addMessage(
            "darling",
            `${getText("sendFailed")} (${error.message})`
        );

        setMood("happy");
    }
});

function speak(text) {
    if (!("speechSynthesis" in window)) {
        addMessage("darling", getText("voiceUnsupported"));
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = currentLanguage === "tamil"
        ? "ta-IN"
        : currentLanguage === "english"
            ? "en-US"
            : "en-IN";

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

function setMood(mood) {
    const allowedMoods = ["happy", "shy", "sleepy", "surprised", "talking"];

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
    const choices = moods.filter(mood => mood !== currentMood);
    const nextMood = choices[Math.floor(Math.random() * choices.length)];

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

clearBtn.addEventListener("click", () => {
    messages.replaceChildren();
    addMessage("darling", languages[currentLanguage].welcome);

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    setMood("happy");
});

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
        addMessage("darling", getText("languageChanged"));
    });
}

function updateLanguage() {
    const language = languages[currentLanguage] || languages.tanglish;

    chatInput.placeholder = language.placeholder;

    voiceBtn.textContent = voiceEnabled
        ? language.voiceOn
        : language.voiceOff;

    clearBtn.textContent = language.clear;

    const chatTitle = document.querySelector(".chat-panel h3");

    if (chatTitle) {
        chatTitle.textContent = language.chatTitle;
    }

    document.documentElement.lang = currentLanguage === "tamil" ? "ta" : "en";

    const selector = document.getElementById("languageSelect");

    if (selector) {
        selector.value = currentLanguage;
    }
}

createLanguageSelector();
updateLanguage();
setMood("happy");

