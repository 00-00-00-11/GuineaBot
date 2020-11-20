const ascii = require("ascii-table")
module.exports = {
    name: "aliases",
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}",
    description: "command aliases",
    run: async (message, args, client, prefix, command) => {
        const table = new ascii("GuineaBot command aliases:")
        table.setHeading("Command", "Alias")

        let commands = ["cleverbot", "coolkid", "dankmeme", "guineapig", "image", "sarcastic", "wholesomememe", "connect4", "guessnum", "hangman", "minesweeper", "banfilth", "deepfry", "addlevel", "addxp", "createuserxp", "deleteuserxp", "leaderboard", "rank", "removelevel", "removexp", "required", "chatmute", "deafen", "removewarn", "setnick", "unchatmute", "undeafen", "unvoicemute", "voicemute", "warnings", "connect", "disconnect", "lyrics", "nowplaying", "play", "playlist", "queue", "volume", "createtextchannel", "createvoicechannel", "deletevoicechannel", "deletetextchannel", "avatar", "google", "randomnumber", "randomnumberrange", "temporary", "clear"]
        let aliases = ["clever", "cool", "dm", "pig", "i", "sarc", "wm", "c4", "guess", "hang", "sweeper", "filth", "fry", "+lvl", "+xp", "cuxp", "duxp", "lb", "level", "-lvl", "-xp", "req", "cm", "deaf", "-warn", "nick", "ucm", "undeaf", "uvm", "vm", "warns", "join", "dc", "ly", "np", "p", "pl", "q", "v", "ctc", "cvc", "dvc", "dtc", "pfp", "ggl", "rn", "rnr", "temp", "purge"]

        for (let i = 0; i < commands.length; i++) {
            table.addRow(commands[i], aliases[i])
        }

        message.channel.send(`\`\`\`\n${table.toString()}\n\`\`\``)
    }
}