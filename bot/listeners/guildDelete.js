//This is for whenever the bot is kicked/banned from a server
module.exports = (client) => {
    client.on("guildDelete", deletedGuild => {
        //Updates status to match server count, however, there is a rate limit, so sometimes the bot will not update the status
        client.user.setPresence({
            activity: {
                name: `g?help | ${client.guilds.cache.size} servers`,
                type: "STREAMING",
                url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
            },
            status: "online"
        })
    });
}

module.exports.config = {
    displayName: "Server Leave", 
    dbName: "GBOTguilddelete",
    loadDBFirst: true
}