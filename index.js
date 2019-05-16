#!/usr/bin/env node --harmony

/**
 * @fileoverview Main CLI entry point that is run via the command 'cw'.
 * @author Jakob Wagner
 */

// Module dependencies
const program = require('commander');
const chalk = require('chalk');
const pjson = require('./package.json');

program
    .version(pjson.version)
    .option('-d, --date <date>', 'provide a specific Date')
    .action(function() {
        var parseDate = new Date();
        if(program.date) {
            parseDate = new Date(program.date);
        }
        result = getWeekNumber(parseDate);
        console.log('It\'s currently week ' + chalk.bold.cyan(result[1]) + ' of ' + chalk.bold.cyan(result[0]));
    })
    .parse(process.argv);


function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}
