const discord = require("discord.js");

export function shop_message() {

    return new discord.MessageEmbed()
    .setColor("#6DD5FA")
    .setTitle("MCWonderLand")
    .setAuthor("MCWonderLand")
    .setDescription("Nosotros contamos con una tienda donde puedes adquirir rangos, o beneficios dentro del servidor.")
    .addField("Pagina", "https://mcwonderland.tebex.io");;

}
