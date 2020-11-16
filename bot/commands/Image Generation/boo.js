const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'boo',
    category: 'images',
    description: 'boo!',
    run: async (message, args, client, prefix, command) => {
        args = message.content.slice(6).trim().split("|")
        let firstText = args[0]
        let secondText = args[1]

        if (!firstText) return message.channel.send("Usage: g?balloon <first panel text> | <second panel text>")
        if (!secondText) return message.channel.send("Usage: g?balloon <first panel text> | <second panel text>")

        var image = "./assets/images/boo/boo.bmp"

        const canvas = Canvas.createCanvas(526, 271)
        const ctx = canvas.getContext("2d")

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const firstPanelApplyText = (canvas, text) => {
            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 230);

            return ctx.font;
        };

        const secondPanelApplyText = (canvas, text) => {
            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 156);

            return ctx.font;
        };

        ctx.font = firstPanelApplyText(canvas, firstText)
        ctx.fillStyle = "#000000"
        ctx.fillText(firstText, 15, 100)

        ctx.font = secondPanelApplyText(canvas, secondText)
        ctx.fillStyle = "#000000"
        ctx.fillText(secondText, 260, 120)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "boo.jpg")
        message.channel.send(attachment)
    }
}