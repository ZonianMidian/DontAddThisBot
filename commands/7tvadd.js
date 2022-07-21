const utils = require('../util/utils.js');

module.exports = {
    name: "add",
    description: "Add 7tv emote from channel",
    cooldown: 3000,
    execute: async(message, args, client) => {
        if (!args[0]) {
            if (message.senderUsername == await utils.PoroNumberOne()) {
                return client.privmsg(message.channelName, `.me 7tvM Please specify an emote`)
            } else {
                return {
                    text: "7tvM Please specify an emote",
                }
            }
        }
        const StvID = await utils.stvNameToID(message.channelName)
        const isNull = await utils.StvChannelEmotes(StvID)
        if (isNull.data == null) {
            if (message.senderUsername == await utils.PoroNumberOne()) {
                return client.privmsg(message.channelName, `.me ⛔ ${message.channelName} is not a valid channel...`)
            } else {
                return {
                    text: `⛔ "${message.channelName}" is not a valid channel...`,
                }
            }
        }
        const Editors = (await utils.StvEditors(StvID)).data.user.editor_ids
        const isBotEditor = Editors.find((x) => x == "629d77a20e60c6d53da64e38") // DontAddThisBot's 7tv id
        if (isBotEditor) {
            const uid = await utils.IDByLogin(message.senderUsername);
            const channel = await bot.DB.channels.findOne({ username: message.channelName }).exec();
            const tc = channel.editors.find(badge => badge.id === uid);
            const ChannelOwnerEditor = message.senderUsername.toLowerCase() == message.channelName.toLowerCase()
            if (tc || ChannelOwnerEditor) {
                if (args[1]) {
                    const StvID2 = await utils.stvNameToID(args[1])
                    const isNull = await utils.StvChannelEmotes(StvID2)
                    if (isNull.data == null) {
                        if (message.senderUsername == await utils.PoroNumberOne()) {
                            return client.privmsg(message.channelName, `.me ⛔ "${args[1]}" is not a valid channel...`)
                        } else {
                            return {
                                text: `⛔ "${args[1]}" is not a valid channel...`,
                            }
                        }
                    } else {
                        const findEmoteInChannel2 = isNull.data.emoteSet.emotes.find(emote => emote.name === args[0])
                        if (findEmoteInChannel2) {
                            const channelEmotes = await utils.StvChannelEmotes(StvID)
                            const findEmoteInChannel = channelEmotes.data.emoteSet.emotes.find(emote => emote.name === args[0])
                            if (findEmoteInChannel) {
                                if (message.senderUsername == await utils.PoroNumberOne()) {
                                    return client.privmsg(message.channelName, `.me ⛔ ${args[0]} is already in ${message.channelName}`)
                                } else {
                                    return {
                                        text: `⛔ ${args[0]} is already in ${message.channelName}`,
                                    }
                                }
                            }
                            await utils.AddSTVEmote(findEmoteInChannel2.id, StvID)
                            const KEKG = await utils.IDtoEmote(findEmoteInChannel2.id)
                            if (KEKG != args[0]) {
                                await utils.AliasSTVEmote(findEmoteInChannel2.id, StvID, args[0])
                                if (message.senderUsername == await utils.PoroNumberOne()) {
                                    return client.privmsg(message.channelName, `.me 7tvM Successfully added "${args[0]}" to ${message.channelName} from ${args[1]} & auto-aliased to "${args[0]}"`)
                                } else {
                                    return {
                                        text: `7tvM Successfully added "${args[0]}" to ${message.channelName} from ${args[1]} & auto-aliased to "${args[0]}"`,
                                    }
                                }
                            }
                            if (message.senderUsername == await utils.PoroNumberOne()) {
                                return client.privmsg(message.channelName, `.me 7tvM Successfully added "${args[0]}" to ${message.channelName} from ${args[1]}`)
                            } else {
                                return {
                                    text: `7tvM Successfully added "${args[0]}" to ${message.channelName} from ${args[1]}`,
                                }
                            }
                        } else {
                            if (message.senderUsername == await utils.PoroNumberOne()) {
                                return client.privmsg(message.channelName, `.me ⛔ Emote "${args[0]}" is not in ${args[1]}`)
                            } else {
                                return {
                                    text: `⛔ Emote "${args[0]}" is not in ${args[1]}`,
                                }
                            }
                        }
                    }
                }
                const channelEmotes = await utils.StvChannelEmotes(StvID)
                const findEmoteInChannel = channelEmotes.data.emoteSet.emotes.find(emote => emote.name === args[0])
                if (findEmoteInChannel) {
                    if (message.senderUsername == await utils.PoroNumberOne()) {
                        return client.privmsg(message.channelName, `.me ⛔ Emote "${args[0]}" already exists in ${message.channelName}`)
                    } else {
                        return {
                            text: `⛔ Emote "${args[0]}" already exists in ${message.channelName}`,
                        }
                    }
                } else {
                    const [url] = args;
                    if (/https:\/\/(next\.)?7tv\.app\/emotes\/\w{24}/g.test(url)) {
                    const linkEmote = /https:\/\/(next\.)?7tv\.app\/emotes\/(\w{24})/.exec(url)
                    const emoteName = await utils.StvEmoteIDToEmoteName(linkEmote[2])
                    if (emoteName.data.emote == null) {
                        if (message.senderUsername == await utils.PoroNumberOne()) {
                            return client.privmsg(message.channelName, `.me ⛔ Emote does not exist`)
                        } else {
                            return {
                                text: `⛔ Emote does not exist`,
                            }
                        }
                    }
                    const findEmoteInChannel2 = channelEmotes.data.emoteSet.emotes.find(emote => emote.name === emoteName.data.emote.name)
                    if (findEmoteInChannel2) {
                        if (message.senderUsername == await utils.PoroNumberOne()) {
                            return client.privmsg(message.channelName, `.me ⛔ ${message.channelName} already has ${emoteName.data.emote.name}`)
                        } else {
                            return {
                                text: `⛔ ${message.channelName} already has ${emoteName.data.emote.name}`,
                            }
                        }
                    }
                    //console.log(emoteName)
                    await utils.AddSTVEmote(linkEmote[2], StvID)
                    if (message.senderUsername == await utils.PoroNumberOne()) {
                        return client.privmsg(message.channelName, `.me 7tvM Successfully added emote "${emoteName.data.emote.name}" to ${message.channelName}`)
                    } else {
                        return {
                            text: `7tvM Successfully added emote "${emoteName.data.emote.name}" to ${message.channelName}`,
                        }
                    }
                    }
                    const searchEmotes = await utils.SearchSTVEmote(args[0])
                    //console.log(searchEmotes.data.emotes.items)
                    if (searchEmotes) {
                        if (searchEmotes.data == null) {
                            if (message.senderUsername == await utils.PoroNumberOne()) {
                                return client.privmsg(message.channelName, `.me ⛔ Emote "${args[0]}" not found`)
                            } else {
                                return {
                                    text: `⛔ Emote "${args[0]}" not found`,
                                }
                            }
                        }
                        const findThatEmote = searchEmotes.data.emotes.items.find(emote => emote.name === args[0]);
                        //console.log(findThatEmote)
                        if (findThatEmote) {
                            await utils.AddSTVEmote(findThatEmote.id, StvID)
                            if (message.senderUsername == await utils.PoroNumberOne()) {
                                return client.privmsg(message.channelName, `.me 7tvM Successfully added emote "${args[0]}" to ${message.channelName}`)
                            } else {
                                return {
                                    text: `7tvM Successfully added emote "${args[0]}" to ${message.channelName}`,
                                }
                            }
                        } else {
                            await utils.AddSTVEmote(searchEmotes.data.emotes.items[0].id, StvID)
                            return {
                                text: `7tvM Couldn't find "${args[0]}" in search results, therefore added an emote "${searchEmotes.data.emotes.items[0].name}" related to "${args[0]}"`,
                            }
                        }
                    }
                }
            } else {
                if (message.senderUsername == await utils.PoroNumberOne()) {
                    return client.privmsg(message.channelName, `.me ⛔ You are not a editor in ${message.channelName}, ask the broadcaster to add you as an editor by typing <|editor add ${message.senderUsername}>`)
                } else {
                    return {
                        text: `⛔ You are not a editor in ${message.channelName}, ask the broadcaster to add you as an editor by typing <|editor add ${message.senderUsername}>`
                    }
                }
            }
        } else {
            if (message.senderUsername == await utils.PoroNumberOne()) {
                return client.privmsg(message.channelName, `.me Please grant @DontAddThisBot as a editor :)`)
            } else {
                return {
                    text: `Please grant @DontAddThisBot as a editor :)`
                }
            }
        }
    } 
}


