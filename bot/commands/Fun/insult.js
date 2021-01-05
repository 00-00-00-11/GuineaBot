const axios = require("axios").default
module.exports = {
    name: 'insult',
    aliases: [ 'roast' ],
    minArgs: 0,
    maxArgs: 0,
    description: 'get roasted ',
    category: 'Fun & Games',
    run: async ({ message, args, text, client, prefix, instance }) => {
        axios.get("https://evilinsult.com/generate_insult.php?format=json").then(async res => message.channel.send(res.data))
    }
}