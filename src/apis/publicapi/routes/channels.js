const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

async function returnChannels(totalChannels) {
    const isTotal = totalChannels ? { isChannel: true } : {};
    const channels = await bot.DB.channels.find(isTotal).exec();
    return channels;
}

async function returnChannelCount() {
    const channels = await bot.DB.channels.count({ isChannel: true }).exec();
    return channels;
}

async function returnUsersCount() {
    const users = await bot.DB.users.count({}).exec();
    return users;
}

async function returnExecutedCommands() {
    let commands = 0;
    const channels = await returnChannels(false);
    for (const { commandsUsed } of channels) {
        if (commandsUsed.length == 0) continue;
        commandsUsed.forEach((command) => {
            commands += command.Usage;
        });
    }

    return commands;
}

async function returnPoroCount() {
    const poroData = await bot.DB.poroCount.find({}).exec();
    let sum = 0;
    for (const xd of poroData) {
        sum += xd.poroCount;
    }

    return sum;
}

let channels = [];
let channelCount = 0;
let userCount = 0;
let commandsCount = 0;
let poroCount = 0;

setInterval(async () => {
    returnChannels(true).then((x) => {
        channels = x;
    });
    returnChannelCount().then((x) => {
        channelCount = x;
    });
    returnUsersCount().then((x) => {
        userCount = x;
    });
    returnExecutedCommands().then((x) => {
        commandsCount = x;
    });
    returnPoroCount().then((x) => {
        poroCount = x;
    });
}, 1000 * 30);

router.get('/api/bot/channels', async (req, res) => {
    let channels2 = [];
    const mapped = channels.map((x) => x.username);
    // const getEmebed = async () => {
    //     shuffle(channels);
    //     const mapped = channels.map((x) => x.username);
    //     const randomSliced = mapped.splice(Math.floor(Math.random() * mapped.length), 100);
    //     const streams = await fetch(
    //         `https://api.twitch.tv/helix/streams?user_login=${randomSliced.join('&user_login=')}`,
    //         {
    //             headers: {
    //                 'Client-ID': process.env.CLIENT_ID,
    //                 'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
    //             },
    //         }
    //     ).then((res) => res.json());

    //     const streamers = streams.data.map((stream) => stream.user_name);
    //     const chooseOneStream = streamers[Math.floor(Math.random() * streamers.length)] ?? null;

    //     channels2.push(chooseOneStream);

    //     return chooseOneStream != null ? chooseOneStream : getEmebed();
    // };
    // await getEmebed();

    const todaysCode = await bot.DB.private.findOne({ code: 'code' }).exec();

    return res.status(200).json({
        channelCount: channelCount,
        channels: mapped,
        totalPoros: poroCount,
        todaysCode: todaysCode.todaysCode,
        embedStream: 'forsen',
        executedCommands: commandsCount,
        seenUsers: userCount,
    });
});

module.exports = router;
