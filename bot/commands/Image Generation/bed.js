const Discord = require("discord.js")
const Canvas = require("canvas")
module.exports = {
    name: 'bed',
    minArgs: 0,
    maxArgs: 0,
    description: "Mommy theres a monster under my bed",
    category: "Images",
    run: async (message, args, text, client, prefix, instance) => {
        var image = "./assets/images/bed/bed.jpg"

        const canvas = Canvas.createCanvas(316, 768)
        const ctx = canvas.getContext("2d")

        const background = await Canvas.loadImage(image)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({
            format: 'png',
            size: 128
        }));
        ctx.drawImage(avatar, 20, 571);

        if (avatar.width < 128) {
            message.reply("Your profile picture is less than 256 pixels in size, output will be smaller than usual.")
        }

        ctx.beginPath();
        ctx.arc(20, 571, 33, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "bed.jpg")
        message.channel.send(attachment)
    }
}