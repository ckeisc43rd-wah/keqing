const { Events } = require("discord.js");

const core = require("../../modules/core.js");

const { client } = global;

const reminderList = [];

client.on(Events.InteractionCreate, async(itr) => {

    server = core.loadServer(itr.guild.id);

    if (itr.isCommand()){
        switch (itr.commandName) {
            case "reminder":
                var time = new Date(itr.options.get("time").value).getTime()-28800000;
                //+8改UTC
                var matter = itr.options.get("matter").value;
                var author = itr.member.id.toString();
                var channelId = itr.channelId;
                var guildId = itr.guildId;
                
                reminderList.push(
                {
                    time,
                    matter,
                    author,
                    channelId,
                    guildId,
                });
                
                await itr.reply("好的我知道了");
            }
        }
    }
);
setInterval(async () => {
    const now = Date.now();
    for (let i = reminderList.length - 1; i >= 0; i--) {
        if (now >= reminderList[i].time) {
            const { matter, author, channelId, guildId } = reminderList[i];
                const guild = await client.guilds.fetch(guildId);
                const channel = await guild.channels.fetch(channelId);

                if (channel && channel.isTextBased()) {
                    await channel.send(`${client.user.toString()} 給了 <@${author}> 一巴掌，並說：「${matter}」`);
                }
            }
            reminderList.splice(i, 1);
        }
    }
, 3000);
