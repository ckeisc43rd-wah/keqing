const { Events } = require("discord.js");

const core = require("../../modules/core.js");

const { client } = global;

var prefix = "-";

client.on(Events.VoiceStateUpdate, (oldState, newState) => {

    server = core.loadServer(newState.guild.id);

    if (!server.voicedetect) return;

    if (!newState.channel) 
        oldState.channel.send(`${oldState.member.displayName} 離開了 <#${oldState.channel.id}>`);
    else if (!oldState.channel) 
        newState.channel.send(`${newState.member.displayName} 加入了 <#${newState.channel.id}> !`);
    else if (newState.channel.id == oldState.channel.id) 
        return;
    else
        newState.channel.send(`${newState.member.displayName} 從 <#${oldState.channel.id}> 飛到了 <#${newState.channel.id}>!`);
});

client.on(Events.MessageCreate, (msg) => {
    if (msg.author.id == client.user.id) return;


    server = core.loadServer(msg.guild.id);

    if (msg.content.startsWith(prefix)){
        
        var args = msg.content.slice(prefix.length).split(" ");
        switch(args[0]){
            case "voicedetect":
                if(server.voicedetect == false)
                server.voicedetect = true;
                else
                server.voicedetect = false;
        }

        core.saveServer(msg.guild.id, server);

    }
});