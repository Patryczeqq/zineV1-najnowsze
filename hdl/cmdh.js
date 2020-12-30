const Discord = require("discord.js")
const { readdirSync } = require("fs")
const chalk = require("chalk")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const { Collection } = require("discord.js")
const { GiveawaysManager } = require("discord-giveaways")
const config = require("../config.json")
const utils = require("../fnc/funkcje.js")

module.exports = async (client) => {
  class langManager {
    setLang (msg, newLang) {
      db.set(`config-${msg.guild.id}-lang`, newLang)
      return newLang
    }
    getLang (msg) {
      const lang = db.get(`config-${msg.guild.id}-lang`)
      return lang
    }
    handleLanguage (msg, enMessage, plMessage) {
      const lang = db.get(`config-${msg.guild.id}-lang`) || "en"
      if (lang === "en") return enMessage
      else return plMessage
    }
  }
  client.lang = db
  client.langManager = new langManager()
  client.commands = new Collection()
  const cooldowns = new Collection()
  const plikiKomend = readdirSync(__dirname + "/../cmds").filter((file) =>
    file.endsWith(".js"),
  )

  for (const file of plikiKomend) {
    const komenda = require(__dirname + `/../cmds/${file}`)
    if (komenda.name) {
      client.commands.set(komenda.name, komenda)
      console.log(`${chalk.red("➔")} ${chalk.white(" Załadowano komendę")} ${chalk.yellowBright(chalk.bold(komenda.name))} ${chalk.white(`(aliasy: ${chalk.cyan(komenda.aliases ? komenda.aliases.join(", ") : "Brak")})`)}`)
    } else { console.log(`${chalk.red("➔")} ${chalk.white(" Nie załadowano komendy")}`) }
  }
  /*
      GIVEAWAYE
  */
    if (!db.get("konkursy")) db.set("konkursy", [])
    const gvm = class extends GiveawaysManager {
      async getAllGiveaways() {
          return db.get("konkursy")
      }
      async saveGiveaway(msgID, data) {
          db.push("konkursy", data)
          return true
      }
      async editGiveaway(msgID, data) {
          const allgv = db.get("konkursy")
          const newGvA = allgv.filter((gv) => gv.messageID !== msgID)
          newGvA.push(data)
          db.set("konkursy", newGvA)
          return true
        }
      async deleteGiveaway(msgID) {
          const newGvA = db.get("konkursy").filter((gv) => gv.messageID !== msgID);
          db.set("konkursy", newGvA);
          return true
      }
  }
  const manager = new gvm(client, {
    storage: false,
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "#FFC961",
        embedColorEnd: "#FF0000",
        reaction: "🎉"
    }
  })
  client.giveaways = manager

  /*
      ON MESSAGE
  */
  client.on("message", async message => {
    /*
        SETTINGS - USTAWIENIA
    */
    client.embedFooter = client.langManager.handleLanguage(message, `Invoked by ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`)
    const prefix = await db.get(`guild-${message.guild.id}-prefix`) || "-"
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmdName = args.shift().toLowerCase()
    const cmd =
      client.commands.get(cmdName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(cmdName),
    )
    /*
        MENTION REACT
    */
    const mntn = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (mntn.test(message.content)) {
        let e = new MessageEmbed()
        .setColor("#58ABFF")
        .setAuthor(client.langManager.handleLanguage(message, "Mention detected", "Wykryto wzmiankę"), "https://cdn.discordapp.com/emojis/758701017117229097.png?v=1")
        .setDescription(`Prefix komend: \`${prefix}\`\nŁączna ilość komend: **${client.commands.size}**\nKomenda pomocy: ${prefix}pomoc\nMój **ping** to: ${client.ws.ping}ms.`)
        .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e)
    }
    if (!cmd) return
    const cmdSettings = await db.get(`cmd-${cmd.name}-isDisabled`) || "disabled"
    const cmdSettings_guild = await db.get(`cmd-${cmd.name}-on-${message.guild.id}-isDisabled`) || "disabled"
    const cmdSettings_chn = await db.get(`cmd-${cmd.name}-on-${message.channel.id}-isDisabled`) || "disabled"
    const cmdSettings_global = await db.get(`cmd-all-isDisabled`) || "disabled"
    const allCmdOnGuild = await db.get(`cmd-all-on-${message.guild.id}-isDisabled`) || "disabled"
    const allCmdOnChannel = await db.get(`cmd-all-on-${message.channel.id}-isDisabled`) || "disabled"
    const res = await db.get(`cmd-${cmd.name}-reason`) || "Nie podano"
    const res_g = await db.get(`cmd-${cmd.name}-on-${message.guild.id}-reason`) || "Nie podano"
    const res_c = await db.get(`cmd-${cmd.name}-on-${message.channel.id}-reason`) || "Nie podano"
    const res_global = await db.get(`cmd-all-reason`) || "Nie podano"
    const res_all_guild = await db.get(`cmd-all-on-${message.guild.id}-reason`) || "Nie podano"
    const res_all_channel = await db.get(`cmd-all-on-${message.channel.id}-reason`) || "Nie podano"
    
    // Globalnie
    if (message.content.startsWith(prefix) && cmdSettings_global != "disabled" && cmd.name !== "command" && cmd.name !== "eval" && !config.devs.allowed.includes(message.author.id)) {
      if (cmdSettings_global === "disabled" || cmdSettings_global === true) return utils.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `All commands have been disabled by the bot owner\nReason: \`${res_global}\``, `Wszystkie komendy zostały wyłączone przez właściciela bota\nPowód: \`${res_global}\``))
    }
    // Pojedynczo
    if (message.content.startsWith(prefix) && cmdSettings != "disabled" && cmd.name !== "command" && cmd.name !== "eval" && !config.devs.allowed.includes(message.author.id)) {
      if (cmdSettings === "disabled" || cmdSettings === true) return utils.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `This command is disabled\nReason: ${res}`, `Ta komenda jest aktualnie wyłączona\nPowód: \`${res}\``))
    }
    // Na serwerze, jedna komenda
    if (message.content.startsWith(prefix) && cmdSettings_guild != "disabled" && cmd.name !== "command" && cmd.name !== "eval" && !config.devs.allowed.includes(message.author.id)) {
      if (cmdSettings_guild === "disabled" || cmdSettings_guild === true) return utils.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `This command is currently disabled on this server\nReason: ${res_g}`, `Ta komenda jest aktualnie wyłączona na tym serwerze\nPowód: \`${res_g}\``))
    }
    // Na kanale, jedna komenda
    if (message.content.startsWith(prefix) && cmdSettings_chn != "disabled" && cmd.name !== "command" && cmd.name !== "eval" && !config.devs.allowed.includes(message.author.id)) {
      if (cmdSettings_chn === "disabled" || cmdSettings_chn === true) return utils.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `This command is currently disabled on this channel\nReason: ${res_c}`, `Ta komenda jest aktualnie wyłączona na tym kanale\nPowód: \`${res_c}\``))
    }
    // Na serwerze, WSZYSTKIE komendy
    if (message.content.startsWith(prefix) && allCmdOnGuild != "disabled" && cmd.name !== "command" && cmd.name !== "eval" && !config.devs.allowed.includes(message.author.id)) {
      if (allCmdOnGuild === "disabled" || allCmdOnGuild === true) return utils.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `All commands on this server have been disabled by the administrator\nReason: ${res_all_guild}`, `Wszystkie komendy na tym serwerze zostały wyłączone przez administratora\nPowód: \`${res_all_guild}\``))
    }
    // Na kanale, WSZYSTKIE komendy
    if (message.content.startsWith(prefix) && allCmdOnChannel != "disabled" && cmd.name !== "command" && cmd.name !== "eval" && !config.devs.allowed.includes(message.author.id)) {
      if (allCmdOnChannel === "disabled" || allCmdOnChannel === true) return utils.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `All commands on this channel have been disabled by the administrator\nReason: ${res_all_channel}`, `Wszystkie komendy na tym kanale zostały wyłączone przez administratora\nPowód: \`${res_all_channel}\``))
    }
    if (!message.content.startsWith(prefix)) return

    /* 
        GLOBALNE BANY
    */
    const gban = await db.get(`gban-${message.author.id}-status`) || "Brak bana"
    if (cmd && gban === "Globalnie zbanowany" && cmd.name != "verify") {
        const powod = await db.get(`gban-${message.author.id}-reason`) || "Nie podano powodu"
        const modid = await db.get(`gban-${message.author.id}-mod-id`) || "Wystąpił błąd"

        let err = new Discord.MessageEmbed()
        .setAuthor(client.langManager.handleLanguage(message, "Global ban", "Globalny ban"), "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
        .setDescription(client.langManager.handleLanguage(message, "You have been globally banned and you cannot use __any__ bot commands.", "Zostałeś globalnie zbanowany, wskutek czego nie możesz użyć __żadnej__ komendy bota"))
        .addFields(
            {
                name: client.langManager.handleLanguage(message, "Reason", "Powód"),
                value: powod
            },
            {
                name: "Moderator",
                value: `<@${modid}>`
            }
        )
        .setColor(0xFF3F3F)
        return message.channel.send(err)
    }

      /*
          COOLDOWN
      */

     if (!cooldowns.has(cmdName)) {
      cooldowns.set(cmdName, new Collection())
    }
    const now = Date.now();
    var timestamps = cooldowns.get(cmdName);
    const czas = (cmd.cooldown || 0) * 1000;
    if (timestamps.has(message.author.id)) {
        koniec = timestamps.get(message.author.id) + czas;
        if (now < koniec)
            jeszcze = (koniec - Date.now())
            if((jeszcze / 1000).toFixed() > 59) { 
            a = ((jeszcze / 1000) / 60).toFixed()
            function aa(czas) {
                var pad = function(num, size) { return ('000' + num).slice(size * -1); },
                time = parseFloat(czas).toFixed(3),
                minutes = Math.floor(time / 60) % 60,
                seconds = Math.floor(time - minutes * 60);

               return pad(minutes, 2) + client.langManager.handleLanguage(message, " minutes and ", " minut i ") + pad(seconds, 2) + client.langManager.handleLanguage(message, " seconds", " sekund")
        }
        let e = new Discord.MessageEmbed()
          .setAuthor(client.langManager.handleLanguage(message, "Command cooldown", "Ograniczenie czasowe komendy"), "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
          .setDescription(client.langManager.handleLanguage(message, `To use this command again you have to wait ${aa(jeszcze / 1000)}.`, `Aby użyć tą komendę ponownie musisz odczekać ${aa(jeszcze / 1000)}.`))
          .setColor(0xFF3F3F)
        let e2 = new Discord.MessageEmbed()
          .setAuthor(client.langManager.handleLanguage(message, "Command cooldown", "Ograniczenie czasowe komendy"), "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
          .setDescription(client.langManager.handleLanguage(message, `To use this command again you have to wait ${(jeszcze / 1000).toFixed()} seconds.`, `Aby użyć tą komendę ponownie musisz odczekać ${(jeszcze / 1000).toFixed()} sekund.`))
          .setColor(0xFF3F3F)
          return message.channel.send(e)
        } else {
            return message.channel.send(e2)
          }  
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), czas);  

      /*
        PERMISJE - SPRAWDZANIE 
      */
     const clientPerms = message.guild.member(client.user)
     if (cmd.requiredBotPerms) {
       if (!clientPerms.hasPermission(cmd.requiredBotPerms)) return utils.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `I don't have required permissions\nRequired permissions: \`${cmd.requiredBotPerms}\``, `Nie posiadam wymaganych uprawnień do wykonania tej komendy\nWymagane uprawnienia: \`${cmd.requiredBotPerms}\``))
     }

     /* 
        IS NSFW
    */
     if (cmd.requireNSFW === true && message.channel.nsfw === false) return utils.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "This command can only be used on NSFW channels", "Ta komenda może być użyta tylko na kanałach NSFW"))
     
     
      client.functions = utils
      client.config = db
      client.profiles = db
      client.cmdSettings = db
      client.globalBans = db
      client.badges = db
      client.verification = db
      /*
        ODPALANIE KOMENDY
      */

      try {
        cmd.run(message, args, client)
      } catch { return }
  })
}