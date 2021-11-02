require("dotenv/config");
const { default: axios } = require("axios");
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

let i;

bot.command("start", (ctx) => {
  ctx.reply("Enter a city name");
});

bot.on("text", async (ctx) => {
  let city = ctx.message.text;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API}&units=metric`
  );
  const data = response.data;

  let cityName = "City Name: " + data.name + "\n";

  const tmp = data.main.temp + " degree celsius";

  const { message_id } = await ctx.reply(cityName + tmp);

  setTimeout(() => {
    ctx.telegram.editMessageText(
      ctx.chat.id,
      message_id,
      null,
      cityName + "Wind ;" + data.wind.speed
    );
  }, 1000);
});

bot.launch().then(() => console.log("Bot Launched"));
