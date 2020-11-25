const Discord = require("discord.js")
module.exports= {
    name: 'disconnect',
    aliases: [ 'dc' ],
    minArgs: 0,
    maxArgs: 0,
    description: "Disconnects from the voice channel and clears the queue",
    category: "Music",
    run: async(message, args, text, client, prefix, instance) => {
        const channel = message.member.voice.channel
        if (!channel) return message.channel.send("You need to be in a voice channel first!").catch(console.error);
        if (!message.guild.me.voice.channel) return message.channel.send("I'm not connected to a voice channel.")
        if (channel !== message.guild.me.voice.channel) return message.channel.send("You must be in the same voice channel as me!")
        message.guild.me.voice.channel.leave()
        message.channel.send(`Successfully left **${message.member.voice.channel.name}**`)
    }
}