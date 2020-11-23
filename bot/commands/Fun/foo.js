module.exports = {
    name: 'foo',
    minArgs: 0,
    maxArgs: 0,
    description: 'idk lol',
    run: async (message, args, text, client, prefix, instance) => {
        //foo?
        message.channel.send('Bar()')
    }
}