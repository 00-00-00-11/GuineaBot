const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'aborted',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<text>",
    description: "10 reason why I should be aborted",
    run: async (message, args, text, client, prefix, instance) => {
        //See abandon.js
        var imageText = args.slice(0).join(" ")

        var image = "./assets/images/aborted/aborted.bmp"

        const canvas = Canvas.createCanvas(565, 518)

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');

            let fontSize = 30;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 159);

            return ctx.font;
        };

        const ctx = canvas.getContext("2d")

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.font = applyText(canvas, imageText)
        ctx.fillStyle = "#ffffff"
        ctx.fillText(imageText, 390, 260)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "aborted.jpg")
        message.channel.send(attachment)
    }
}