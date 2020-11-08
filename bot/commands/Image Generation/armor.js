const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'armor',
    category: 'inggen',
    description: '',
    run: async (message, args, client) => {
        var imageText = args.slice(0).join(" ")
        if (!imageText) {
            message.channel.send("Please specify what text to add.")
            return
        }

        var image = "./assets/images/armor/armor.bmp"

        const canvas = Canvas.createCanvas(518, 661)
        const ctx = canvas.getContext("2d")

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');

            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 215);

            return ctx.font;
        };

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.font = applyText(canvas, imageText)
        ctx.fillStyle = "#000000"
        ctx.fillText(imageText, 30, 430)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "armor.jpg")
        message.channel.send(attachment)
    }
}