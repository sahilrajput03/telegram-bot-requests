const { Cron, scheduledJobs } = require('croner');

// Web: https://croner.56k.guru
// Docs: https://github.com/Hexagon/croner
// ChatGPT: https://chatgpt.com/c/6a0c9837-c090-83e8-aabc-7212219c85be
// Deepwiki: https://deepwiki.com/search/i-want-to-load-cronjobs-from-a_dca296ea-5665-45bd-8067-f34cf5eea214?mode=fast


// Example of creating cronjob:
const job = new Cron('*/5 * * * * *', { name: 'WORK_PROGRESS_CHECK' }, () => {
    console.log('This will run every fifth second');
});
console.log("🚀 ~ job.name?", job.name);
console.log("🚀 ~ scheduledJobs?", scheduledJobs.map(c => c.name));