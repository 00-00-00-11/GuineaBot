module.exports = {
    name: 'wheek',
    category: 'fun',
    description: 'Imitate a Guinea Pig',
    run: async (message, args, client) => {
        message.channel.send('Wheeeeeeeeeek! 🐹')
    }
}