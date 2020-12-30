const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "korwin",
    description: "Randomowe zdjęcie Janusza Korwin-Mikkego",
    category: "Zabawa",

    async run(message, args, client) {
        const url = [
            'https://ocdn.eu/pulscms-transforms/1/-dqktkuTURBXy9kZTIyZjI1NS05Nzk0LTQ3MWYtOWFkMS00MWMzYzUyNTM0MjguanBlZ5GTAgDNAeQ',
            'https://r.dcs.redcdn.pl/http/o2/redefine/cp/r4/r45f75aw7ad166ed24bsyqx33xw47gpk.jpg',
            'https://www.rp.pl/apps/pbcsi.dll/storyimage/RP/20190919/KRAJ/309199897/AR/0/AR-309199897.jpg?imageversion=Artykul&lastModified=',
            'https://gfx.wiadomosci.radiozet.pl/var/radiozetwiadomosci/storage/images/polska/janusz-korwin-mikke-komentuje-wyrok-sadu-ws.-wykorzystania-seksualnego-14-latki/8305835-1-pol-PL/Korwin-Mikke-o-wyroku-ws.-seksu-z-14-latka.-Jesli-nie-krzyczy-widac-tego-chce_article.jpg',
            'https://s5.tvp.pl/images2/5/f/f/uid_5ff7fa3b4bae780d992cad9149ff49041578655617850_width_907_play_0_pos_0_gs_0_height_515_korwin-mikke-w-czasie-gdy-pozostali-poslowie-stali-siedzial-na-swoim-miejscu-w-sali-sejmowej-fot-pappawel-supernak.jpg',
            'https://gfx.wiadomosci.radiozet.pl/var/radiozetwiadomosci/storage/images/polska/polityka/janusz-korwin-mikke-ma-problemy-ue-prowadzi-sledztwo-w-jego-sprawie/8428740-1-pol-PL/Janusz-Korwin-Mikke-ma-problemy.-Polityk-zaplaci-2-mln-zl-kary_article.jpg', 
            'https://gfx.antyradio.pl/var/antyradio/storage/images/film/news/janusz-korwin-mikke-nie-zyje-tak-twierdzi-netflix-28277/2018217-1-pol-PL/Janusz-Korwin-Mikke-nie-zyje-Tak-twierdzi-Netflix_article.jpgg',
            'https://i.iplsc.com/janusz-korwin-mikke/000AKBQ8VHUSGTUU-C123-F4.jpg',
            'https://gfx.wiadomosci.radiozet.pl/var/radiozetwiadomosci/storage/images/polska/polityka/janusz-korwin-mikke-zatrudnil-rodzine-na-stanowiskach-asystentow.-maja-wstep-do-sejmu/5466367-1-pol-PL/Zona-corka-i-ziec-Korwin-Mikkego-w-Sejmie.-Chodzi-o-to-by-mieli-wstep-i-tyle_article.jpg',
            'https://g0.gazetaprawna.pl/p/_wspolne/pliki/1837000/1837241-janusz-korwin-mikke-657-323.jpg', 
            'https://img.wprost.pl/img/janusz-korwin-mikke/d8/96/7900d26df2d99fd079a11f8c5d6b.jpeg'
        ]
        const l = Math.floor(Math.random() * url.length)
        const e = new MessageEmbed()
		.setColor("#75FF67")
        .setAuthor("Janusz Korwin-Mikke", "https://cdn.iconscout.com/icon/free/png-512/aparat-569197.png")
        .setImage(url[l])
		.setFooter(`Wywołano na życzenie ${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        message.channel.send(e);
	}
}