const { Client, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const util = require('minecraft-server-util');

//const {shop_message} = require('./elements/messages.js');

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

        const shop_msg = new MessageEmbed()
          .setColor("#6DD5FA")
          .setTitle("MCWonderLand")
          .setAuthor(
            "Tienda",
            client.user.avatarURL(),
            "http://tienda.mcwonderland.net/"
          )
          .setDescription(
            "Nosotros contamos con una tienda donde puedes adquirir rangos, o beneficios dentro del servidor."
          )
          .addField("Pagina", "http://tienda.mcwonderland.net/");

          msg.channel.send(shop_msg);

          break;

          case "voto":
          case "votar":

            const vote_msg = new MessageEmbed()
              .setColor("#6DD5FA")
              .setTitle("MCWonderLand")
              .setAuthor(
                "Voto",
                client.user.avatarURL(),
                "http://voto.mcwonderland.net/"
              )
              .setDescription(
                "Al momento de votar por el servidor podras obtener una llave plateada dentro del servidor, esto es como muestra de agradecimiento por haber votado. \n \nDespues de haber votado en la pagina dentro del servidor deberas de ejecutar el comando ``/voto40`` para reclamar tu"
              )
              .addField("Pagina", "http://voto.mcwonderland.net/");

              msg.channel.send(vote_msg);

              break;

          case "suicide":
            const suicide_msg = new MessageEmbed().setColor("#ED213A").setTitle("MCWonderLand").setAuthor(msg.member.user.username, msg.member.user.avatarURL()).setDescription(msg.member.user.username + " se ha suicidado!")

            msg.channel.send(suicide_msg)
            break;

    }


});


client.login(process.env.DJS_TOKEN);

