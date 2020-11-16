const figlet = require("figlet")
module.exports = {
    name: 'ascii',
    category: 'fun',
    description: 'Text art',
    run: async (message, args, client, prefix, command) => {
        const arg = args.slice(0).join(" ")

        if (!arg) return message.channel.send("Input some text.")

        figlet.text(arg, function (err, data) {
            if (err) return message.channel.send("Something went wrong")

            if (data.length > 2000) return message.channel.send("Too much text to output, for the love of god, don't type an entire essay.")

            message.channel.send(`\`\`\`\n${data}\n\`\`\``)
        })
    }
}