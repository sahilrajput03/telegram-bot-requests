// @ts-nocheck
const path = require('path');
const fs = require('fs');
const YAML = require("yaml");

const connectToFileDB = (filepath, initialStateOfDB, serializer) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }
    if (!fs.existsSync(filepath)) { fs.writeFileSync(filepath, serializer.stringify(initialStateOfDB, null, 2)); }

    return {
        get: () => {
            return serializer.parse(fs.readFileSync(filepath, 'utf8'));
        },
        update(cb) {
            if (typeof cb === 'function') {
                const db = this.get();
                cb(db);
                fs.writeFileSync(filepath, serializer.stringify(db, null, 2));
            } else {
                fs.writeFileSync(filepath, serializer.stringify(cb, null, 2));
            }
        }
    };
};

// Usage:
const serializer = JSON;
// const serializer = YAML;

const filename = 'fileDB' + (serializer === JSON ? '.json' : '.yaml');
const filepathApp1DB = path.join(__dirname, filename);
// console.log("🚀 ~ filepathApp1DB?", filepathApp1DB);

// Learn:
//  1. Using `initialDbState` as `{}` is recommended as compared to
//     `[]` because db is generally a collections (object) having
//     documents (arrays).
// 	2. Use `{}` if you want initial state of db as empty
const initialStateOfApp1DB = {
    "agents": {
        "aau": {
            "jobs": []
        }
    }
};
const app1DB = connectToFileDB(filepathApp1DB, initialStateOfApp1DB, serializer);
// console.log('db?', app1DB.get());

// Update type 1 [Tested ✅]
// app1DB.update(db => {
//     db.dates.push(new Date().toString());
//     db.createdAt = new Date();
// });
// console.log('db after updates (1)?:', app1DB.get());

// Update type 2 [Tested ✅]
// const { user: { name }, dates } = app1DB.get();
// const updatedName = name.includes('Rajput') ? name : `${name} Rajput`;
// app1DB.update({ user: { name: updatedName }, dates, createdAt: new Date() });
// console.log('db after updates (2)?:', app1DB.get());


module.exports = { app1DB };
