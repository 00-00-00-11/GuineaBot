const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'slap',
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "[mention]",
    description: "Batman slapping Robin",
    category: "Images",
    run: async (message, args, text, client, prefix, instance) => {
        let batAvatar
        let robAvatar

        let x
        let y
        let x2
        let y2

        let canvas = Canvas.createCanvas(1400, 700)
        let ctx = canvas.getContext("2d")
        let image = "./assets/images/batslap/batslap.bmp"

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        let mention = message.mentions.users.first()

        if (mention) {
            batAvatar = await Canvas.loadImage(message.author.displayAvatarURL({
                format: 'png',
                size: 256
            }))
            robAvatar = await Canvas.loadImage(mention.displayAvatarURL({
                format: 'png',
                size: 256
            }))

            if (batAvatar.width < 256) {
                message.channel.send(`${message.author}'s profile picture is less than 256 pixels in size, output will be smaller than usual.`)
            }

            if (robAvatar.width < 256) {
                message.channel.send(`${mention}'s profile picture is less than 256 pixels in size, output will be smaller than usual.`)
            }

            x = 508
            y = 105
            x2 = 839
            y2 = 362

            ctx.drawImage(batAvatar, x, y)
            ctx.drawImage(robAvatar, x2, y2)
        } else {
            batAvatar = await Canvas.loadImage(message.client.user.displayAvatarURL({
                format: "png",
                size: 256
            }))
            robAvatar = await Canvas.loadImage(message.author.displayAvatarURL({
                format: 'png',
                size: 256
            }))

            if (batAvatar.width < 256) {
                message.channel.send(`My profile picture is less than 256 pixels in size, output will be smaller than usual.`)
            }

            if (robAvatar.width < 256) {
                message.channel.send(`${message.author}'s profile picture is less than 256 pixels in size, output will be smaller than usual.`)
            }

            x = 508
            y = 105
            x2 = 839
            y2 = 362

            ctx.drawImage(batAvatar, x, y)
            ctx.drawImage(robAvatar, x2, y2)
        }

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `slap.jpg`)
        message.channel.send(attachment)
    }
}