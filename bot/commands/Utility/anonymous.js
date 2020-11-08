module.exports = {
    name: 'anonymous',
    category: 'util',
    description: 'Send a message anonymously',
    run: async (message, args, client) => {
        let attachments = message.attachments.array()
        if (attachments.length > 0) return message.reply("Please send attachments as links")

        let msg = args.slice(0).join(" ")

        if (!msg) return message.channel.send("Don't send an empty message")

        let linkregex = /(ftp|http|https):\/\/[^ "]+/g

        if (linkregex.test(msg)) {
            let new_msg = msg.replace(linkregex, "<$&>")
            message.channel.send(new_msg)
            setTimeout(async () => {
                message.delete()
            }, 500)
        } else {
            message.channel.send(msg)
            setTimeout(async () => {
                message.delete()
            }, 500)
        }
    }
}