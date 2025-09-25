# README

Visit: [Guide on .env encryption](https://github.com/sahilrajput03/devopswithkubernetes/tree/main/learn-sops#encrypting-decrypting-env-file) (#sops)

**Quick Links:**

- Styled text with message entities: [Click here](https://core.telegram.org/api/entities)

## Setup webhook for your bot

Source: [ChatGPT](https://chatgpt.com/c/68d42f89-fde8-8324-8993-14b288d101e1)

- ❤️ You can create webhook via - `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://yourdomain.com/webhook`
  - ✅ Now, you can handle the post requests to handle incoming messages to the bot.
- ❤️ You can delete the webhook via - `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/deleteWebhook`

## For telegram calling bot, checkout:

```bash
# Telegram Calling Bot
# ====================

https://github.com/danog/magnaluna
https://github.com/danog/php-libtgvoip

sudo apt-get install libopus-dev libssl-dev build-essential php7.4-dev php7.4
git clone https://github.com/copernicamarketingsoftware/PHP-CPP && cd PHP-CPP && make -j$(nproc) && sudo make install && cd ..
git clone --recursive https://github.com/danog/php-libtgvoip && cd php-libtgvoip && make && sudo make install

sudo apt-get install php7.4-xml
sudo apt-get install php7.4-mbstring
wget https://github.com/danog/magnaluna/raw/master/magna.php && php magna.php
# FYI: When asked for number use 918360****** and use automated process to login instead of using the user api and api_tokens.
```

```bash
# official telegram audio/video call api docs: AWESOME:DOCS
https://core.telegram.org/api/end-to-end/video-calls

# See my latest testing with telegram-radio thing (readme.md includes how to use):
https://github.com/sahilrajput03/lemonjamsbot

# For bots only(imo ~ Sahil):
# 5.6k Stars on github: https://github.com/telegraf/telegraf
# Docs: https://telegraf.js.org/

# gramjs - Github 427 Stars (NodeJS/Browser MTProto API Telegram client library,)
https://github.com/gram-js/gramjs
A Telegram client written in JavaScript for Node.js and browsers, with its core being based on Telethon.

# LemonJamsBot - https://github.com/tgcallsjs/LemonJamsBot

# Telethon - Github 6.4K Stars - Pure Python 3 MTProto API Telegram client library, for bots too!
https://github.com/LonamiWebs/Telethon

```
