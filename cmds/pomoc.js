const { MessageEmbed } = require("discord.js")
const pag = require("discord.js-reaction-menu")

module.exports = {
    name: "pomoc",
	description: "Lista wszystkich komend",
	aliases: ["h", "help", "cmd", "cmds", "cmdlist", "commandlist", "lista", "listakomend"],
	usage: "[komenda]",
	botPermissions: ["ADD_REACTIONS", "SEND_MESSAGES"],
	category: "Informacyjne",

    async run(message, args, client) {
        const prefix = await client.config.get(`guild-${message.guild.id}-prefix`) || "-"
        if (args[0]) {
			const komenda = client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(args[0]),
			) || client.commands.get(args[0])
			if (!komenda || komenda.category === "Tajne") return client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, `Nie znaleziono komendy o nazwie lub aliasie \`${args[0]}\``)
			const cmdSettings = await client.config.get(`cmd-${komenda.name}-isDisabled`) || "disabled"
			const cmdSettings_guild = await client.config.get(`cmd-${komenda.name}-on-${message.guild.id}-isDisabled`) || "disabled"
			const cmdSettings_chn = await client.config.get(`cmd-${komenda.name}-on-${message.channel.id}-isDisabled`) || "disabled"
			const cmdSettings_global = await client.config.get(`cmd-all-isDisabled`) || "disabled"
			const allCmdOnGuild = await client.config.get(`cmd-all-on-${message.guild.id}-isDisabled`) || "disabled"
			const allCmdOnChannel = await client.config.get(`cmd-all-on-${message.channel.id}-isDisabled`) || "disabled"
			
			let disabled = false
			if (
				cmdSettings === true || 
				cmdSettings === null || 
				cmdSettings_guild === true || 
				cmdSettings_guild === null || 
				cmdSettings_chn === true || 
				cmdSettings_chn === null || 
				cmdSettings_global === true || 
				cmdSettings_global === null || 
				allCmdOnChannel === true || 
				allCmdOnChannel === null || 
				allCmdOnGuild === true || 
				allCmdOnGuild === null
			) disabled = true

			const aliasy = komenda.aliases
			embed = new MessageEmbed()
			.setColor("#F0FF6E")
			.setAuthor("Szczegółowe informacje o komendzie", "https://cdn.discordapp.com/emojis/758701017117229097.png?v=1")
			.setDescription("<> - argument obowiązkowy\n[] - argument opcjonalny\n| - argument jednokrotnego wyboru")
			.addField("Nazwa", komenda.name)
			.addField("Opis", komenda.description || "Brak")
			.addField("Kategoria", komenda.category || "Inna")
			.addField("Wyłączona?", `${disabled || "Nie"}`.replace(false, "Nie").replace(true, "Tak"))
			.addField("Aliasy", aliasy ? aliasy.join(", ") : aliasy || "Brak aliasów")
			.addField("Użycie komendy", komenda.usage || "Brak")
			.setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
	  
            return message.channel.send(embed);
        } else {
			const glowny = new MessageEmbed()
			.setColor("#58ABFF")
			.setAuthor("Potrzebujesz pomocy?", "https://cdn.discordapp.com/emojis/758701017117229097.png?v=1")
			.setDescription(`Witaj w interaktywnym menu pomocy!\nZnajdziesz tu niezbędne informacje na temat wszystkich komend bota.`)
			.addField("Informacje", `Prefix bota: \`${prefix}\`\nIlość komend: **${client.commands.size}**\nInformacje o konkretnej komendzie: ${prefix}pomoc <komenda>\n\nAby poruszać się pomiędzy poszczególnymi stronami komend użyj reakcji.`, false)
			
			const p1 = new MessageEmbed()
			.setAuthor("Potrzebujesz pomocy?", "https://cdn.discordapp.com/emojis/758701017117229097.png?v=1")
			.addFields(
				{
					name: ":no_entry_sign: Moderacja",
					value: client.commands.filter(cmd => cmd.category === "Moderacja").map(cmd => `\`${cmd.name}\``).join(", ")
				},
				{
					name: "<:partner:766927327731908639> **Przydatne**",
					value: client.commands.filter(cmd => cmd.category === "Przydatne").map(cmd => `\`${cmd.name}\``).join(", ")
				},
				{
					name: "<:zabawa:766927241657319425> **4FUN**",
					value: client.commands.filter(cmd => cmd.category === "Zabawa").map(cmd => `\`${cmd.name}\``).join(", ")
				},
				{
					name: "<:h_:766927241585360907> **Informacyjne**",
					value: client.commands.filter(cmd => cmd.category === "Informacyjne").map(cmd => `\`${cmd.name}\``).join(", ")
				},
				{
					name: "<:kasa:773063794041552916> **Ekonomia**",
					value: client.commands.filter(cmd => cmd.category === "Ekonomia").map(cmd => `\`${cmd.name}\``).join(", ")
				},
				{
					name: "<:zweryfikowany:766927244563447848> **Weryfikacja**",
					value: client.commands.filter(cmd => cmd.category === "Weryfikacja").map(cmd => `\`${cmd.name}\``).join(", ")
				},
				{
					name: "<:tada:778225901056819230> **Giveaway**",
					value: client.commands.filter(cmd => cmd.category === "Giveaway").map(cmd => `\`${cmd.name}\``).join(", ")
				},
				{
					name: "<:nsfw:779309387705614347> **NSFW**",
					value: client.commands.filter(cmd => cmd.category === "NSFW").map(cmd => `\`${cmd.name}\``).join(", ")
				}
			)
			.setColor("#58ABFF")

			const cmdc = ["Moderacja", "Przydatne", "Zabawa", "Informacyjne", "Ekonomia", "Weryfikacja", "Developerskie", "Giveaway", "Tajne", "NSFW"]

			const p2 = new MessageEmbed()
			.setAuthor("Potrzebujesz pomocy?", "https://cdn.discordapp.com/emojis/758701017117229097.png?v=1")
			.addFields(
				{
					name: "<:verifiedbotdeveloper:766927327472123927> **Developerskie**",
					value: client.commands.filter(cmd => cmd.category === "Developerskie").map(cmd => `\`${cmd.name}\``).join(", ")
				},
				{
					name: "<:none:776784945720328232> **Bez kategorii / Kategoria nieokreślona**",
					value: client.commands.filter(cmd => !cmdc.includes(cmd.category)).map(cmd => `\`${cmd.name}\``).join(", ") || "Brak"
				}
			)
			.setColor("#58ABFF")
			new pag.menu({
				channel: message.channel,
				userID: message.author.id,
				pages: [
					glowny,
					p1,
					p2
				],
				time: 120000
			})

			/* Reakcje */
			pag.reactions.first = "⏪"
			pag.reactions.back = "⬅"
			pag.reactions.next = "➡"
			pag.reactions.last = "⏩"
        }
	}
}