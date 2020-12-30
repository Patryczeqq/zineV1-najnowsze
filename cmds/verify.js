const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "verify",
    descriptionpl: "Komenda do weryfikacji",
    descriptionen: "Verification command",
    aliases: ["ver"],
    category: "Weryfikacja",
    requiredBotPerms: ["MANAGE_ROLES", "EMBED_LINKS", "MANAGE_MESSAGES"],
    
    async run(message, args, client) {
        const prefix = await client.config.get(`guild-${message.guild.id}-prefix`) || "-"
        const vermod = await client.config.get(`config-${message.guild.id}-verificationModule`) || "off"
        const verchn = await client.config.get(`config-${message.guild.id}-verificationChannel`)
        const profileVer = await client.verification.get(`user-${message.author.id}-on-${message.guild.id}-isVerified`) || "false"
        if (vermod != "on") {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `You need to enable the verification module first\nTo do this use: \`${prefix}config set verificationModule tak\``, `Musisz wpierw włączyć moduł weryfikacji\nAby to zrobić użyj: \`${prefix}skonfiguruj set verificationModule tak\``))
        } else if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "I need permission \`Manage roles\`", "Potrzebuję permisji \`Zarządzanie rolami\`"))
        } else if (profileVer != "false") {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "You are already verified", "Jesteś już zweryfikowany"))
        } else if (message.channel.id != `${verchn}`.replace("<#", "").replace(">", "")) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, `You can only verify yourself on the ${verchn} channel`, `Zweryfikować się możesz tylko na kanale ${verchn}`))
        } else try {
            const kanal = message.channel
            let getData = async () => {
                let odpowiedz = await axios.get(`http://api.aleks.ovh/captcha/gen/${Math.floor(Math.random() * (6 - 1)) + 1}.html`)
                let img = odpowiedz.data
                return img
            }
            let data = await getData()
            let att = new Discord.MessageAttachment(data.img, "img.png")
            const e = new MessageEmbed()
            .setColor("#75FF67")
            .setAuthor(client.langManager.handleLanguage(message, "Verify", "Weryfikacja"), "https://image.flaticon.com/icons/png/512/891/891399.png")
            .setDescription(client.langManager.handleLanguage(message, "To verify yourself, enter the code from the picture.", "Aby się zweryfikować przepisz kod z obrazka."))
            .attachFiles(att)
            .setImage("attachment://img.png")
            .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
            const emsg = await kanal.send(e);
            let i = 0
            const cl = kanal.createMessageCollector((b) => b.author.id == message.author.id)
            function spij (ms) {
                var s = new Date().getTime()
                for (let i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - s) > ms) break
                }
            }
            cl.on("collect", async (msg) => {
                if (msg.content.toLowerCase() != data.code) {
                    i++
                    if (i > 3) {
                        message.delete()
                        msg.delete()
                        return cl.stop("err_code")
                    } else {
                        msg.delete()
                        const err = new MessageEmbed()
                        .setAuthor(client.langManager.handleLanguage(message, "Verify", "Weryfikacja"), "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
                        .setDescription(client.langManager.handleLanguage(message, "Invalid verification code", "Nieprawidłowy kod weryfikacji"))
                        .setFooter(client.langManager.handleLanguage(message, "Captcha code will be shown in 5 seconds", "Kod captchy zostanie pokazany za 5 sekund"))
                        .setColor(0xFF3F3F)
                        emsg.delete()
                        const v = await message.channel.send(err)
                        spij(10000)
                        v.delete()
                        message.channel.send(e)
                    }
                } else {
                    msg.delete()
                    message.delete()
                    cl.stop("koniec")
                }
            })
            cl.on("end", async (cltd, res) => {
                if (res === "err_code") {
                    const emb = new MessageEmbed()
                    .setAuthor(client.langManager.handleLanguage(message, "Verify", "Weryfikacja"), "https://www.freeiconspng.com/thumbs/error/red-circular-image-error-0.png")
                    .setDescription(client.langManager.handleLanguage(message, "You haven't been verified", "Nie zostałeś zweryfikowany"))
                    .setFooter(client.langManager.handleLanguage(message, "You will be kicked from the server in 5 seconds", "Zostaniesz wyrzucony z serwera za 5 sekund"))
                    .setColor(0xFF3F3F)
                    emsg.delete()
                    const v2 = await message.channel.send(emb)
                    spij(10000)
                    v2.delete()
                    await message.guild.members.cache.get(message.author.id).kick(client.langManager.handleLanguage(message, "Not verifying", "Niezweryfikowanie się"))
                } else {
                    const ranga = await client.config.get(`config-${message.guild.id}-verificationRole`)
                    const emb = new MessageEmbed()
                    .setAuthor(client.langManager.handleLanguage(message, "Verify", "Weryfikacja"), "https://image.flaticon.com/icons/png/512/891/891399.png")
                    .setDescription(client.langManager.handleLanguage(message, "Verified succesfully", "Pomyślnie zweryfikowano"))
                    .setColor(0xFFC961)
                    await client.verification.set(`user-${message.author.id}-on-${message.guild.id}-isVerified`, "true")
                    await message.member.roles.add(`${ranga}`.replace("<@&", "").replace(">", ""))
                    emsg.delete()
                    message.channel.send(emb).then(msg => msg.delete({ timeout: 7000 }))
                }
            })
        } catch (err) { client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err) }
    }
}