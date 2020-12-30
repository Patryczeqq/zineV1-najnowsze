const Discord = require("discord.js")
const client = new Discord.Client({
    shardId: process.argv[1],
    shardCount: process.argv[2],
    fetchAllMembers: true,
    disableMentions: "everyone",
    shards: "auto"
})
const cmdHandler = require("./hdl/cmdh.js")
const evntHandler = require("./hdl/evh.js")
const config = require("./config.json")

// Uruchamianie handlerów
cmdHandler(client)
evntHandler(client)

// Logowanie
client.login(config.private.token)