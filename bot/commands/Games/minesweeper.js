const Discord = require('discord.js')
const Minesweeper = require('discord.js-minesweeper');

module.exports = {
    name: 'minesweeper',
    category: 'games',
    description: 'Minesweeper in Discord!',
    run: async (message, args) => {
        const rows = parseInt(args[0]);
        const columns = parseInt(args[1]);
        const mines = parseInt(args[2]);
    
        if (!rows) {
            return message.channel.send('Usage: g?minesweeper <rows> <columns> <mines>');
        }
    
        if (!columns) {
            return message.channel.send('Usage: g?minesweeper <rows> <columns> <mines>');
        }
    
        if (!mines) {
            return message.channel.send('Usage: g?minesweeper <rows> <columns> <mines>');
        }

        const minesweeper = new Minesweeper({ rows, columns, mines })
        const matrix = minesweeper.start();
 
        if (!matrix) return message.channel.send("You have provided invalid data.")
        if (matrix.length > 2000) return message.channel.send("Matrix is too large to send.")

        message.channel.send(matrix);
    }
}