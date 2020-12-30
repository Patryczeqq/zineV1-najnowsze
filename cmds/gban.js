const { MessageEmbed } = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "gban",
    description: "Banuje globalnie wspomnianego użytkownika.",
    usage: "<dodaj / usuń / sprawdz> <@użytkownik / ID> [powód]",
    category: "Developerskie",

    async run(message, args, client) {
        const akcja = args[0]
        const uzytkownik = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[1]) || client.users.cache.get(args[1])
        const powod = [...args].slice(2).join(" ") || "Nie podano"
        if (config.devs.blocked.includes(message.author.id) || !config.devs.allowed.includes(message.author.id)) {
            client.functions.permissionError(message.channel, "perms.global.developer")
        } else if (!akcja) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "gban <dodaj / usuń / sprawdz> <@użytkownik / ID> [powód]")
        } else if (!uzytkownik) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiego użytkownika w pamięci lub go nie podałeś")
        } else if (akcja === "dodaj" || akcja === "add") {
            const gbanstatus = await client.globalBans.get(`gban-${uzytkownik.id}-status`) || "Brak bana"
            if (gbanstatus === "Brak bana") {
                await client.globalBans.set(`gban-${uzytkownik.id}-status`, "Globalnie zbanowany")
                await client.globalBans.set(`gban-${uzytkownik.id}-reason`, powod)
                await client.globalBans.set(`gban-${uzytkownik.id}-mod-id`, message.author.id)
                        
                // MESS CHN

                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Sukces", "https://upload.wikimedia.org/wikipedia/commons/1/14/Ban_sign.png")
                .setDescription(`Pomyślnie zbanowano globalnie użytkownika ${uzytkownik}.`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);
                
                // NA KANAŁ GBANY
    
                const e_gbanChn = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Zbanowano globalnie", "https://upload.wikimedia.org/wikipedia/commons/1/14/Ban_sign.png")
                .addFields(
                    {
                        name: "Zbanowany",
                        value: `${uzytkownik} (\`${uzytkownik.id}\`)`
                    },
                    {
                        name: "Powód",
                        value: powod
                    },
                    {
                        name: "Moderator",
                        value: message.author
                    }
                )
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                client.guilds.cache.get("765944077253476413").channels.cache.get("766300875236048896").send(e_gbanChn)
    
                // DO USERA
                try {
                    const e_user = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Zostałeś globalnie zbanowany", "https://upload.wikimedia.org/wikipedia/commons/1/14/Ban_sign.png")
                    .addFields(
                        {
                            name: "Powód",
                            value: powod
                        },
                        {
                            name: "Moderator",
                            value: message.author
                        }
                    )
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    client.users.cache.get(uzytkownik.id).send(e_user)
                } catch (err) {
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Informacja", "https://upload.wikimedia.org/wikipedia/commons/1/14/Ban_sign.png")
                    .setDescription(`Niestety, nie mogę wysłać prywatnej wiadomości do tego użytkownika.`)
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ten użytkownik jest już globalnie zbanowany")
        } else if (akcja === "usuń" || akcja === "usun" || akcja === "remove") {
            const gbanstatus = await client.globalBans.get(`gban-${uzytkownik.id}-status`) || "Brak bana"
            if (gbanstatus === "Globalnie zbanowany") {
                await client.globalBans.set(`gban-${uzytkownik.id}-status`, "Brak bana")
                await client.globalBans.set(`gban-${uzytkownik.id}-reason`, "none")
                await client.globalBans.set(`gban-${uzytkownik.id}-mod-id`, message.author.id)
                        
                // MESS CHN

                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Sukces", "https://upload.wikimedia.org/wikipedia/en/6/66/Ban_green_sign.png")
                .setDescription(`Pomyślnie odbanowano globalnie użytkownika ${uzytkownik}.`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);

                // NA KANAŁ GBANY
        
                const e_gbanChn = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Odbanowano globalnie", "https://upload.wikimedia.org/wikipedia/en/6/66/Ban_green_sign.png")
                .addFields(
                    {
                        name: "Odbanowany",
                        value: `${uzytkownik} (\`${uzytkownik.id}\`)`
                    },
                    {
                        name: "Powód",
                        value: powod
                    },
                    {
                        name: "Moderator",
                        value: message.author
                    }
                )
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                client.guilds.cache.get("765944077253476413").channels.cache.get("766300875236048896").send(e_gbanChn)

                // DO USERA
                try {
                    const e_user = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Zostałeś globalnie odbanowany", "https://upload.wikimedia.org/wikipedia/en/6/66/Ban_green_sign.png")
                    .addFields(
                        {
                            name: "Powód",
                            value: powod
                        },
                        {
                            name: "Moderator",
                            value: message.author
                        }
                    )
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    client.users.cache.get(uzytkownik.id).send(e_user)
                } catch (err) {
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor("Informacja", "https://upload.wikimedia.org/wikipedia/en/6/66/Ban_green_sign.png")
                    .setDescription(`Niestety, nie mogę wysłać prywatnej wiadomości do tego użytkownika.`)
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            } else return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Ten użytkownik nie jest globalnie zbanowany")
        } else if (akcja === "sprawdz" || akcja === "sprawdz" || akcja === "check") {
            const gbanstatus = await client.globalBans.get(`gban-${uzytkownik.id}-status`) || "Brak bana"
            if (gbanstatus === "Globalnie zbanowany") {
                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Gban Check", "https://upload.wikimedia.org/wikipedia/commons/f/f6/Lol_question_mark.png")
                .setDescription(`Ten użytkownik **JEST** globalnie zbanowany!`)
                .addFields(
                    {
                        name: "Powód",
                        value: await client.globalBans.get(`gban-${uzytkownik.id}-reason`) || "Nie podano powodu"
                    },
                    {
                        name: "Moderator",
                        value: `<@${await client.globalBans.get(`gban-${uzytkownik.id}-mod-id`)}>`
                    }
                )
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);
            } else {
                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor("Gban Check", "https://upload.wikimedia.org/wikipedia/commons/f/f6/Lol_question_mark.png")
                .setDescription(`Ten użytkownik **NIE JEST** globalnie zbanowany!`)
                .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);
            }
        }
    } 
}
