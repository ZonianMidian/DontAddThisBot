const humanizeDuration = require("../humanizeDuration");

module.exports = {
    name: "ping",
    aliases: ["xd"],
    cooldown: 3000,
    description:"Bot response",
    execute: async (message, args, client) => {

       

        return {
            text: `${message.senderUsername}, TriHard 🏓 a BOT UPTIME: ${humanizeDuration(process.uptime() * 1000 )}`,
        };
    },
};
