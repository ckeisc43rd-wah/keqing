const {
    Client,
    GatewayIntentBits,
    Partials,
    Events,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActivityType
} = require("discord.js");


const fs = require("fs");
const core = require("./modules/core.js");

const { token } = require("./token.json");
const { channel } = require("diagnostics_channel");

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ] 
});

client.login(token);

global.client = client;

client.on(Events.ClientReady, (client) => {
    console.log(`${client.user.tag} is ready.`);
    client.user.setActivity( "VIOLET", { type: ActivityType.Listening });
    client.user.setPresence({ status: 'idle' });
});

client.on(Events.MessageCreate, async(msg) =>{
    if (msg.author.id == client.user.id) return;

    //const channel = await (msg.guild.channels.cache.get(msg.channelId)).send("Hi");
    //console.log(channel)
});

require("./functions/diamond_sword/voicedt.js");

require("./functions/situation/wakeup.js");

require("./functions/list/list.js");

require("./functions/fortune/drawstick.js");

require("./functions/schedule_remind/reminder.js");

require("./functions/picsender/picsend.js");

require("./functions/chatAI/chatAI.js");