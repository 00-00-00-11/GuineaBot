module.exports = {
    name: 'kill',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "Shut down the bot, restart if hosted on heroku",
    run: async (message, args, text, client, prefix, instance) => {
        //Check if you are not me (Cy1der)
        if (message.author.id !== "423222193032396801") return message.reply("You are not the owner of the bot, also known as ${Cy1der}#0001.")

        //Filter the person to respond to the message author, me
        const filter = msg => msg.author.id === message.author.id;
        const options = {
            max: 1
        }

        message.channel.send('**Are you sure? Enter `cancel` to cancel.**')

        let collector = await message.channel.awaitMessages(filter, options);
        let answer = collector.first().content;

        if (answer === 'cancel' || answer === 'Cancel' || answer === "no" || answer === "No" || answer === "NO") {
            message.channel.send('**Setup process ended, requested by bot owner**')
            return;
        }

        if (answer === "yes" || answer === "Yes" || answer === "YES") {
            console.log(`Logged out of [${client.user.tag}]`);
            message.channel.send("📴 Shutting down in 3 seconds...")

            //After 3 seconds, the bot will automatically shut down, if the bot is hosted on heroku, it restarts instead
            setTimeout(() => {
                process.exit()
            }, 3000)
        }
    }
}