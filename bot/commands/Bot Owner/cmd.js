const process = require("child_process")
module.exports = {
    name: 'cmd',
    minArgs: 1,
    maxArgs: -1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <command to run>`",
    description: 'Run command prompt (or at least try to) in Discord, DANGEROUS!!!!',
    run: async (message, args, text, client, prefix, instance) => {
        //Check if you are not me (Cy1der)
        if (message.author.id !== "423222193032396801") return message.channel.send("You are not ${Cy1der}#0001.")

        //Please wait
        message.channel.send("Please wait...").then(m => m.delete({
            timeout: 2000
        }))

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