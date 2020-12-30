const { MessageEmbed } = require("discord.js")
const pogoda = require("weather-js")

module.exports = {
    name: "pogoda",
    description: "Pokazuje pogodę w danym mieście",
    category: "Przydatne",
    usage: "<tekst>",
    
    async run(message, args, client) {
        const miasto = args.join(" ")
        if (!miasto) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, "pogoda <miasto>")
        } else try {
            pogoda.find({ search: miasto, degreeType: "C" }, function (err, res) {
                if (res.length === 0) {
                    client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, "Nie znaleziono takiego miasta")
                } else {
                    const cr = res[0].current
                    const loc = res[0].location
                    const e = new MessageEmbed()
                    .setColor("#75FF67")
                    .setAuthor(`Pogoda w mieście ${miasto}`, "https://images.squarespace-cdn.com/content/v1/5572b7b4e4b0a20071d407d4/1487090874274-FH2ZNWOTRU90UAF5TA2B/ke17ZwdGBToddI8pDm48kCMWMBFcqQftRz-JqZZoIB5Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFI99ncPZu898P4WAmVYNBp8mgB1qWbp5RirnU_Xvq-XCb8BodarTVrzIWCp72ioWw/Weather+Targeting")
                    .addFields(
                        {
                            name: "Temperatura",
                            value: cr.temperature + "°C"
                        },
                        {
                            name: "Temperatura odczuwalna",
                            value: cr.feelslike + "°C"
                        },
                        {
                            name: "Wilgotność",
                            value: cr.humidity + "%"
                        },
                        {
                            name: "Strefa czasowa",
                            value: `UTC ${loc.timezone}`
                        },
                        {
                            name: "Wiatr",
                            value: `${cr.winddisplay}`
                            .replace(/West/g, "zachodni")
                            .replace(/East/g, "wschodni")
                            .replace(/North/g, "północny")
                            .replace(/South/g, "południowy")
                        }
                    )
                    .setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send(e);
                }
            })
        } catch (err) {
            return client.functions.errorMsg(client, "CriticalError", message.channel, message.guild.id, err)
        }
	}
}