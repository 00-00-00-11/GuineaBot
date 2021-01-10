module.exports = {
    name: 'roll',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<amount of dice>",
    description: 'Roll dice(s)',
    category: 'Fun & Games',
    run: async ({ message, args, text, client, prefix, instance }) => {
        let amount = parseInt(args[0])

        if (isNaN(amount)) return message.channel.send("The amount of dices has to be a numeric value.")
        if (amount < 1) return message.channel.send("The amount of dices has to be over 0.")
        if (amount > 20) return message.channel.send("The amount of dices has to be be under 20. -_-")

        let str = ""
        let total = 0

        for (let i = 1; i <= amount; i++) {
            let randomizer = Math.floor(Math.random() * 6) + 1
            str += `**Dice ${i}:** ${randomizer}\n`
            total = total + randomizer
        }

        str += `\n**Total:** ${total}`

        message.channel.send(str)
    }
}