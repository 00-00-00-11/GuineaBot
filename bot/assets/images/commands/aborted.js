const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports= {
    name: 'aborted',
    category: 'images',
    description: 'abort me',
    run: async(message, args, client) => {
        var imageText = args.slice(0).join(" ")
        if (!imageText) {
            message.channel.send("Please specify what text to add.")
            return
        }

        var image = "./images/aborted/aborted.bmp"
        
        const canvas = Canvas.createCanvas(565, 518)

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
    
            let fontSize = 30;
        
            do {
                ctx.font = `${fontSize -= 5}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 150);
        
            return ctx.font;
        };

        const ctx = canvas.getContext("2d")

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.font = applyText(canvas, imageText)
        ctx.fillStyle = "#ffffff"
        ctx.fillText(imageText, 390, 260, 320)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "aborted.jpg")
        message.channel.send(attachment)
    }
}