// @ts-nocheck
const { Cron, scheduledJobs } = require('croner');
const { app1DB } = require('./filedb');

// Web: https://croner.56k.guru
// Docs: https://github.com/Hexagon/croner
// Example: https://chatgpt.com/c/6a0c9837-c090-83e8-aabc-7212219c85be

const aauJobs = app1DB.get().agents?.aau?.jobs || [];
// Shape of a job: `{name, pattern}`

// & What do I want to do?
// [x] Be able to add a cronjob at runtime using setTimeout in this
//    file and store that cronjob to json file.
// [x] After above if I restart this program then it should load
//    cronjob and should not add it again as I'm checing against
//    `scheduledJobs` on program start to prevent adding unless already
//    added.

const workProgresJob = {
    name: 'WORK_PROGRESS_CHECK',
    pattern: '*/5 * * * * *',
    function: () => console.log(`Running work check job (every fifth second)`)
};

// Load and start jobs from file  
aauJobs.forEach(j => {
    new Cron(j.pattern, { name: j.name }, workProgresJob.function);
});

// If job not found then add job dynamically after 2 secs
if (!scheduledJobs.map(j => j.name).find(name => name === "WORK_PROGRESS_CHECK")) {
    console.log('🚀 `workProgresJob` not found. Scheduled to be ran in 2 seconds.');
    setTimeout(() => {
        const job = new Cron(workProgresJob.pattern, { name: workProgresJob.name }, workProgresJob.function);
        // Add cronjob to fileDB
        app1DB.update(db => { db.agents?.aau?.jobs.push(workProgresJob); });
        console.log('✅ Added job successfully.');
    }, 2_000);
}



// Example of creating cronjob:
// const job = new Cron('*/5 * * * * *', { name: 'WORK_PROGRESS_CHECK' }, () => {
//     console.log('This will run every fifth second');
// });
// console.log("🚀 ~ job.name?", job.name);
// console.log("🚀 ~ scheduledJobs?", scheduledJobs.map(c => c.name));
