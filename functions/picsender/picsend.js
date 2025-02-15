const { Events, Client, Intents } = require("discord.js");

const core = require("../../modules/core.js");

const { client } = global;

const fs = require('fs');

const path = require('path');

client.on(Events.InteractionCreate, async (itr) => {

    server = core.loadServer(itr.guild.id);

    // 🔹 如果這次互動是自動補全 (autocomplete)，則執行這段程式碼
    if (itr.isAutocomplete()) {
        const data = JSON.parse(fs.readFileSync(`./servers/${itr.guild.id}/data.json`)); // 讀取 JSON 檔案
        const wordstyping = itr.options.getFocused(); // 使用者當前輸入的內容
        const picKeys = data.pic.map(obj => Object.keys(obj)[0])
            .filter(key => key.includes(wordstyping)) // 🔍 篩選包含使用者輸入的 `key`
            .slice(0, 25); // 取前 25 個匹配項目 (Discord 限制)
        // 🔹 回傳自動補全結果
        await itr.respond(
            picKeys.map(key => ({ name: key, value: key })) // 轉換成 Discord 選項格式
        );
        return;
    }

    if (itr.isCommand()) {
        switch (itr.commandName) {

            case "sendpic":
                    // 🔹 如果這次互動是指令執行
                        const data2 = JSON.parse(fs.readFileSync(`./servers/${itr.guild.id}/data.json`));
                        const key = itr.options.getString("代號");
                        const picmap = data2.pic.find(obj => obj[key]);
                        if(picmap){
                            await itr.reply(picmap[key]);
                        }
                        else{
                            await itr.reply("沒有那種東西");
                        }
                        
                
                break;
            case "addpic":
                const code = itr.options.getString('代號');
                const url = itr.options.getString('圖片連結');
                const data = JSON.parse(fs.readFileSync(`./servers/${itr.guild.id}/data.json`));
                data.pic.push({[code]: url});
                fs.writeFileSync(`./servers/${itr.guild.id}/data.json`, JSON.stringify(data, null, 4))
                await itr.reply(`已儲存**${code}**\n${url}`);
                break; 
        }
    }

})

client.on(Events.MessageCreate, async (msg) => {

    server = core.loadServer(msg.guild.id);

    const prefix = '-';

    if (msg.content.startsWith(prefix)) {
        let args = msg.content.slice(prefix.length);
        switch (args) {
            case "addpic":
                console.log(msg.attachments.url);
        }
    }

})

