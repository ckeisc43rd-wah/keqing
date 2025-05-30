const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { token } = require("./token.json");

const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Reply with \"pong!\"."),
    new SlashCommandBuilder()
        .setName("list")
        .setDescription("huey is gay")
        .addSubcommand(subcommand => subcommand
            .setName("add")
            .setDescription("在清單中新增選項")            
            .addStringOption(option => option
                .setName("option")
                .setDescription("要被加入清單的資料，用,分隔兩個以上的選項")    
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("clear")
            .setDescription("清空清單"),
        )
        .addSubcommand(subcommand => subcommand
            .setName("show") 
            .setDescription("顯示清單"),
        ),
    new SlashCommandBuilder()
        .setName("stick") 
        .setDescription("抽個籤決定今天的運勢吧(⁠≧⁠▽⁠≦⁠)"),
    new SlashCommandBuilder()
        .setName("reminder")
        .setDescription("我會在你需要我的時候一巴掌打醒你")
        .addStringOption(
            option => option
            .setName("matter")
            .setDescription("要提醒你幹嘛呢")    
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("time")
            .setDescription("輸入時間,像2007/07/17 14:00")    
            .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('addpic')
        .setDescription('儲存一張圖片 (上傳圖片或貼上連結)')
        .addStringOption(
            option => option
                .setName('代號')
                .setDescription('請輸入圖片代號')
                .setRequired(true))
        .addStringOption(
            option => option
                .setName('圖片連結')
                .setDescription('請貼上圖片 URL')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('sendpic')
        .setDescription('傳送圖片')
        .addStringOption(
            option => option
                .setName('代號')
                .setDescription('請選擇圖片代號')
                .setRequired(true)
                .setAutocomplete(true)
        )
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands("1078193221798207579"), { body: commands });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();