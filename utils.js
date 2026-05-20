// https://github.com/telegraf/telegraf/issues/1242#issuecomment-1489968508
// https://core.telegram.org/bots/api#markdownv2-style
const SPECIAL_CHARS = [
    '\\',
    '_',
    '*',
    '[',
    ']',
    '(',
    ')',
    '~',
    '`',
    '>',
    '<',
    '&',
    '#',
    '+',
    '-',
    '=',
    '|',
    '{',
    '}',
    '.',
    '!'
];
export const escapeMarkdownForTelegramMessage = (text) => {
    SPECIAL_CHARS.forEach(char => (text = text.replaceAll(char, `\\${char}`)));
    return text;
};