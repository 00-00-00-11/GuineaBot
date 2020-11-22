const sarc = require("sarcastic-text")

module.exports = {
    name: "sarcastic",
    aliases: [ "sarc "],
    minArgs: 1,
    maxArgs: -1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <text>`",
    description: "BrO yOu ArE sO fUnNy",
    run: async (message, args, text, client, prefix, instance) => {
        //Simple as this, what to I describe here?
        let sarcasticText = sarc.getSarcastic(text)
        message.channel.send(sarcasticText)
    }
}