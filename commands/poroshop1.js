const utils = require("../util/utils.js");

module.exports = {
    name: "poroshop",
    cooldown: 10000,
    description: "poro shop information to use poro meat",
    aliases: ["shop"],
    poro: true,
    execute: async(message, args, client) => {

        if (message.channelName == "forsen") {
            if (await utils.ForsenTV(message.senderUsername)) {
                return {
                    text: `banned msg lol`
                }
            } else {
                return {
                    text: `${message.senderUsername}, kattahDance setcolor (50 🥩) | cdr (5 🥩) | change display name (50 🥩) | deactivate bot :tf: (1mill 🥩)`
                } 
            }
        }

        if (message.channelName == "nymn") {
            if (await utils.Nymn(message.senderUsername)) {
                return {
                    text: `banned msg lol`
                }
            } else {
                return {
                    text: `${message.senderUsername}, kattahDance setcolor (50 🥩) | cdr (5 🥩) | change display name (50 🥩) | deactivate bot :tf: (1mill 🥩)`
                } 
            }
        }

        if (message.channelName == message.channelName) {
            return {
                text: `${message.senderUsername}, kattahDance setcolor (50 🥩) | cdr (5 🥩) | change display name (50 🥩) | deactivate bot :tf: (1mill 🥩)`
            } 
        }
    }
}