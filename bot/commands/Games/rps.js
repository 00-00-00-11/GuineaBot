module.exports = {
    name: "rps",
    category: "Fun",
    description: "Rock paper scissors",
    run: async (message, args) => {
        message.reply("Enter `r` for rock, `p` for paper, or `s` for scissors.")

        const filter = msg => msg.author.id === message.author.id;
        const options = {
            max: 1
        }

        let collector = await message.channel.awaitMessages(filter, options);
        let answer = collector.first().content

        let answerLower = answer.toLowerCase()

        if (answerLower !== "r" && answerLower !== "p" && answerLower !== "s") return message.reply("You entered an invalid option, `r` for rock, `p` for paper, or `s` for scissors.")

        let AIanswers = ["r", "p", "s"]
        let randomizer = Math.floor(Math.random() * AIanswers.length)
        let response = AIanswers[randomizer]

        if (response === answerLower) return message.reply(`The game ended in a **TIE**! I responded with **${response}**, and you entered **${answerLower}**!`)

        if (response === "r" && answerLower === "s") return message.reply(`I won! I responded with **${response}**, and you entered **${answerLower}**!`)
        if (response === "p" && answerLower === "r") return message.reply(`I won! I responded with **${response}**, and you entered **${answerLower}**!`)
        if (response === "s" && answerLower === "p") return message.reply(`I won! I responded with **${response}**, and you entered **${answerLower}**!`)

        if (answerLower === "r" && response === "s") return message.reply(`You won! I responded with **${response}**, and you entered **${answerLower}**!`)
        if (answerLower === "p" && response === "r") return message.reply(`You won! I responded with **${response}**, and you entered **${answerLower}**!`)
        if (answerLower === "s" && response === "p") return message.reply(`You won! I responded with **${response}**, and you entered **${answerLower}**!`)
    }
}