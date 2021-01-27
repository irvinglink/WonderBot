const { Client } = require("discord.js");
const { config } = require("dotenv");
const util = require('minecraft-server-util');

const {shop_message} = require('./elements/messages.js');

const prefix = '!';

var isServerOnline = false;

const client = new Client({
    disableEveryone: true
});


config({
    path: __dirname + "/.env"
});

client.on("ready", () => {


  util.status('mcwonderland.net', { port: 25556, enableSRV: true, timeout: 5000, protocolVersion: 47 })

  .then((response) => {

    isServerOnline = true;

    console.log("Server Status is online");

  }).catch((error) => {

    console.log("Server Status is offline");
    throw error;

  });


  client.user.setPresence({

      activity: { name: "mcwonderland.net", type: "PLAYING" },

      status: "online",

    });

  console.log("WonderBot ha sido invocado!");

});

client.on('message', async msg => {

    if (msg.author.bot) return;

    if (!msg.guild) return;

    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();

    switch (cmd) {

        case "ip":

            util.status('mcwonderland.net', { port: 25556, enableSRV: true, timeout: 5000, protocolVersion: 47 })

            .then((response) => {

              isServerOnline = true;
              msg.channel.send(`IP del servidor: \`mcwonderland.net\` \nVersion 1.16.4 \nJugadores conectados ${response.onlinePlayers} / ${response.maxPlayers}`);

            }).catch((error) => {
                isServerOnline = false;
                msg.channel.send(`IP del servidor: \`mcwonderland.net\` \nVersion 1.16.4 \n**El servidor se encuentra apagado**`);
                throw error;
            });


            break;

        case "tienda":
          msg.channel.send(shop_message());
          break;
    }


});


client.login(process.env.DJS_TOKEN);

