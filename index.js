const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, RichEmbed} = require('discord.js');
const config = require('./config.json');
const fs = require("fs");
const ms = require("ms");
const Enmap = require('enmap');
const Keyv = require('keyv');
const sqlite3 = require('sqlite3');
client.config = config;
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
  

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Loaded ${commandName}`);
    client.commands.set(commandName, props);
  });
});



const keyv = new Keyv();


keyv.on('error', err => console.error('Keyv connection error:', err));

const prefixes = new Keyv();

client.prefixes = prefixes;
client.globalPrefix = config.prefix;

client.login(config.token);