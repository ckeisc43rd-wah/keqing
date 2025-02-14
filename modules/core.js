const fs = require("node:fs");

var core = {};

core.loadServer = (guild_id) => {
    if (!fs.existsSync(`./servers/${guild_id}`)) {
        fs.mkdirSync(`./servers/${guild_id}`);
        fs.copyFileSync("./templates/server.json", `./servers/${guild_id}/data.json`);
    }

    return JSON.parse(fs.readFileSync(`./servers/${guild_id}/data.json`));
};

core.saveServer = (guild_id, data) => {
    fs.writeFileSync(`./servers/${guild_id}/data.json`, JSON.stringify(data, null, 4))  
};

module.exports = core;