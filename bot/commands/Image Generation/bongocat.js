const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'bongocat',
    category: 'img',
    description: '',
    run: async (message, args, client) => {
        var image = "./assets/images/bongocat/bongocat.bmp"

        const canvas = Canvas.createCanvas(750, 750)
        const ctx = canvas.getContext("2d")

        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({
            format: 'png'
        }));
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "bongocat.jpg")
        message.channel.send(attachment)
    }
}