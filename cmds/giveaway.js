const ms = require("ms")

module.exports = {
    name: "giveaway",
    description: "Tworzy nowy giveaway.",
    aliases: ["gcreate", "gstart"],
    category: "Przydatne",
    usage: "<czas, np. 3h> [kanał] <nagroda>",

    async run(message, args, client) {
      if (!message.member.hasPermission("MANAGE_GUILD")) return client.functions.permissionError(message.channel, "Zarządzanie serwerem")
      const czas = args[0]
      const kanal = message.mentions.channels.first()
      const zwycięzcy = args[2]
      const nagroda = args.slice(3).join(" ")
      function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
      if (
        !czas || !zwycięzcy || !nagroda
      ) {
        client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "giveaway <czas, np. 3h> <kanał> <liczba zwycięzców> <nagroda>")
      } else if (
        !czas.endsWith("d") &&
        !czas.endsWith("h") &&
        !czas.endsWith("m")
      ) {
        client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Argument \`<czas>\` musi być zakończony na \`m\` (minuty), \`h\` (godziny) albo \`d\` (dni)")
      } else if (!zwycięzcy.endsWith("w")) {
        client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Argument \`<liczba zwycięzców>\` musi być zakończony na \`w\` (liczba zwycięzców)")
      } else if (zwycięzcy.replace("w", "").length > 2) {
        client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz podać liczby zwycięzców większej niż 99")
      } else if (zwycięzcy.endsWith("w") && !checkN(zwycięzcy.replace("w", "")) && zwycięzcy.replace("w", "").length === 0) {
        client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Podaj prawidłową liczbę zwycięzców zakończoną na \`w\`")
      } else if (czas.endsWith("m") && czas.replace("m", "") > 10080 || czas.endsWith("h") && czas.replace("h", "") > 168 || czas.endsWith("d") && czas.replace("d", "") > 7) {
        client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie możesz tworzyć konkursów dłuższych niż tydzień")
      } else try {
          client.giveaways.start(kanal, {
            time: ms(czas),
            prize: nagroda,
            winnerCount: zwycięzcy.replace("w", ""),
            hostedBy: message.author,
            messages: {
                giveaway: ":tada: **Nowy giveaway**",
                giveawayEnded: ":tada: **Konkurs został zakończony!**",
                timeRemaining: ":clock230: Giveaway zostanie zakończony za: **{duration}**",
                inviteToParticipate: "<:h_:766927241585360907> Aby dołączyć do konkursu dodaj reakcję :tada:.",
                winMessage: ":tada: Gratulacje {winners}, wygrałeś / -liście **{prize}**!",
                noWinner: ":no_entry_sign: Nikt nie wziął udziału w konkursie lub zareagowała za mała ilość osób!",
                embedFooter: "Ten konkurs jest obsługiwany przez bota Zine",
                hostedBy: ":outbox_tray: Stworzony przez {user}",
                winners: ":bust_in_silhouette: Zwycięzca / -y: ",
                endedAt: "Konkurs został zakończony: ",
                units: {
                    seconds: "sekund",
                    minutes: "minut",
                    hours: "godzin",
                    days: "dni",
                    pluralS: false
                },
            }
        })
        if (kanal.id != message.channel.id) message.channel.send(`Pomyślnie stworzono nowy konkurs na kanale ${kanal}.`);
    } catch (err) { client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err) }
  }
}