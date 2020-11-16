module.exports = {
    name: '8ball',
    category: 'fun',
    description: '8ball toy in Discord',
    run: async (message, args, client, prefix, command) => {
        if (!args[0]) return message.channel.send("What do I predict for you?")
        const messages = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don’t count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes.", "Yes – definitely.", "You may rely on it."]
        let finalmessage;
        let randomizer = Math.floor(Math.random() * messages.length)

        finalmessage = messages[randomizer]
        message.channel.send(finalmessage)
    }
}