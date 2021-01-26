const { Client } = require("discord.js");
const { config } = require("dotenv");

const util = require('minecraft-server-util');

const prefix = '!';

const client = new Client({
    disableEveryone: true
});


var isServerOnline = false;


config({
    path: __dirname + "/.env"
});

client.on("ready", () => {

  console.log("WonderBot ha sido invocado!");


  util.status('mcwonderland.net', { port: 25556, enableSRV: true, timeout: 5000, protocolVersion: 47 })

  .then((response) => {

    this.isServerOnline = true;

  })

    .catch((error) => {

        this.isServerOnline = false;
        throw error;

    });



  if (isServerOnline) {

    client.user.setPresence({
        activity: { name: "mcwonderland.net", type: "PLAYING" },

        status: "online",
      });

      console.log("Is Online");

  } else {

    client.user.setPresence({
        activity: { name: "mcwonderland.net", type: "PLAYING" },

        status: "dnd",
      });

  }

});

client.on('message', async msg => {

    if (msg.author.bot) return;

    if (!msg.guild) return;

    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();

    switch (cmd) {

        case "ip":

            if (isServerOnline) msg.channel.send(`IP del servidor: \`mcwonderland.net\` \nVersion 1.16.4 \nJugadores conectados ${status_response.onlinePlayers} / ${status_response.maxPlayers}`);

            else msg.channel.send(`IP del servidor: \`mcwonderland.net\` \nVersion 1.16.4 \n**El servidor se encuentra apagado**`);

            break;

    }


});


client.login(process.env.DJS_TOKEN);

