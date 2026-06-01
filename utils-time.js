// Usage: `getHumanReadableIndianTimeFromDate(new Date())`
// Note: Always specify the `timeZone` because `toLocaleString` uses the
//          system's local time zone. Without it, logs may vary if the server runs in a
//          different time zone.
// 20/2/2025, 9:07:18 pm
export const getHumanReadableIndianTimeFromDate = (date) => date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Output: 20/2/2025, 9:07:18 pm

// 20/2/2025, 9:07:18 pm
export const getHumanReadableIndianTime = () => getHumanReadableIndianTimeFromDate(new Date());


export function sleep(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
}