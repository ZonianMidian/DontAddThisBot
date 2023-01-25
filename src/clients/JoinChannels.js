const { client } = require('../util/twitch/connections.js');

const main = async () => {
	let ChannelsArray = [];
	const channels = await bot.DB.channels.find({ isChannel: true }).exec();
	for (const channel of channels) {
		ChannelsArray.push(channel.username);
	}

	for (const channel of ChannelsArray) {
		if (!client.joinedChannels.has(channel)) client.join(channel);
	}
};

module.exports = { main };
