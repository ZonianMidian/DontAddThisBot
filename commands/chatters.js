const got = require("got");

module.exports = {
    name: "chatters",
    cooldown: 3000,
    description: "Check active/viewerlist count",
    execute: async(message, args, client) => {
        const targetUser = args[0] ?? message.senderUsername;


        const data = await fetch(`https://recent-messages.robotty.de/api/v2/recent-messages/${targetUser.toLowerCase()}`);
        const resp = JSON.parse(await data.text());
        const { chatters } = await got(`https://tmi.twitch.tv/group/user/${(targetUser.toLowerCase())}/chatters`).json();
        const BRUH = chatters.viewers.length + chatters.moderators.length + chatters.vips.length + chatters.broadcaster.length
        console.log(BRUH)

        const messages = resp.messages;
        const users = [];
        const re = /^.+@(.+)\.tmi.twitch.tv\sPRIVMSG\s#.+$/i
 
        for (let message of resp.messages) {
            re.lastIndex = 0;
            const match = re.exec(message);
                if (match) {
                    const user = match[1];
                if (!users.includes(user)) {
                users.push(user);
      }
    }
  } 
  if (message.senderUsername == process.env.NUMBER_ONE) {
    return client.privmsg(message.channelName, `.me ${targetUser} currently has ${users.length} users chatted, ${BRUH} users in viewerlist.`)
} else {
    return {
        text: `${targetUser} currently has ${users.length} users chatted, ${BRUH} users in viewerlist.`
    }
}



    }
        }