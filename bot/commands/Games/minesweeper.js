const Discord = require('discord.js')
const Minesweeper = require('discord.js-minesweeper');

module.exports = {
    name: 'minesweeper',
    aliases: [ "sweeper" ],
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <rows> <columns> <mines>`",
    description: 'Minesweeper in Discord!',
    run: async (message, args, text, client, prefix, instance) => {
        const rows = parseInt(args[0]);
        const columns = parseInt(args[1]);
        const mines = parseInt(args[2]);

        //Call a new instance of minesweeper
        const minesweeper = new Minesweeper({ rows, columns, mines })

        //Start the game
        const matrix = minesweeper.start();
 
        //Check for errors
        if (!matrix) return message.channel.send("You have provided invalid data.")
        if (matrix.length > 2000) return message.channel.send("Matrix is too large to send.")

        message.channel.send(matrix);
    }
}