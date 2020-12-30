const { ShardingManager } = require("discord.js");
const chalk = require("chalk")
const config = require("./config.json")
const shard = new ShardingManager(`./index.js`, {
    token: config.private.token,
    autoSpawn: true,
    totalShards: 3
})

shard.spawn();
shard.on("shardCreate", shard => console.log(chalk.redBright(`[SHARD] Uruchomiono shard ${shard.id}`)))