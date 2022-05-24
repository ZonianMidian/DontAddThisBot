const got = require("got");

module.exports = {  
    name: "firstline",
    aliases: ["fl"],
    cooldown: 3000,
    description:"Gets first message of a user in any channel that is logged on logs.ivr.fi",
    execute: async (message, args) => {
        const targetUser = args[0] ?? message.senderUsername;
        const targetChannel = args[1] ?? message.channelName
        let { body: userData, statusCode } = await got(`https://api.ivr.fi/logs/firstmessage/${targetChannel}/${targetUser}`, { timeout: 10000, throwHttpErrors: false, responseType: "json" });
        console.log(userData)

        if (userData.status == 404) {
            return {
                text: `${userData.error} FeelsDankMan or channel not logged.`
            }
        } else {
            const message = userData.message
            const time = userData.time
            return {
                text: `${targetUser} first logged message in ${targetChannel} is "${message}" ${time} ago BatChest`
            }
        }
    },
};