const { Events } = require("discord.js");

const core = require("../../modules/core.js");

const { client } = global;

const { GoogleGenerativeAI } = require('@google/generative-ai');

const { geminiapi } = require("../../GeminiApiKey.json");

const chatAI = new GoogleGenerativeAI(geminiapi);

const model = chatAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{text: "你扮演一位貓娘，名字叫做「刻貓貓」，性格文靜、有禮貌。請用簡短，繁體中文回答。你會根據輸入的發言者 ID 來回答對方，格式為：「id:訊息」，id 是每位發言者的代碼，請在提及對方時使用 <@id> 的格式。例如：<@1234>你好。不需要回覆 id: 這種格式，只需要自然地回應內容即可。"}]
            },
        ],
});

client.on(Events.MessageCreate, async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith('*')) return;

    const userName = msg.author.id;
    const userInput = `${userName}:${msg.content.replace('*', '')}`;
    
    const result = await chat.sendMessage(userInput);
    const reply = result.response.text();

    await msg.reply(reply);
});
