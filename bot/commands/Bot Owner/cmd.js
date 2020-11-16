const process = require("child_process")
module.exports = {
    name: 'cmd',
    category: 'Bot Owner',
    description: 'Command Prompt in Discord',
    run: async (message, args, client, prefix, command) => {
        if (message.author.id !== "423222193032396801") return message.channel.send("You are not ${Cy1der}#0001.")
        if (!args[0]) return message.channel.send("What query?")

        message.channel.send("Please wait...").then(m => m.delete({
            timeout: 5000
        }))

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