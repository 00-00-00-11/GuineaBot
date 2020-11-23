const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'affect',
    minArgs: 0,
    maxArgs: 0,
    description: "This does not affect my baby",
    run: async (message, args, text, client, prefix, instance) => {
        //See abandon.js
        var image = "./assets/images/affect/affect.bmp"

        const canvas = Canvas.createCanvas(500, 636)
        const ctx = canvas.getContext("2d")

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({
            format: 'png'
        }));
        ctx.drawImage(avatar, 200, 383, 140, 140);

        ctx.beginPath();
        ctx.arc(180, 383, 70, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "affect.jpg")
        message.channel.send(attachment)
    }
}