// @ts-nocheck
const dotenv = require('dotenv');
dotenv.config({ quiet: true });

// * Benchmark Memory consumption via `top -pid PID_HERE`
//  1. A simple program takes 9mb with `setTimeout(() => { console.log('boom')}, 5_000)`
//  2. This server memory cost is 19mb.

const { CHIHIRO_TOKEN } = process.env;

const { Telegraf } = require('telegraf');

// * Learn:
// ! 1. In this file, running `bot.launch()` deletes your existing webhook. [TESTED: 28 Sept 2025].
// 2. Using `bot.launch(..)` launches in polling mode by default. Source:
//    - https://stackoverflow.com/a/65782178/10012446
//    - https://github.com/telegraf/telegraf/releases/tag/v4.0.0

const bot = new Telegraf(CHIHIRO_TOKEN);

// Learn: Callback is called when anybody sends a sticker.
bot.on('sticker', ctx => ctx.reply('👍'));

// Tip: You can add predefined commands so any user can see list of
//      available commands by pressing the hamburger menu on the bottom
//      left -- you can do this by adding commands to the bot using the
//      BotFather easily.

// Learn: You can send a command to this bot by sending
//        `/command_name` or you can select the command direclty from
//        the hamburger menu in the bottom-left side.
bot.command('c1', Telegraf.reply('You sent /c1 command.'));
bot.command('c2', ctx => {
  ctx.reply(`You sent /${ctx.command} command.`); // You sent c2 command.
  console.log(ctx.update.message);
  return;
  // Outptut of ctx.update.message
  /* 
  {
    message_id: 806,
    from: {
      id: 1097619859,
      is_bot: false,
      first_name: 'Nick Morris',
      username: 'usNick',
      language_code: 'en'
    },
    chat: {
      id: 1097619859,
      first_name: 'Nick Morris',
      username: 'usNick',
      type: 'private'
    },
    date: 1652115698,
    text: '/c1',
    entities: [ { offset: 0, length: 3, type: 'bot_command' } ]
  }
  */
});

bot.command('c3', (ctx) => {
  // Learn: Trigger the `typing...` indicator for (6 seconds) (Src: https://chatgpt.com/c/68d63722-49d4-8332-83ac-9f214e06bbe3 )
  //    Also, for official http api from telegram use check this - Test this for sending typing notifier: Telegram Bot API - https://core.telegram.org/bots/api#sendchataction
  return ctx.sendChatAction('typing');
});

// Learn: start() method is an alias for /start command
bot.start(ctx => ctx.reply('Welcome'));

// Learn: help() method is an alias for /help command
bot.help(ctx => ctx.reply('You sent /help command.'));

// Listens for specified message and runs the callback
bot.hears('hi', ctx => ctx.reply('Hi there 🙂! How are you?'));

bot.hears('bye', ctx => {
  // resend existing file by file_id
  // ctx.replyWithSticker('123123jkbhj6b');

  // send file
  // ctx.replyWithVideo({ source: '/path/to/video.mp4' });

  // send stream
  // ctx.replyWithVideo({
  //     source: fs.createReadStream('/path/to/video.mp4'),
  // });

  // send buffer
  // ctx.replyWithVoice({
  //     source: Buffer.alloc(),
  // });

  // send photo
  // ctx.replyWithPhoto('https://picsum.photos/200/300/');

  // send photo with filename
  return ctx.replyWithPhoto({
    url: 'https://picsum.photos/200/300/?random',
    // filename: 'kitten.jpg',
  });
});

// * NOTE: Please keep the `message` handler after all command
//   definitions otherwise `message` handler prevents execution of the
//   specified command callbacks.
// * LEARN: Below listener will be triggered for any type of message
//   except the messages intercepted by above command based specified
//   callbacks. [TESTED]
bot.on('message', (ctx) => {
  console.log('✅Received a message!');
  console.log(ctx.message); // Log the entire message object

  // You can then check the message type and content
  if (ctx.message.text) {
    ctx.reply(`✅You sent a text message: ${ctx.message.text}.`);
    // Learn: Get `chatId` of anyone via:
    // ctx.reply(`(ChatId is: ${ctx.chat.id})`);

  } else if (ctx.message.photo) {
    ctx.reply('✅You sent a photo!');
  } else {
    ctx.reply('✅You sent something else!');
  }
});

bot.launch(() => {
  console.log('\n✅🚀Bot launched');
  // Send a message to a specific chat ID right after bot starts
  const sahilChatId = 711263195;
  bot.telegram.sendMessage(sahilChatId, 'Hi Sahil, bot launched 🎉!');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
