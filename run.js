var schedule = require('node-schedule');
const sheduler_run=require('./app.js');
/*var rule = new schedule.RecurrenceRule();
rule.minute = 1;*/

var j = schedule.scheduleJob(' 15 8 * * *', function(){
    sheduler_run.sheduler();
    console.log('The answer to life, the universe, and everything!');
});

/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/