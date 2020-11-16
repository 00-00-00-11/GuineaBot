module.exports = {
    name: "hex",
    category: "utility",
    description: "Convert/decode hex values",
    run: async (message, args) => {
        if (!args[0]) return message.channel.send("Please specify a valid codec, either decode or encode.")

        let choices = ["encode", "decode"]
        if (!choices.includes(args[0].toLowerCase())) return message.channel.send("Unknown parameter. Please choose the method first, either decode or encode it.");

        let text = args.slice(1).join(" ");
        if (!text) return message.channel.send("Please input some text, preferably in ASCII encoding. See https://theasciicode.com.ar/ for a list of available characters to choose from.");
        if (text.length > 1024) return message.channel.send("Maximum input is 1024 characters, sorry!");

        function encode(text) {
            let arr1 = [];
            for (var n = 0, l = text.length; n < l; n++) {
                var hex = Number(text.charCodeAt(n)).toString(16)
                arr1.push(hex)
            }

            return arr1.join('');
        }

        function decode(text) {
            var hex = text.toString()
            var str = ""

            for (var n = 0; n < hex.length; n += 2) {
                str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
            }
            return str
        }

        if (args[0].toLowerCase() === "encode") {
            return message.channel.send(encode(text));
        } else if (args[0].toLowerCase() === "decode") {
            return message.channel.send(decode(text));
        }
    }
}