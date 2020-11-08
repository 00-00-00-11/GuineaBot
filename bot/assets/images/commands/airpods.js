const Discord = require("discord.js")
const Canvas = require("canvas")
const { writeFile } = require("fs")
const path = require("path")
const GIFEncoder = require("gif-encoder-2")
const createBar = require("string-progressbar")
const delay = require("delay")
module.exports= {
    name: 'airpods',
    category: 'image',
    description: 'flex',
    run: async(message, args, client) => {
        const canvas = Canvas.createCanvas(384, 128)
        const ctx = canvas.getContext("2d")
        const encoder = new GIFEncoder(384, 128, "octree", true, 23)

        var i;
        let background;
        let avatar;
        let black_area;

        encoder.setDelay(40)
        encoder.start()
        encoder.setTransparent()
        
        for (i = 1; i < 23; i++) {
            background = await Canvas.loadImage(`./images/airpods/frames/airpodsF${i}.png`)
            black_area = await Canvas.loadImage(`./images/airpods/frames/black_area.png`)
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
            ctx.drawImage(black_area, 0, 0, canvas.width, canvas.height)
            avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'png' }));
            ctx.drawImage(avatar, 128, 0, 128, 128)
            encoder.addFrame(ctx)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        encoder.finish()

        const buffer = encoder.out.getData()

        writeFile(path.join(__dirname, "output", `${message.author.tag} airpods.gif`), buffer, error => {})

        const attachment = new Discord.MessageAttachment(encoder.out.getData(), `${message.author.name} airpods.gif`)
        message.channel.send(attachment)
    }
}