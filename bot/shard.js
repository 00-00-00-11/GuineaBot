const Discord = require("discord.js")
require("dotenv-flow").config()

const manager = new Discord.ShardingManager("./index.js", {
    totalShards: "auto",
    token: process.env.TOKEN
})

manager.spawn(manager.totalShards, 5000)

manager.on("shardCreate", (shard) => {
    shard.on("ready", () => {
        console.log(`Shard ${shard.id} launched`)
    })
})