module.exports = {
    name: 'test',
    minArgs: 0,
    maxArgs: 0,
    description: "See if the bot works.",
    category: "Information",
    run: async (message, args, text, client, prefix, instance) => {
        message.reply("Ready to execute commands.")
    }
}