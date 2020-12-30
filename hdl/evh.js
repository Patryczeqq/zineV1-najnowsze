const fs = require("fs")
const path = require("path")
module.exports = async (client) => {
    const pliki = fs.readdirSync(path.join(__dirname, "../evnts"))
    for (let plik of pliki) {
        if (plik.endsWith(".js")) {
            let nazwa = plik.substring(0, plik.indexOf(".js"))
            try {
                let akcja = require(path.join(__dirname, "../evnts", plik))
                client.on(nazwa, akcja.bind(null, client))
            } catch (err) {
                console.error(err)
                console.log("Wystąpił błąd!")
            }
        }
        
    }
}
