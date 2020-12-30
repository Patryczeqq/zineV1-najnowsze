const { MessageEmbed } = require("discord.js")
const { MessageAttachment } = require("discord.js")
const dscnsfw = require("discord-nsfw")
const nsfwImg = new dscnsfw()

module.exports = {
    name: "pussy",
    description: "NSFW",
    category: "NSFW",
    requireNSFW: true,

    async run(message, args, client) {
        const img = await nsfwImg.pussy()
        const att = new MessageAttachment(img, "img.png")
        const e = new MessageEmbed()
        .setColor("#75FF67")
        .setAuthor("Pussy", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/48f775bc-5db0-4f2b-89dc-dbe5c6ad0d1d/dbuwxwm-7197c8b9-f485-4809-9a9e-18490d49648e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNDhmNzc1YmMtNWRiMC00ZjJiLTg5ZGMtZGJlNWM2YWQwZDFkXC9kYnV3eHdtLTcxOTdjOGI5LWY0ODUtNDgwOS05YTllLTE4NDkwZDQ5NjQ4ZS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.s-_-OrfFPGvjxQsTZMHMEIBKJRtkO-4VbFjAE8LWu58")
        .attachFiles(att)
        .setImage("attachment://img.png")
        message.channel.send(e)
	}
}