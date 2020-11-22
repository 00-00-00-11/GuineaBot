const Discord = require("discord.js")
const convert = require("parse-ms")
module.exports = {
    name: 'spotify',
    minArgs: 0,
    maxArgs: 1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <mention (optional)>`",
    description: "dc",
    run: async (message, args, text, client, prefix, instance) => {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        let status;
        if (user.presence.activities.length === 1) status = user.presence.activities[0];
        else if (user.presence.activities.length > 1) status = user.presence.activities[1];

        if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            return message.channel.send(`${user.tag} isn't listening to Spotify.`);
        }

        if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
                url = `https://open.spotify.com/track/${status.syncID}`,
                name = status.details,
                artist = status.state,
                album = status.assets.largeText,
                timeStart = status.timestamps.start,
                timeEnd = status.timestamps.end,
                timeConvert = convert(timeEnd - timeStart);

            let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
            let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
            let time = `${minutes}:${seconds}`;

            const embed = new Discord.MessageEmbed()
                .setAuthor("Spotify Track Information", "https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg")
                .setColor(0x1ED768)
                .setThumbnail(image)
                .setTitle(`${user.tag}'s Spotify status`)
                .addField("Name:", name)
                .addField("Album:", album)
                .addField("Artist:", artist)
                .addField("Duration:", time)
                .addField("Listen now on Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
            return message.channel.send(embed)
        }
    }
}