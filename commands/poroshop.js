const got = require("got");

module.exports = {
    name: "poroshop",
    cooldown: 10000,
    description: "poro shop information to use poro meat",
    aliases: ["shop"],
    poro: true,
    execute: async(message, args, client) => {
        const {banned, banphrase_data} = await got.post(`https://forsen.tv/api/v1/banphrases/test `, {json: {'message': message.senderUsername}}).json();
        console.log(banned, banphrase_data)
        if (banned == false) {
            if (message.senderUsername == process.env.NUMBER_ONE) {
                client.privmsg(message.channelName, `.me ${message.senderUsername}, kattahDance setcolor Change bot color (50 poro 🥩) | cdr to reset timer (5 poro 🥩) | addbadge to bot ["glhf-pledge", "no_audio", "premium", "no_video"] (50 poro 🥩) | delbadge to remove all badges (50 poro 🥩)`)
            } else {
                return {
                    text: `${message.senderUsername}, kattahDance setcolor Change bot color (50 poro 🥩) | cdr to reset timer (5 poro 🥩) `
                } 
            }
        } else if (banned == true) {
            return {
                text: `banned msg lol`
            }
        }
    }
}