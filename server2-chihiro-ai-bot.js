// @ts-nocheck
const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const { ai } = require('./config.js');
const { mcpToTool } = require('@google/genai');
// import { Client } from "@modelcontextprotocol/sdk/client/index.js";
// import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

// Create server parameters for stdio connection
const serverParams = new StdioClientTransport({
    "command": "npx",
    "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/apple/Documents/github_repos/learn-openai/mcp/filesystem/p1",
        "/Users/apple/Documents/github_repos/learn-openai/mcp/filesystem/p2"
    ]
});
const mcpClient = new Client({ name: "example-client", version: "1.0.0" });
// Initialize the connection between client and server
mcpClient.connect(serverParams).then(() => console.log('✅mcp client connected!'));

const { CHIHIRO_TOKEN } = process.env;

const { Telegraf } = require('telegraf');

const bot = new Telegraf(CHIHIRO_TOKEN);

bot.on('message', async (ctx) => {
    console.log('✅Received a message!');
    console.log(ctx.message); // Log the entire message object

    ctx.sendChatAction('typing');
    const intervalId = setInterval(() => ctx.sendChatAction('typing'), 7_000);

    let response;
    try {
        // Send request to the model with MCP tools
        response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            // contents: `Can you see the files in p1 and p2 folders?.`,
            contents: ctx.message,
            config: {
                systemInstruction: "You are a Chihiro a helpful ai assistant.",
                tools: [mcpToTool(mcpClient)],  // uses the session, will automatically call the tool
                // Uncomment below line if you **don't** want the sdk to automatically call the tool (Google AI Docs)
                // automaticFunctionCalling: { disable: true, },
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
        clearInterval(intervalId);
    } else if (ctx.message.photo) {
        ctx.reply('✅You sent a photo!');
    } else {
        ctx.reply('✅You sent something else!');
    }
});

bot.launch(() => {
    console.log('\n✅🚀Bot launched');
});