// Discord bot to fect Solana Price via Coin Geko API

const discord = require("discord.js");
const { Client, Intents,} = require("discord.js");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});



// https://discord.com/api/oauth2/authorize?client_id=964479594193371218&permissions=8&scope=applications.commands%20bot
let price_usd = "SOL: $";
const sol_price = async () => {
  price = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    )
    .then(function (response) {
      // handle success
      price_usd += response.data["solana"]["usd"];
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });


};

client.on("ready", () => {
  console.log("Pricer is online 🚀");
  client.user.setActivity("Prices", { type: "WATCHING" });
});

client.on("messageCreate", async (message) => {
  const guildId = "785428302114455592";
  const guild = client.guilds.cache.get(guildId);

  if (message.content === "$price") {
    await sol_price();
    message.reply(`${price_usd}`);
  }
});

client.login(process.env.TOKEN);
