const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'balloon',
    category: 'img',
    description: '',
    run: async (message, args) => {
        args = message.content.slice(9).trim().split("|")
        let balloonText = args[0]
        let arrowText = args[1]

        if (!balloonText) return message.channel.send("Usage: g?balloon <balloon text> | <arrow text>")
        if (!arrowText) return message.channel.send("Usage: g?balloon <balloon text> | <arrow text>")

        var image = "./assets/images/balloon/balloon.bmp"

        const canvas = Canvas.createCanvas(800, 706)
        const ctx = canvas.getContext("2d")

        const firstPanelApplyText = (canvas, text) => {
            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 222);

            return ctx.font;
        };

        const secondPanelApplyText = (canvas, text) => {
            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 132);

            return ctx.font;
        };

        const thirdPanelApplyText = (canvas, text) => {
            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 182);

            return ctx.font;
        };

        const fourthPanelApplyText = (canvas, text) => {
            let fontSize = 50;

            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 135);

            return ctx.font;
        };

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.font = firstPanelApplyText(canvas, balloonText)
        ctx.fillStyle = "#000000"
        ctx.fillText(balloonText, 45, 190)

        ctx.font = secondPanelApplyText(canvas, arrowText)
        ctx.fillStyle = "#000000"
        ctx.fillText(arrowText, 618, 210)

        ctx.font = thirdPanelApplyText(canvas, balloonText)
        ctx.fillStyle = "#000000"
        ctx.fillText(balloonText, 35, 535)

        ctx.font = fourthPanelApplyText(canvas, balloonText)
        ctx.fillStyle = "#000000"
        ctx.fillText(balloonText, 480, 545)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "balloon.jpg")
        message.channel.send(attachment)
    }
}