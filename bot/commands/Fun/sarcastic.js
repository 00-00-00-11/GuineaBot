const sarc = require("sarcastic-text")

module.exports = {
    name: "sarcastic",
    category: "Fun",
    description: "BrO yOu ArE sO fUnNy",
    run: async (message, args) => {
        let text = args.slice(0).join(" ")
        if (!text) return message.channel.send("BrO, sPeCiFy WhAt TeXt To CoNvErT tO sArCaStIc")
        let sarcasticText = sarc.getSarcastic(text)
        message.channel.send(sarcasticText)
    }
}