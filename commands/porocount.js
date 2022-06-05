const got = require("got");

module.exports = {
    name: "porocount",
    cooldown: 10000,
    description: "check poro count of user",
    poro: true,
    execute: async(message, args, client) => {
        const targetUser = args[0] ?? message.senderUsername
        const prefix = args[0].toLowerCase()
        const {banned, banphrase_data} = await got.post(`https://forsen.tv/api/v1/banphrases/test `, {json: {'message': targetUser}}).json();
        console.log(banned, banphrase_data)
        const channelData = await bot.DB.poroCount.findOne({ username: targetUser.toLowerCase() }).exec();
        
        if (prefix.length < 25) {
            if (banned == false) {
                if (!channelData) {
                    if (message.senderUsername == process.env.NUMBER_ONE) {
                        client.privmsg(message.channelName, `.me ${targetUser} isnt registered lol`)
                    } else {
                        return {
                            text: `${targetUser} isnt registered lol`
                        }
                    }
                } else {
                    if (message.senderUsername == process.env.NUMBER_ONE) {
                        client.privmsg(message.channelName, `.me ${targetUser} has total of ${channelData.poroCount} meat kattahXd | Registered: ${channelData.joinedAt}`)
                    } else {
                        return {
                            text: `${targetUser} has total of ${channelData.poroCount} meat kattahXd | Registered: ${channelData.joinedAt}`
                        }
                    }
                } 
            } else if (banned == true) {
                return {
                    text: `banned msg lol`
                }
            }
        } else {
            return {
                text: `message too long lol`
            }
        }
    }
}