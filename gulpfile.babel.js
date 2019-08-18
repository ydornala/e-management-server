import {task, parallel} from 'gulp';
import nodemon from 'nodemon';

const onLog = (log) => {
    console.log(log.message);
}

task('start:server', () => {
    console.log('task');
    nodemon(`-w index.js index.js`)
        .on('log', onLog); 
});

// task('default', ['start:server']);