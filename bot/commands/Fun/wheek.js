module.exports = {
    name: 'wheek',
    minArgs: 0,
    maxArgs: 0,
    description: 'Imitate a Guinea Pig',
    category: 'Fun',
    run: async (message, args, text, client, prefix, instance) => {
        //NEED FOOD NOW AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        message.channel.send('Wheeeeeeeeeek! 🐹')
    }
}