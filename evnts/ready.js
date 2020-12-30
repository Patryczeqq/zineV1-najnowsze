module.exports = async (client) => {
    console.log(`${client.user.tag} jest gotowy!`)
    client.user.setPresence({
        status: "idle",
        activity: {
            name: "@Zine | ?? serwerów [Inicjalizacja]",
            type: 'WATCHING'
        }
    })
    setInterval(async () => {
        client.user.setPresence({
            status: "idle",
            activity: {
                name: `@Zine | ${await client.shard.fetchClientValues("guilds.cache.size").then(re => re.reduce((a, acc) => a + acc, 0))} serwerów`,
                type: 'WATCHING',
            }
        })
    }, 13000)
}