const { Events } = require("discord.js");

const core = require("../../modules/core.js");

const { client } = global;

var timelist = []
var matterlist = [];
var authorlist = [];
var channellist = [];

/* 

integratedList = new Array();

*/


client.on(Events.InteractionCreate, async(itr) => {

    server = core.loadServer(itr.guild.id);

    

    if (itr.isCommand()){
        switch (itr.commandName) {
            case "reminder":
                var time = new Date(itr.options.get("time").value).getTime();
                time+=28800000;
                var matter = itr.options.get("matter").value;
                var author = itr.member.id.toString();
                var channel = itr.channelId;
                
                timelist.push(time);
                matterlist.push(matter);
                authorlist.push(author);
                channellist.push(channel);
                
                itr.reply("好的我知道了");

                /*
                
                lintegratedList.push({ time, matter, author, channel });
                
                */

                var start = new Date().getTime(), count = 0,interval = 30000;
                var offset = 0;//誤差時間
                var nextTime = interval - offset;//原本間隔 - 誤差
                setTimeout(doFunc,nextTime);

                function doFunc(){
                    var now = new Date().getTime();
                    now+=28800000;
                    offset = new Date().getTime() - (start + count * interval);
                    nextTime = interval - offset;
                    for(var i = timelist.length - 1; i >= 0; --i){
                        if(now >= timelist[i]){
                            /* 
                            
                            const { time, matter, author, channel } = integratedList[i];

                            */

                            const content = matterlist[i];
                            const id = authorlist[i];

                            itr.guild.channels.cache.get(channellist[i]).send(`${client.user.toString()} 給了 <@${id}> 一巴掌 並告訴他 ${content}`);
                            timelist.splice(i,1);
                            matterlist.splice(i,1);
                            authorlist.splice(i,1);
                            channellist.splice(i,1);
                            }
                        }
                    setTimeout(doFunc,nextTime);
                }
            }
        }
    }
);

