const { Cron, scheduledJobs } = require('croner');
const { getHumanReadableIndianTime } = require('../utils-time');

console.log('🚀Program Started:', getHumanReadableIndianTime());

// Every 2 hours from 12pm to 6pm: 0 0 12-18/2 * * 1-5

// Every 2 minutes from 12min to 42min
const job = new Cron("0-12/3 18 1 * *", { name: 'WORK_PROGRESS_CHECK' }, () => {
    console.log('Every 2 minutes from 12min to 42min');
    console.log('CRON: WORK_PROGRESS_CHECK:', getHumanReadableIndianTime());
});
console.log("🚀 ~ job.name?", job.name);
console.log("🚀 ~ scheduledJobs?", scheduledJobs.map(c => c.name));

