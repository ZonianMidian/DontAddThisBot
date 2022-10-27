module.exports = {
    tags: 'poro',
    name: 'rankup',
    cooldown: 5000,
    aliases: ['pororankup'],
    description: 'Rank up with poros!',
    level: 3,
    poro: true,
    poroRequire: true,
    execute: async (message, args, client) => {
        // 1 = raw 50
        // 2 = rare 150
        // 3 = medium rare 250
        // 4 = medium 500
        // 5 = medium well + 750
        // 6 = well done 1300
        // 7 = cooked 2000
        const allPoroData = await bot.DB.poroCount.find({});
        for (const poroData of allPoroData) {
            if (!poroData.poroRank) {
                await bot.DB.poroCount.updateOne({ id: poroData.id }, { $set: { poroRank: 1 } }).exec();
                console.log(`Updated ${poroData.username} to rank 1`);
            }
        }
    },
};
