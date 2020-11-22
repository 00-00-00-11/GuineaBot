module.exports = {
    name: 'wheek',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: 'Imitate a Guinea Pig',
    run: async (message, args, text, client, prefix, instance) => {
        //NEED FOOD NOW AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        message.channel.send('Wheeeeeeeeeek! 🐹')
    }
}