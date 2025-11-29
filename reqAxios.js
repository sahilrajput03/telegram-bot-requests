const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ quiet: true });

const { BRUNO_TOKEN, YES_PRINT_ALERTS_TOKEN, CHAT_ID_SAHIL, CHAT_ID_YES_PRINT_GROUP } = process.env;

// const botToken = BRUNO_TOKEN;
const botToken = YES_PRINT_ALERTS_TOKEN;

// const chatId = CHAT_ID_SAHIL; // 711263195 (number)
const chatId = CHAT_ID_YES_PRINT_GROUP; // 711263195 (number)


async function main() {
    try {
        const payload = { chat_id: chatId, text: "Don't Panic!", parse_mode: "HTML" };
        const res = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, payload);
        // console.log("🚀 ~ res:", res.data);
        console.log('res.data.ok', res.data.ok); // `true`
    } catch (error) {
        console.log("🚀 ~ error:", error);
    }
}
main();
