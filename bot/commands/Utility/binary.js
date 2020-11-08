const Discord = require("discord.js")
module.exports = {
    name: 'binary',
    category: 'binary',
    description: 'Convert a text to binary and vice versa',
    run: async (message, args, client) => {
        if (!args[0]) return message.channel.send("Unknown parameter. Please choose the method first, either decode or encode it.");

        let choice = ["encode", "decode"];
        if (!choice.includes(args[0].toLowerCase())) return message.channel.send("Unknown parameter. Please choose the method first, either decode or encode it.");

        let text = args.slice(1).join(" ");

        if (!text) return message.channel.send("Please input some text.");

        if (text.length > 1024) return message.channel.send("Maximum input is 1024 characters, sorry!");

        function encode(char) {
            return char.split("").map(str => {
                const converted = str.charCodeAt(0).toString(2);
                return converted.padStart(8, "0");
            }).join(" ")
        }

        function decode(char) {
            return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
        }

        if (args[0].toLowerCase() === "encode") {
            return message.channel.send(encode(text));
        } else if (args[0].toLowerCase() === "decode") {
            return message.channel.send(decode(text));
        }
    }
}