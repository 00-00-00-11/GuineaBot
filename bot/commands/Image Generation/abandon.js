const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'abandon',
    minArgs: 1,
    maxArgs: -1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <text>`",
    description: "Abandoning your baby",
    run: async (message, args, text, client, prefix, instance) => {
        //Combine all arguments
        var imageText = args.slice(0).join(" ")

        //Image path
        var image = "./assets/images/abandon/abandon.bmp"

        //Create canvas with same dimensions as image
        const canvas = Canvas.createCanvas(764, 768)

        //Function to keep text in the white box
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');

            let fontSize = 50;

            //Shrink text while it is bigger than 317 pixels
            do {
                ctx.font = `${fontSize -= 1}px sans-serif`;
            } while (ctx.measureText(text).width > 317);

            return ctx.font;
        };

        const ctx = canvas.getContext("2d")

        //Load the image as the background
        const background = await Canvas.loadImage(image)
        //Draw it
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        //Call the function, and add the text
        ctx.font = applyText(canvas, imageText)
        ctx.fillStyle = "#000000"
        ctx.fillText(imageText, 25, 480)

        //Instead of creating a file, make it a buffer
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "abandonBaby.jpg")
        message.channel.send(attachment)
    }
}