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
    // console.log(ctx.message.text); // Log the user message

    ctx.sendChatAction('typing');
    const intervalId = setInterval(() => ctx.sendChatAction('typing'), 7_000);

    let response;
    try {
        // Send request to the model with MCP tools
        response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            // contents: `Can you see the files in p1 and p2 folders?.`,
            contents: ctx.message.text,
            config: {
                systemInstruction: "You are a Chihiro a helpful ai assistant.",
                // tools: [mcpToTool(mcpClient)],  // uses the session, will automatically call the tool
                // Uncomment below line if you **don't** want the sdk to automatically call the tool (Google AI Docs)
                // automaticFunctionCalling: { disable: true, },
                // Learn: Default value of `thinkingBudget` is -1 i.e, dynamic thinking enable. Source: https://ai.google.dev/gemini-api/docs/thinking#levels-budgets
                thinkingConfig: { thinkingBudget: 0 },
            },
        });
        // console.log('\n✅RESPONSE: ', response.text);
    } catch (error) {
        response = { text: '❌ Oops, something unexpected happened.\n' + error.toString() };
    }

    // You can then check the message type and content
    if (ctx.message.text) {
        // ctx.reply(`✅You sent a text message: ${ctx.message.text}`);
        ctx.reply(response.text);
    } else if (ctx.message.photo) {
        ctx.reply('✅You sent a photo!');
    } else {
        ctx.reply('✅You sent something else!');
    }

    clearInterval(intervalId);
});

bot.launch(() => {
    console.log('✅🚀Bot launched');
});