const { Client } = require("discord.js");
const { config } = require("dotenv");

const { util } = require("minecraft-server-util");

const prefix = '!';

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.on("ready", () => {

  console.log("WonderBot ha sido invocado!");

  util.status('mcwonderland.net', { port: 25556, enableSRV: true, timeout: 5000, protocolVersion: 47 })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        throw error;
    });

  client.user.setPresence({
    activity: { name: "in mcwonderland.net", type: "PLAYING" },
    status: "online",
  });

});

client.on('message', async msg => {

    if (msg.author.bot) return;

    if (!msg.guild) return;

    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();

    switch (cmd) {

        case "ip":
            msg.channel.send("IP del servidor: `mcwonderland.net` \nVersion 1.16.4");
            break;

    }


});


client.login(process.env.DJS_TOKEN);

