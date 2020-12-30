const { MessageEmbed } = require("discord.js")
const tlumacz = require("@k3rn31p4nic/google-translate-api")

module.exports = {
    name: "tłumacz",
    descriptionpl: "Tłumaczy tekst na inny język.",
    descriptionen: "Translates text into another language.",
    category: "Przydatne",
    aliases: ["translate", "tlumacz"],
    usagepl: "<język> <tekst>",
    usageen: "<language <text>",
    
    async run(message, args, client) {
        const jezyki = {
            "auto": "Automatic",
            "af": "Afrikaans",
            "sq": "Albanian",
            "am": "Amharic",
            "ar": "Arabic",
            "hy": "Armenian",
            "az": "Azerbaijani",
            "eu": "Basque",
            "be": "Belarusian",
            "bn": "Bengali",
            "bs": "Bosnian",
            "bg": "Bulgarian",
            "ca": "Catalan",
            "ceb": "Cebuano",
            "ny": "Chichewa",
            "zh-cn": "Chinese Simplified",
            "zh-tw": "Chinese Traditional",
            "co": "Corsican",
            "hr": "Croatian",
            "cs": "Czech",
            "da": "Danish",
            "nl": "Dutch",
            "en": "English",
            "eo": "Esperanto",
            "et": "Estonian",
            "tl": "Filipino",
            "fi": "Finnish",
            "fr": "French",
            "fy": "Frisian",
            "gl": "Galician",
            "ka": "Georgian",
            "de": "German",
            "el": "Greek",
            "gu": "Gujarati",
            "ht": "Haitian Creole",
            "ha": "Hausa",
            "haw": "Hawaiian",
            "iw": "Hebrew",
            "hi": "Hindi",
            "hmn": "Hmong",
            "hu": "Hungarian",
            "is": "Icelandic",
            "ig": "Igbo",
            "id": "Indonesian",
            "ga": "Irish",
            "it": "Italian",
            "ja": "Japanese",
            "jw": "Javanese",
            "kn": "Kannada",
            "kk": "Kazakh",
            "km": "Khmer",
            "ko": "Korean",
            "ku": "Kurdish (Kurmanji)",
            "ky": "Kyrgyz",
            "lo": "Lao",
            "la": "Latin",
            "lv": "Latvian",
            "lt": "Lithuanian",
            "lb": "Luxembourgish",
            "mk": "Macedonian",
            "mg": "Malagasy",
            "ms": "Malay",
            "ml": "Malayalam",
            "mt": "Maltese",
            "mi": "Maori",
            "mr": "Marathi",
            "mn": "Mongolian",
            "my": "Myanmar (Burmese)",
            "ne": "Nepali",
            "no": "Norwegian",
            "ps": "Pashto",
            "fa": "Persian",
            "pl": "Polish",
            "pt": "Portuguese",
            "pa": "Punjabi",
            "ro": "Romanian",
            "ru": "Russian",
            "sm": "Samoan",
            "gd": "Scots Gaelic",
            "sr": "Serbian",
            "st": "Sesotho",
            "sn": "Shona",
            "sd": "Sindhi",
            "si": "Sinhala",
            "sk": "Slovak",
            "sl": "Slovenian",
            "so": "Somali",
            "es": "Spanish",
            "su": "Sundanese",
            "sw": "Swahili",
            "sv": "Swedish",
            "tg": "Tajik",
            "ta": "Tamil",
            "te": "Telugu",
            "th": "Thai",
            "tr": "Turkish",
            "uk": "Ukrainian",
            "ur": "Urdu",
            "uz": "Uzbek",
            "vi": "Vietnamese",
            "cy": "Welsh",
            "xh": "Xhosa",
            "yi": "Yiddish",
            "yo": "Yoruba",
            "zu": "Zulu"
        }
        function sprawdz(lang) {
            if (!lang) return false;
            lang = lang.toLowerCase();
            if (lang in jezyki) return lang;
        
            let keys = Object.keys(jezyki).filter((key) => {
                if (typeof jezyki[key] !== "string") return false;
        
                return jezyki[key].toLowerCase() === lang;
            });
        
            return keys[0] || null;
        }
        function tak(lang) {
            return Boolean(sprawdz(lang));
        }
        const jezyk = args[0]
        const tekst = args.slice(1).join(" ")
        if (!jezyk || !tekst) {
            client.functions.errorMsg(client, "ArgsError", message.channel, message.guild.id, client.langManager.handleLanguage(message, "translate <language> <text>", "tłumacz <język> <tekst>"))
        } else if (!tak(jezyk.toLowerCase())) {
            client.functions.errorMsg(client, "WarnMsg", message.channel, message.guild.id, client.langManager.handleLanguage(message, "Please type correct language", "Podaj prawidłowy język"))
        } else {
            const lang = jezyk.toLowerCase()
            tlumacz(tekst, { to: lang }).then(res => {
                const e = new MessageEmbed()
                .setColor("#75FF67")
                .setAuthor(client.langManager.handleLanguage(message, "Succesfully translated", "Przetłumaczono"), "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/255ab442-1f0d-4ee8-a552-eabe2d3fd9da/dc0xsrb-899e8bc4-0282-43f5-b0d1-765f457e34ec.png/v1/fill/w_400,h_424,strp/google_translate_icon_by_spideyforever2005_dc0xsrb-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD00MjQiLCJwYXRoIjoiXC9mXC8yNTVhYjQ0Mi0xZjBkLTRlZTgtYTU1Mi1lYWJlMmQzZmQ5ZGFcL2RjMHhzcmItODk5ZThiYzQtMDI4Mi00M2Y1LWIwZDEtNzY1ZjQ1N2UzNGVjLnBuZyIsIndpZHRoIjoiPD00MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Zk5hrs1jTrDb8b60eXZM4DqTYAn5j90bHiRXXocXFAs")
                .addFields(
                    {
                        name: client.langManager.handleLanguage(message, "Text", "Tekst"),
                        value: "```" + tekst + "```"
                    },
                    {
                        name: client.langManager.handleLanguage(message, "Text (translated)", "Tekst (przetłumaczony)"),
                        value: "```" + res.text + "```"
                    }
                )
                .setFooter(client.embedFooter, `${message.author.displayAvatarURL({ dynamic: true })}`)
                message.channel.send(e);
            })
        }
    }
}