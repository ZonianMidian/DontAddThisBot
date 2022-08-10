const regex = require('../util/regex.js');

module.exports = {
    name: "spam",
    aliases: [],
    cooldown: 5000,
    permission: 1, //1 = mod, 2 = broadcaster
    description:"Spams message in chat",
    botPerms: "vip",
    execute: async (message, args, client) => {
        if (args.length < 2) return { text: "Usage: |spam 3 xd" };

        const count = args[0];
        const phrase = args.slice(1).join(" ").replace("!", "ǃ").replace("=", "꓿").replace("$", "💲");
        if (isNaN(count)) return { text: `the spam count should be a number` };
        if (count > 50) return { text: `the maximum spam count is 50` };
        if (count < 2) return { text: `the minimum spam count is 2` };

        for (let xd = 0; xd < count; xd++) {
            client.say(message.channelName, phrase);
        }
    },
};
