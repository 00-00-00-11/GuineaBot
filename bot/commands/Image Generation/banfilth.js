const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'banfilth',
    aliases: [ 'filth'],
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "ban this sick filth",
    run: async (message, args, client, prefix, command) => {
        const canvas = Canvas.createCanvas(536, 751)
        const ctx = canvas.getContext("2d")

        var image = "./assets/images/ban/ban.bmp"

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({
            format: 'png'
        }));
        ctx.drawImage(avatar, 0, 333, canvas.width, canvas.height / 1.8);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `SOMEONE BAN ${message.author} NOW.jpg`)
        message.channel.send(attachment)
    }
}