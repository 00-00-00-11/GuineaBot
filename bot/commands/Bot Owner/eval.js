const process = require("child_process")
module.exports = {
    name: 'eval',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<command to run>",
    description: 'Run a child process in Discord',
    category: 'Bot Owner',
    run: async (message, args, text, client, prefix, instance) => {
        //Check if you are not me (Cy1der)
        if (message.author.id !== "423222193032396801") return message.channel.send(instance.messageHandler.get(message.guild, 'NOT_OWNER'))

        //Execute command specified and send the result
        process.exec(args.join(" "), (error, stdout) => {
            let response = (error || stdout)
            message.channel.send(response, {
                code: "asciidoc",
                split: "\n"
            }).catch(err => message.channel.send(err))
        })

        return
    }
}