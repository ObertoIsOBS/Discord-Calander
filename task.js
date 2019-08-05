const Discord = require('discord.js');
const Keyv = require('keyv');
const ms = require('ms');
module.exports.run = async (client, message) => {
const globalPrefix = client.globalPrefix;
const prefixes = client.prefixes;

    const tasks = new Keyv();
client.tasks = tasks;

    const taskCount = new Keyv({namespace: 'taskCount'});
    const userCount = await taskCount.get(message.author.id);
    if (userCount === 'undefined') {

        taskCount.set(message.author.id, '0');

    }

    let userTasks = await tasks.get(message.author.id);
if (userTasks === 'undefined') {

    let userTasks = '';

}
    let prefix;

    if (message.content.startsWith(globalPrefix)) {
        prefix = globalPrefix;
    } else {
        // check the guild-level prefix
        const guildPrefix = await prefixes.get(message.guild.id);
        if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
    }

    let args = message.content.slice(prefix.length + 4).trim().split(': ');


  let time = '2s';
let task = args[0];

let reminder = args[1];

if (!task) return message.channel.send('Please provide a task for me to add.');

if (task) {

    taskCount.set(message.author.id, userCount + 1);

    setTimeout(function(){

        let id = message.author.id + userCount;
        tasks.set(message.author.id, userTasks + `Task ${userCount}: ${task} | `);
        tasks.on('error', err => {
            console.error('Keyv error:', err); 
            message.channel.send('Oops. There was an error.');
            return;
        });

        message.channel.send(`**Task Added**`);

    }, ms(time));


}


let taskRemind = `Ring. Ring. It\'s just Discord Tasks reminding you to complete this task. **${task}**`;

if (args[1]) {

    setTimeout(function(){

        message.channel.send(taskRemind);

    }, ms(args[1]));

    }



module.exports.help = {
name:"task",
description:"Create a new task with optional reminder",
usage:"`+task [task]:[reminder (optional)]`",
example:"`+task eat dinner:3h`"


}


}