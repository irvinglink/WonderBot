const { Client } = require("discord.js");
const {config} = require("dotenv");

const prefix = '!';

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.on('ready', () => {

    console.log("WonderBot ha sido invocado!");

    client.user.setPresence({ activity: { name: 'in mcwonderland.net', type: "PLAYING" }, status:"online" });

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


client.login(process.env.TOKEN);

