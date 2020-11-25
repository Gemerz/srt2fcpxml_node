/**
 * checkout file exist
 */
import chalk from 'chalk';
import * as fs from 'fs-extra';

const log = console.log;
export const checkSrtPath = (srtPath: string): boolean => {
  if (!fs.existsSync(srtPath)) {
    log(chalk.red("the srt file doesn't exist at that path"));
    return false;
  }
  return true;
};

export const checkRate = (rate: string): boolean => {
  console.log('rate', rate);
  return true;
};
