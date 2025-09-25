# README

Visit: [Guide on .env encryption](https://github.com/sahilrajput03/devopswithkubernetes/tree/main/learn-sops#encrypting-decrypting-env-file) (#sops)

**Quick Links:**

- Styled text with message entities: [Click here](https://core.telegram.org/api/entities)
- Can i get token for my own telegram account as well so i can send messages via telegram api call? [ChatGPT](https://chatgpt.com/c/68d4e3da-0230-8328-8021-24f1d0c0fd00)
  - tldr; Use [gramjs](https://github.com/gram-js/gramjs)

## Bot Libraries:

- **Javascript:**
  - `telegraf`:
    - Github: [Click here](https://github.com/telegraf/telegraf) 8.9k\*
    - Docs: [Click here](https://telegraf.js.org/)
  - `gramjs` - (NodeJS/Browser MTProto API Telegram client library)
    - Github: [Click here](https://github.com/gram-js/gramjs) 1.6k\*
    - A Telegram client written in JavaScript for Node.js and browsers, with its core being based on Telethon.
- **Python:**
  - Python: `telethon`: Pure Python 3 MTProto API Telegram client library, for bots too!
    - Github: [Click here](https://github.com/LonamiWebs/Telethon) 6.4K\*

## Setup webhook for your bot

Source: [ChatGPT](https://chatgpt.com/c/68d42f89-fde8-8324-8993-14b288d101e1)

- ❤️ You can create webhook via - `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://yourdomain.com/webhook`
  - ✅ Now, you can handle the post requests to handle incoming messages to the bot.
- ❤️ You can delete the webhook via - `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/deleteWebhook`

## Telegram Calling Bot

### ️1. Official Telegram audio/video call api docs: AWESOME:DOCS

[Click here](https://core.telegram.org/api/end-to-end/video-calls) _[NOT TESTED]_

### 2. ❤️ Telegram radio experiment Using `lemonjamsbot` (My Latest Experiment)

[Click here](https://github.com/sahilrajput03/lemonjamsbot), [lemonjamsbot](https://github.com/tgcallsjs/LemonJamsBot)

### 3. Using `magnaluna` and `php-libtgvoip`

- `magnaluna`: [Github](https://github.com/danog/magnaluna)
- `php-libtgvoip`: [Github](https://github.com/danog/php-libtgvoip)

```sh
# Installation
sudo apt-get install libopus-dev libssl-dev build-essential php7.4-dev php7.4
git clone https://github.com/copernicamarketingsoftware/PHP-CPP && cd PHP-CPP && make -j$(nproc) && sudo make install && cd ..
git clone --recursive https://github.com/danog/php-libtgvoip && cd php-libtgvoip && make && sudo make install

# Installs the XML extension for PHP 7.4.
sudo apt-get install php7.4-xml
# Installs the Multibyte String (mbstring) extension for PHP 7.4.
sudo apt-get install php7.4-mbstring

# Download magnaluna script
wget https://github.com/danog/magnaluna/raw/master/magna.php

 # Run magnaluna script
php magna.php
# FYI: When asked for number use 918360****** and use automated process to login instead of using the user api and api_tokens.
```

Thanks.
