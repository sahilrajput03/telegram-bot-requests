// @ts-nocheck
const { Cron, scheduledJobs } = require('croner');
const { app1DB } = require('./filedb');

const defaultOptns = { timezone: 'Asia/Kolkata' };
const workProgresJob = {
    name: 'WORK_PROGRESS_CHECK',
    pattern: '*/5 * * * * *',
    function: () => console.log(`Running work check job (every fifth second)`)
};

// & What do I want to do?
// [x] Be able to add a cronjob at runtime using setTimeout in this
//    file and store that cronjob to json file.
// [x] After above if I restart this program then it should load
//    cronjob and should not add it again as I'm checing against
//    `scheduledJobs` on program start to prevent adding unless already
//    added.

// Shape of a job: `{name, pattern}`
const aauJobs = app1DB.get().agents?.aau?.jobs || [];
if (aauJobs.length > 0) {
    // Load and start jobs from file  
    aauJobs.forEach(j => {
        new Cron(j.pattern, { name: j.name, ...defaultOptns }, workProgresJob.function);
    });
    console.log("✅ Loaded aau's jobs.");
}

// If job not found then add fresh job
const notFoundInScheduledJobs = !scheduledJobs.map(j => j.name).find(name => name === "WORK_PROGRESS_CHECK");
if (notFoundInScheduledJobs) {
    console.log('🚀 No `workProgresJob` found.');
    const job = new Cron(workProgresJob.pattern, { name: workProgresJob.name, ...defaultOptns }, workProgresJob.function);
    // Add cronjob to fileDB
    app1DB.update(db => { db.agents?.aau?.jobs.push(workProgresJob); });
    console.log('✅ Created `workProgresJob` & updated to `fileDB.json`.');
}
