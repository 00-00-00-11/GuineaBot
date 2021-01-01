const Discord = require("discord.js")
const Canvas = require("canvas")
const {
    writeFile
} = require("fs")
const path = require('path')
const GIFEncoder = require("gif-encoder-2")
module.exports = {
    name: 'america',
    minArgs: 0,
    maxArgs: 0,
    description: 'American flag over your profile picture',
    category: "Images",
    run: async ({ message, args, text, client, prefix, instance }) => {
        message.channel.send("Please allow 30 - 45 seconds.").then(msg => msg.delete({
            timeout: 10000
        }))

        const canvas = Canvas.createCanvas(480, 480)
        const ctx = canvas.getContext("2d")
        const encoder = new GIFEncoder(480, 480, "octree", true, 50)

        var i;
        let background;
        let avatar;
        let opacity = 0.5 //out of 1 which is equal to 100

        ctx.globalAlpha = opacity

        encoder.setDelay(40)
        encoder.start()

        for (i = 1; i < 50; i++) {
            avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({
                format: "png"
            }))
            ctx.drawImage(avatar, 0, 0, 480, 480)

            background = await Canvas.loadImage(`./assets/images/america/frames/F${i}.png`)
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

            encoder.addFrame(ctx)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        encoder.finish()

        const buffer = encoder.out.getData()
        writeFile(path.join(__dirname, "output", `${message.author} america.gif`), buffer, error => {})

        const attachment = new Discord.MessageAttachment(encoder.out.getData(), `${message.author} america.gif`)
        message.channel.send(attachment)
    }
}