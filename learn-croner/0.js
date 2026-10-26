const { Cron, scheduledJobs } = require('croner');

// ^ Tip: Open this file in VsCode via alias `code.cron` directly.

// Web: https://croner.56k.guru
// Docs: https://github.com/Hexagon/croner
// ChatGPT: https://chatgpt.com/c/6a0c9837-c090-83e8-aabc-7212219c85be
// Deepwiki: https://deepwiki.com/search/i-want-to-load-cronjobs-from-a_dca296ea-5665-45bd-8067-f34cf5eea214?mode=fast

/*
┌──────────────── (optional) SECOND (0 - 59)
│ ┌────────────── MINUTE (0 - 59)
│ │ ┌──────────── HOUR (0 - 23)
│ │ │ ┌────────── DAY-OF-MONTH (1 - 31)
│ │ │ │ ┌──────── MONTH (1 - 12, JAN-DEC; JAN=1)
│ │ │ │ │ ┌────── DAY-OF-WEEK (0 - 6, SUN-SAT; SUN=0 or 7)
│ │ │ │ │ │
│ │ │ │ │ │ ┌──── (optional) YEAR (1 - 9999)
│ │ │ │ │ │ │
* * * * * * *
1 2 3 4 5 6 7

👉🏻 Optional second and year fields for enhanced precision:
- 5-field format:         MINUTE  HOUR  DAY-OF-MONTH  MONTH  DAY-OF-WEEK
- 6-field format: SECOND  MINUTE  HOUR  DAY-OF-MONTH  MONTH  DAY-OF-WEEK
- 7-field format: SECOND  MINUTE  HOUR  DAY-OF-MONTH  MONTH  DAY-OF-WEEK  YEAR
- Supported year range: 1-9999
*/
const job = new Cron('*/5 * * * * *', { name: 'WORK_PROGRESS_CHECK' }, () => {
    console.log('This will run every fifth second');
});
console.log("🚀 ~ job.name?", job.name);
console.log("🚀 ~ scheduledJobs?", scheduledJobs.map(c => c.name));
