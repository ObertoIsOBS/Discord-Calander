const Discord = require('discord.js');
const Keyv = require('keyv');
module.exports.run = async (client, message, args) => {

message.channel.send(`Pong 🏓 \`${client.pings.length}\``);

}
