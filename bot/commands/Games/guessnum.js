module.exports = {
    name: 'guessnum',
    aliases: [ "guess "],
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "Guess the number",
    run: async (message, args, client, prefix, command) => {
        //Random number from 1 to 25
        var number = Math.floor(Math.random() * 24) + 1

        //Notify user
        message.channel.send("I have generated a random number between 1 and 25, guess the number now!")

        //Filter responses to only the command author
        const filter = msg => msg.author.id === message.author.id;
        const options = {
            max: 1
        }

        //Initiate message collector
        let collector = await message.channel.awaitMessages(filter, options);
        let answer = collector.first().content

        //Get the guess and check if it is a numeric value
        let guess = parseInt(answer)
        if (isNaN(guess)) return message.channel.send('You did not enter a valid number.')

        //Check if it was the correct number
        if (guess === number) return message.channel.send(`Good job! You entered the correct number!`)
        else return message.channel.send(`Better luck next time! The correct number was **${number}**.`)
    }
}