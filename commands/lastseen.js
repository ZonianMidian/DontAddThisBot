<<<<<<< HEAD
const got = require("got");

module.exports = {  
    name: "lastseen",
    aliases: [],
    cooldown: 3000,
    execute: async (message, args) => {
        const targetUser = args[0] ?? message.senderUsername;
        const targetChannel = args[1] ?? message.channelName
        let { body: userData, statusCode } = await got(`https://api.ivr.fi/logs/lastmessage/${targetChannel}/${targetUser}`, { timeout: 10000, throwHttpErrors: false, responseType: "json" });
        console.log(userData)

        const lastseen = (userData.time) 
        return {
            text: `${targetUser} was last seen ${lastseen} ago. BatChest`
        }

    }
=======
const got = require("got");

module.exports = {  
    name: "lastseen",
    aliases: [],
    cooldown: 3000,
    execute: async (message, args) => {
        const targetUser = args[0] ?? message.senderUsername;
        const targetChannel = args[1] ?? message.channelName
        let { body: userData, statusCode } = await got(`https://api.ivr.fi/logs/lastmessage/${targetChannel}/${targetUser}`, { timeout: 10000, throwHttpErrors: false, responseType: "json" });
        console.log(userData)

        const lastseen = (userData.time) 
        return {
            text: `${targetUser} was last seen ${lastseen} ago.`
        }

    }
>>>>>>> 6932fa7 (message)
};