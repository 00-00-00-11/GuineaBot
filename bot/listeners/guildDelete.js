//This is for whenever the bot is kicked/banned from a server
module.exports = (client) => {
    client.on("guildDelete", deletedGuild => {
        //Updates status to match server count, however, there is a rate limit, so sometimes the bot will not update the status
        client.user.setActivity(`${client.guilds.cache.size} servers`, {
            type: 'WATCHING'
        }).catch(error => console.log(error));
    });
}