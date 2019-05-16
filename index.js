#!/usr/bin/env node --harmony

/**
 * @fileoverview Main CLI entry point that is run via the command 'cw'.
 * @author Jakob Wagner
 */

// Module dependencies
const program = require('commander');
const chalk = require('chalk');
const pjson = require('./package.json');

// *******************************
// Helper Functions
// *******************************

function getWeekNumber(d) {
  // Copy date so don't modify original
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

  // Get first day of year
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);

  // Return array of year and week number
  return [date.getUTCFullYear(), weekNo];
}

// **********************
// Public Interface
// **********************

program
  .version(pjson.version)
  .option('-d, --date <date>', 'provide a specific Date')
  .action(() => {
    const result = getWeekNumber(program.date ? new Date(program.date) : new Date());
    console.log(`It's calendar week ${chalk.bold.cyan(result[1])} in ${chalk.bold.cyan(result[0])}`);
  })
  .parse(process.argv);

export default { getWeekNumber };
