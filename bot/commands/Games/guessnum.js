module.exports = {
    name: 'guessnum',
    category: 'fun',
    description: "Guess the number",
    run: async (message, args) => {
        var number = Math.floor(Math.random() * 24) + 1
        message.channel.send("I have generated a random number between 1 and 25, guess the number now!")

        const filter = msg => msg.author.id === message.author.id;
        const options = {
            max: 1
        }

        let collector = await message.channel.awaitMessages(filter, options);
        let answer = collector.first().content

        let guess = parseInt(answer)
        if (isNaN(guess)) return message.channel.send('You did not enter a valid number.')

        if (guess === number) return message.channel.send(`Good job! You entered the correct number!`)
        else return message.channel.send(`Better luck next time! The correct number was **${number}**.`)
    }
}