const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'byemom',
    minArgs: 1,
    maxArgs: -1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <text>`.",
    description: "boy better be not searching naughty videos",
    run: async (message, args, text, client, prefix, instance) => {
        var imageText = args.slice(0).join(" ")
        if (!imageText) {
            message.channel.send("Please specify what text to add.")
            return
        }

        var image = "./assets/images/byemom/mom.bmp" //25 dg

        const canvas = Canvas.createCanvas(680, 632)
        const ctx = canvas.getContext("2d")

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');

            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 317);

            return ctx.font;
        };

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.translate(358, 611)
        ctx.rotate(-25 * Math.PI / 180)
        ctx.textAlign = "left"

        ctx.font = applyText(canvas, imageText)
        ctx.fillStyle = "#000000"
        ctx.fillText(imageText, 0, 0)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "byemom.jpg")
        message.channel.send(attachment)
    }
}