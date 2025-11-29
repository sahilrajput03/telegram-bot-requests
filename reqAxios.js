const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ quiet: true });

const { BRUNO_TOKEN, CHAT_ID_SAHIL } = process.env;

const chatId = CHAT_ID_SAHIL; // 711263195 (number)
const botToken = BRUNO_TOKEN;

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
