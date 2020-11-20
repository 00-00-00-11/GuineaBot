module.exports = {
    name: 'foo',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: 'idk lol',
    run: async (message, args, client, prefix, command) => {
        //foo?
        message.channel.send('Bar()')
    }
}