const Discord = require("discord.js")

module.exports = {
    name: "profil",
    description: "Pokazuje Twój profil lub go edytuje.",
    aliases: ["profile", "userprofile", "prf"],
    category: "Przydatne",
    usage: "<create / show / edit> [imie / wiek / status / youtube / github / instagram / facebook / whatsapp] [nowa treść]", 

    async run(message, args, client) {
        const akcja = args[0]
        const opcja = args[1]
        const ust = [...args].slice(2).join(" ")
        const profil = await client.profiles.get(`profile-${message.author.id}-hasOwnProfile`)
        if (!akcja) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "profil <create / show / edit> [imie / wiek / status / youtube / github / instagram / facebook / whatsapp] [nowa treść]")
        else if (akcja === "show") try {
            if (!profil) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie posiadasz profilu")
            else {
                const e = new Discord.MessageEmbed()
                .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                .addFields(
                    {
                        name: "Imię",
                        value: await client.profiles.get(`profile-${message.author.id}-name`) || "Nie podano"
                    },
                    {
                        name: "Wiek",
                        value: await client.profiles.get(`profile-${message.author.id}-age`) || "Nie podano"
                    },
                    {
                        name: "Status miłosny",
                        value: `${await client.profiles.get(`profile-${message.author.id}-marriage`)}`.replace("wolny", "Wolny").replace("zajety", "Zajęty").replace(null, "Nie podano") || "Nie podano"
                    },
                    {
                        name: "YouTube",
                        value: await client.profiles.get(`profile-${message.author.id}-youtube`) || "Nie podano"
                    },
                    {
                        name: "GitHub",
                        value: await client.profiles.get(`profile-${message.author.id}-github`) || "Nie podano"
                    },
                    {
                        name: "Instagram",
                        value: await client.profiles.get(`profile-${message.author.id}-instagram`) || "Nie podano"
                    },
                    {
                        name: "Facebook",
                        value: await client.profiles.get(`profile-${message.author.id}-facebook`) || "Nie podano"
                    },
                    {
                        name: "WhatsApp",
                        value: await client.profiles.get(`profile-${message.author.id}-whatsapp`) || "Nie podano"
                    }
                )
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setColor(0x58ABFF)
                message.channel.send(e)
            }
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        } else if (akcja === "create") try {
            if (profil) {
                client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Posiadasz już profil")
            } else {
                await client.profiles.set(`profile-${message.author.id}-hasOwnProfile`, "tak")
                const e = new Discord.MessageEmbed()
                .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                .setDescription(`Pomyślnie stworzono Twój profil. Możesz go zobaczyć pod komendą \`${await client.config.get(`guild-${message.guild.id}-prefix`) || "-"}profil show\`.`)
                .setColor(0x58ABFF)
                message.channel.send(e)
            }
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        } else if (akcja === "edit") try {
            if (!profil) return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie posiadasz profilu")
            else if (!ust || !opcja) return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "profil <show / edit> <imie / wiek / status / youtube / github / instagram / facebook / whatsapp> <nowa treść>")
            else if (opcja === "imie") {
                await client.profiles.set(`profile-${message.author.id}-name`, ust)
                const e = new Discord.MessageEmbed()
                .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                .setDescription(`Pomyślnie ustawiono imię na ${ust}.`)
                .setColor(0x58ABFF)
                message.channel.send(e)
            } else if (opcja === "wiek") {
                function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
                if (!checkN(ust) || wiek < 10 || wiek > 60) {
                    client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłowy wiek")
                } else {
                    await client.profiles.set(`profile-${message.author.id}-age`, ust)
                    const e = new Discord.MessageEmbed()
                    .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                    .setDescription(`Pomyślnie ustawiono wiek na ${ust} lat.`)
                    .setColor(0x58ABFF)
                    message.channel.send(e)
                }
            } else if (opcja === "status") {
                if (ust.toLowerCase() == "wolny" || ust.toLowerCase() == "zajety") {
                    await client.profiles.set(`profile-${message.author.id}-marriage`, ust.toLowerCase())
                    const e = new Discord.MessageEmbed()
                    .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                    .setDescription(`Pomyślnie ustawiono status miłosny na ${ust}.`)
                    .setColor(0x58ABFF)
                    message.channel.send(e)
                } else {
                    client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Możesz wybrać tylko jedną z podanych opcji: \`wolny\`/\`zajety\`")
                }
            } else if (opcja === "youtube") {
                await client.profiles.set(`profile-${message.author.id}-youtube`, ust)
                const e = new Discord.MessageEmbed()
                .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                .setDescription(`Pomyślnie ustawiono konto YouTube na ${ust}.`)
                .setColor(0x58ABFF)
                message.channel.send(e)
            } else if (opcja === "github") {
                await client.profiles.set(`profile-${message.author.id}-github`, ust)
                const e = new Discord.MessageEmbed()
                .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                .setDescription(`Pomyślnie ustawiono konto GitHub na ${ust}.`)
                .setColor(0x58ABFF)
                message.channel.send(e)
            } else if (opcja === "instagram") {
                await client.profiles.set(`profile-${message.author.id}-instagram`, ust)
                const e = new Discord.MessageEmbed()
                .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                .setDescription(`Pomyślnie ustawiono konto Instagram na ${ust}.`)
                .setColor(0x58ABFF)
                message.channel.send(e)
            } else if (opcja === "facebook") {
                await client.profiles.set(`profile-${message.author.id}-facebook`, ust)
                const e = new Discord.MessageEmbed()
                .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                .setDescription(`Pomyślnie ustawiono konto Facebook na ${ust}.`)
                .setColor(0x58ABFF)
                message.channel.send(e)
            } else if (opcja === "whatsapp") {
                await client.profiles.set(`profile-${message.author.id}-whatsapp`, ust)
                const e = new Discord.MessageEmbed()
                .setAuthor("Profil", "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png")
                .setDescription(`Pomyślnie ustawiono konto WhatsApp na ${ust}.`)
                .setColor(0x58ABFF)
                message.channel.send(e)
            } else return client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "profil edit <imie / wiek / status / youtube / github / instagram / facebook / whatsapp> <nowa treść>")
        } catch (err) {
            client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        }
	}
}