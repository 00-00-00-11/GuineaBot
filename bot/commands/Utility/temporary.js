module.exports = {
    name: "temporary",
    category: "utility",
    description: "Send a message, then delete it after a set time.",
    run: async (message, args) => {
        if (!args[0]) return message.channel.send("You need to provide how many milliseconds to wait before deleting the message. For example, 1 second is equivalent to 1000 milliseconds.");
        let ms = parseInt(args[0]);
        if (isNaN(ms)) return message.channel.send("You must provile a valid number of milliseconds.");

        let str = args.slice(1).join(" ");
        if (!str.length) return message.channel.send("You must provide a message to send.");

        message.channel.send(str).then(msg => {
            msg.delete({
                timeout: ms
            })
        })

        setTimeout(async () => {
            message.delete()
        }, 500)
    }
}