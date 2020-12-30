const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "mem",
    description: "Losowy polski mem.",
    aliases: ["meme"],
    category: "Zabawa",

    async run(message, args, client) {
        const url = [
            'https://img1.demotywatoryfb.pl//uploads/201804/1524137093_awc0bd_600.jpg',
            'https://img3.demotywatoryfb.pl//uploads/201610/1475766218_0bs3uf_600.jpg',
            'https://img14.dmty.pl//uploads/201507/1437575496_odlofx_600.jpg',
            'https://img3.dmty.pl//uploads/201911/1573123939_oa6qi9_600.jpg',
            'https://img22.dmty.pl//uploads/201601/1452600940_uha1ll_600.jpg',
            'https://img18.dmty.pl//uploads/201409/1411065754_ig3kpk_600.jpg',
            'https://img13.demotywatoryfb.pl//uploads/201604/1459788466_amrtth_600.jpg',
            'https://img16.dmty.pl//uploads/201309/1379948967_mjr7ol_600.jpg',
            'https://img13.demotywatoryfb.pl//uploads/201304/1367358756_bozxir_600.jpg',
            'https://img4.dmty.pl//uploads/201411/1415291692_0jzq7y_600.jpg',
            'https://img1.demotywatoryfb.pl//uploads/201902/1549270468_fubteq_600.jpg',
            'https://img15.demotywatoryfb.pl//uploads/201406/1401971340_n3lziv_600.jpg',
            'https://img22.dmty.pl//uploads/201607/1469132386_xkxuf0_600.jpg'
        ]
        const a = Math.floor(Math.random() * url.length) + 1
        const e = new MessageEmbed()
		.setColor("#75FF67")
        .setAuthor(`Mem`, "https://ddob.com/uploads/i_n_n_a/69866de0759af10117ae993dd43ea1f8.png")
        .setImage(url[a])
		.setFooter(`Memy pochodzą z serwisu Demotywatory / Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e)
	}
}