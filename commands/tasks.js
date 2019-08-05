const Discord = require('discord.js');
const Keyv = require('keyv');
const ms = require('ms');
module.exports.run = async (client, message, args) => {

    const tasks = client.tasks;

    if (!tasks) return message.channel.send('Hmm. Looks like you have nothing to do. Lame.');

    const taskCount = new Keyv({namespace: 'taskCount'});

    const userCount = taskCount.get(message.author.id);
    if (!userCount) {

        taskCount.set(message.author.id, '0');

    }

    let userTasks = await tasks.get(message.author.id);

    message.channel.send(`\`\`\`${userTasks}\`\`\``);


}
