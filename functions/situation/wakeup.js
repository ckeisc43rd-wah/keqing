const { Events,
        ActivityType 
} = require("discord.js");

const core = require("../../modules/core.js");

const { client } = global;

var waking = false;
var check = true;

client.on(Events.InteractionCreate,(itr) => {

    server = core.loadServer(itr.guild.id);

    function func(){
        waking = false;
        client.user.setActivity( "VIOLET", { type: ActivityType.Listening });
        client.user.setPresence({ status: 'idle' });
    }

    function checking(){
        check = true;
    }

    //判斷狀態
    if (waking == false && check == true){
        const author = itr.member.displayName;
        client.user.setActivity( author, { type: ActivityType.Playing });
        client.user.setPresence({ status: 'online' });
        waking = true;
        check = false;
        setTimeout(func,10000);
        setTimeout(checking,10000);
    };


    core.saveServer(itr.guild.id, server);

});