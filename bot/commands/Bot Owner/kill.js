module.exports = {
    name: 'kill',
    category: 'Bot Owner',
    description: 'Shut down the bot (restart if on heroku)',
    run: async (message, args, client) => {
        if (message.author.id !== "423222193032396801") {
            return message.reply("You are not the owner of the bot, also known as ${Cy1der}#0001.")
        }

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
            console.log("[GuineaBot] has died                                                                                           wheek wheek");
            message.channel.send("📴 Shutting down in 3 seconds...")

            setTimeout(() => {
                process.exit()
            }, 3000)
        }
    }
}