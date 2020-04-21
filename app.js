const Telegraf = require('telegraf');
const TelegrafFlow = require('telegraf-flow');
const flow = new TelegrafFlow();

const Secrets = require("./src/Secrets");
const { Scenes } = require("./src/Scenes");
const { CommandHandler } = require("./src/CommandHandler");
const { Hear } = require("./src/Hear");
// const { ActionHandler } = require("./src/ActionHandler");

// get & parse .env file
const dotenv = require('dotenv').config();

if (dotenv.error) {
  throw dotenv.error
}

// bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// commandHandler
const commandHandler = new CommandHandler(flow);

// Hear
const hear = new Hear(flow);

// Action
// const actionHandler = new ActionHandler(bot);

console.log("==> Bot Started...");


// commands
commandHandler.start(flow);

// Hear
hear.hear();


// action
// actionHandler.actions();




// register
flow.register(new Scenes().collectDataScene()); 
flow.register(new Scenes().getAreaofWorksScene());
flow.register(new Scenes().symptomsScene()); 
flow.register(new Scenes().ppesUsedScene());
flow.register(new Scenes().greeterScene()); 
flow.register(new Scenes().getHospitalName());
flow.register(new Scenes().reportScene());
flow.register(new Scenes().aboutScene());
flow.register(new Scenes().getFirstNameScene());
flow.register(new Scenes().getLastNameScene());
flow.register(new Scenes().getPhone());
flow.register(new Scenes().getAge());
flow.register(new Scenes().getGender());
flow.register(new Scenes().getGPSCoord());
flow.register(new Scenes().getLocation());
flow.register(new Scenes().finScene());
flow.register(new Scenes().symptomScene());
flow.register(new Scenes().statScene()); 



bot.use(Telegraf.session())
bot.use(flow.middleware())


// bot.telegram.setWebhook("https://.herokuapp.com/" + process.env.BOT_TOKEN);
// bot.startWebhook('/' + process.env.BOT_TOKEN, null, process.env.PORT)

bot.launch()