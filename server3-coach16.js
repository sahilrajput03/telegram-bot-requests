// @ts-nocheck
const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const { ai } = require('./config');
const { preventPunyCodeWarning } = require('./log-utils');

preventPunyCodeWarning();

const { COACH16_TOKEN } = process.env;
const bot = new Telegraf(COACH16_TOKEN);

bot.on('message', async (ctx) => {
    console.log('✅Received a message!');
    // console.log(ctx.message); // Log the entire message object
    console.log(ctx.message.text); // Log the user message

    ctx.sendChatAction('typing');
    const intervalId = setInterval(() => ctx.sendChatAction('typing'), 7_000);

    let model;
    // model= "gemini-2.5-flash",
    model = "gemma-4-31b-it";

    let thinkingConfig = {
        // Learn: Default value of `thinkingBudget` is -1 i.e, dynamic thinking enable. Source: https://ai.google.dev/gemini-api/docs/thinking#levels-budgets
        thinkingBudget: 0,
        includeThoughts: false,
        thinkingLevel: 'MINIMAL' // MINIMAL < LOW < MEDIUM < HIGH | THINKING_LEVEL_UNSPECIFIED
    };

    // Delete thinkingBudget when using gemma models because its not supported. (Learned from error message).
    if (model.includes('gemma')) {
        delete thinkingConfig.thinkingBudget;
    }

    let responseText;
    try {
        // Send request to the model with MCP tools
        const response = await ai.models.generateContent({
            model,
            // contents: `Can you see the files in p1 and p2 folders?.`,
            contents: ctx.message.text,
            config: {
                systemInstruction: "You are a Chihiro a helpful ai assistant.",
                // tools: [mcpToTool(mcpClient)],  // uses the session, will automatically call the tool
                // Uncomment below line if you **don't** want the sdk to automatically call the tool (Google AI Docs)
                // automaticFunctionCalling: { disable: true, },
                thinkingConfig,
            },
        });
        responseText = response.text;
        console.log('\n✅RESPONSE: ', responseText);
    } catch (error) {
        responseText = '❌ Oops, something unexpected happened.\n' + error.toString();
    }

    // You can then check the message type and content
    if (ctx.message.text) {
        // ctx.reply(responseText);
        // ctx.reply(`✅You sent a text message: ${ctx.message.text}`);
        // ctx.reply(`🎉 This is **bold**, *italic*, and _underlined_ text.: ${ctx.message.text}`, { parse_mode: 'Markdown' });
        ctx.reply(responseText, { parse_mode: 'Markdown' });;
    } else if (ctx.message.photo) {
        ctx.reply('✅You sent a photo!');
    } else {
        ctx.reply('✅You sent something else!');
    }

    clearInterval(intervalId);
});

// bot.on('sticker', ctx => ctx.reply('👍'));

// Respond to emoji send by user
bot.on('message_reaction', (ctx) => {
    // console.log('Received emoji?', ctx.update.message_reaction);
    if (ctx.update.message_reaction.new_reaction.length !== 0) {
        console.log('Received emoji:', ctx.update.message_reaction.new_reaction[0].emoji);
    } else {
        console.log('Reaction removed:', ctx.update.message_reaction.old_reaction[0].emoji);
    }
});

// Learn: To be able to receive `reaction` update we must enable `message_reaction` like below:
bot.launch({
    allowedUpdates: ['message', 'message_reaction']
}, () => {
    console.log('✅🚀Bot launched');
});
