const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'brain',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<first panel text> | <second panel text> | <third panel text> | <fourth panel text>", 
    description: "Expanding brain command",
    category: "Images",
    run: async ({ message, args, text, client, prefix, instance }) => {
        args = message.content.slice(8).trim().split("|")
        let firstText = args[0]
        let secondText = args[1]
        let thirdText = args[2]
        let fourthText = args[3]

        if (!firstText) return message.reply("Usage: <first panel> | <second panel> | <third panel> | <fourth panel>")
        if (!secondText) return message.reply("Usage: <first panel> | <second panel> | <third panel> | <fourth panel>")
        if (!thirdText) return message.reply("Usage: <first panel> | <second panel> | <third panel> | <fourth panel>")
        if (!fourthText) return message.reply("Usage: <first panel> | <second panel> | <third panel> | <fourth panel>")

        var image = "./assets/images/brain/brain.bmp"

        const canvas = Canvas.createCanvas(542, 767)
        const ctx = canvas.getContext("2d")

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const applyText = (canvas, text) => {
            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 256);

            return ctx.font;
        };

        ctx.font = applyText(canvas, firstText)
        ctx.fillStyle = "#000000"

        ctx.fillText(firstText, 5, 115)
        ctx.fillText(secondText, 5, 315)
        ctx.fillText(thirdText, 5, 515)
        ctx.fillText(fourthText, 5, 715)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "brain.jpg")
        message.channel.send(attachment)
    }
}