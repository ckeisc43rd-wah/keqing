const { Events } = require("discord.js");

const core = require("../../modules/core.js");

const fs = require("fs");

const { client } = global;

client.on(Events.InteractionCreate, (itr) => {

    server = core.loadServer(itr.guild.id);

    

    if (itr.isCommand()){
        switch (itr.commandName) {
            case "stick":
                var daily = fs.readFileSync('stick.txt').toString();
                var boki = daily.split("/");
                itr.reply(boki[parseInt(Math.random() * boki.length)]);
                    
            }
        }
    }
);