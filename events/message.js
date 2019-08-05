
module.exports = async (client, message) => {

if (message.author.bot) return;

let globalPrefix = client.globalPrefix;

let prefixes = client.prefixes;

let args;
// handle messages in a guild
if (message.guild) {
    let prefix;

    if (message.content.startsWith(globalPrefix)) {
        prefix = globalPrefix;
    } else {
        // check the guild-level prefix
        const guildPrefix = await prefixes.get(message.guild.id);
        if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
    }

    // if we found a prefix, setup args; otherwise, this isn't a command
    if (!prefix) return;
    args = message.content.slice(prefix.length).split(/\s+/);
} else {
    // handle DMs
    const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
    args = message.content.slice(slice).split(/\s+/);
}

// get the first space-delimited argument after the prefix as the command
const command = args.shift().toLowerCase();

const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
    // Run the command
    cmd.run(client, message, args);
}
