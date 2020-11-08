const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports= {
    name: 'abandon',
    category: 'images',
    description: 'abandon the baby',
    run: async(message, args, client) => {
        var imageText = args.slice(0).join(" ")
        if (!imageText) {
            message.channel.send("Please specify what text to add.")
            return
        }

        var image = "./images/abandon/abandon.bmp"
        
        const canvas = Canvas.createCanvas(764, 768)

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
    
            let fontSize = 50;
        
            do {
                ctx.font = `${fontSize -= 5}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 325);
        
            return ctx.font;
        };

        const ctx = canvas.getContext("2d")

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.font = applyText(canvas, imageText)
        ctx.fillStyle = "#000000"
        ctx.fillText(imageText, 25, 480, 320)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "abandonBaby.jpg")
        message.channel.send(attachment)
    }
}