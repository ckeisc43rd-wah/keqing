const { Events } = require("discord.js");

const core = require("../../modules/core.js");

const { client } = global;

const imageMap = new Map();

client.on(Events.InteractionCreate, async(itr) => {

    server = core.loadServer(itr.guild.id);

    if (itr.isCommand()){
        switch (itr.commandName) {
            case "addpic":
                const code = itr.options.getString('代號');
                const url = itr.options.getString('圖片連結');


                imageMap.set(code, url);
                await itr.reply(`已儲存**${code}**\n${url}`);
                    break;
        }
        switch (itr.commandName) {
            case "sendpic":


        }
    }

})

client.on(Events.MessageCreate, async(msg) => {

    server = core.loadServer(msg.guild.id);

    const args = message.content.split(' ');
    const prefix = args[0];

    if (prefix == '-'){
        switch (args[1]) {
            case "addpic":
                const code = args[2];
                const url = msg.attachment.url;


                imageMap.set(code, url);
                await msg.reply(`已儲存**${code}**\n${url}`);
                    break;
        }
    }

})

