const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "bosak",
    description: "Randomowe zdjęcie Krzysztofa Bosaka",
    aliases: ["konfederacja"],
    category: "Zabawa",

    async run(message, args, client) {
        const url = [
            'https://pbs.twimg.com/profile_images/1252656911754964999/n5oKYr3d.jpg',
            'https://www.radiowroclaw.pl/img/articles/95955/Y0II867O1N.jpg',
            'https://www.rp.pl/apps/pbcsi.dll/storyimage/RP/20200623/KRAJ/200629744/AR/0/AR-200629744.jpg?imageversion=Artykul',
            'https://g.gazetaprawna.pl/p/_wspolne/pliki/4572000/4572656-657-323.jpg',
            'https://pliki.parlamentarny.pl/i/05/33/29/053329_r2_940.jpg',
            'https://i.iplsc.com/krzysztof-bosak/0009CY0LI8OOF4A3-C122-F4.jpg', 
            'https://biznes.wprost.pl/_thumb/bf/4b/bf8cb8a194796c59e1f6c53bd252.jpeg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8uEKDEWkJg_tphc51_lrWgpO2JMfnla3ddQ&usqp=CAU',
            'https://g.gazetaprawna.pl/p/_wspolne/pliki/4557000/4557379-krzysztof-bosak-bus-657-323.jpg',
            'https://www.pap.pl/sites/default/files/styles/main_image/public/202006/pap_20200607_0A5.jpg?h=2e389706&itok=h9NC3mkc', 
            'https://i.iplsc.com/krzysztof-bosak/000A808D3A8AS6HT-C123-F4.jpg',
            'https://bi.im-g.pl/im/3c/df/18/z26081852IER,Krzysztof-Bosak.jpg'
        ]
        const l = Math.floor(Math.random() * url.length)
        const e = new MessageEmbed()
		.setColor("#75FF67")
        .setAuthor("Krzysztof Bosak", "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
        .setImage(url[l])
		.setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
	}
}