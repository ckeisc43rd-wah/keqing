const { 
    Client,
    GatewayIntentBits,
    Partials,
    Events,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
 } = require("discord.js");

const core = require("../../modules/core.js");

const { client } = global;

client.on(Events.InteractionCreate, (itr) => {

    server = core.loadServer(itr.guild.id);

    

    if (itr.isCommand()){
        switch (itr.commandName) {
            case "ping":
                itr.reply("pong!");
                break;
            case "addopt":
                var input = itr.options.get("option").value;
                var opt = input.split(',');
                for(var i=0; i<opt.length; i++){
                    var a = opt[i];
                    console.log(a);
                    server.arr.push(a);
                    var text = server.arr.join("\n")
                }
                embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle("是清單內容耶")
                    .setDescription(text),
                row = new ActionRowBuilder()
                    .addComponents([
                        new ButtonBuilder()
                            .setCustomId("nggyu")
                            .setStyle("Primary")
                            .setLabel("Random")
                    ]) 
                core.saveServer(itr.guild.id, server);
                itr.reply({
                    embeds: [ embed ],
                    components: [ row ]
                });
                break;
            case "clear":
                server.arr = [];
                core.saveServer(itr.guild.id, server);
                itr.reply("已清空清單")
                break;
            case "showlist":
                if (server.arr.length == 0)
                    itr.reply("清單裡沒有東西嘛")
                else{
                    var text = server.arr.join("\n"),
                    embed = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle("是清單內容耶")
                        .setDescription(text)
                    row = new ActionRowBuilder()
                        .addComponents([
                            new ButtonBuilder()
                                .setCustomId("nggyu")
                                .setStyle("Primary")
                                .setLabel("Random")
                            ]) 
                    itr.reply({
                        embeds: [ embed ],
                        components: [ row ]
                    });
                }
                break;                    
        }
    }
        

    if (itr.isButton()){
    
        server = core.loadServer(itr.guild.id);
    
        switch (itr.customId) {
                case "nggyu":
                    if (server.arr.length == 0)
                    itr.reply("清單裡沒有東西嘛")
                    else
                    itr.reply(server.arr[parseInt(Math.random() * server.arr.length)]);
                    break;
            }
        }
    }
);