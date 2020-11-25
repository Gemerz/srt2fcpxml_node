/**
 * checkout file exist
 */
import chalk from 'chalk';
import * as fs from 'fs-extra';

import { resourcesEnum } from '../constants/resources';

const log = console.log;
export const checkSrtPath = (srtPath: string): boolean => {
  if (!fs.existsSync(srtPath)) {
    log(chalk.red("the srt file doesn't exist at that path"));
    return false;
  }
  return true;
};

export const checkRate = (rate: string): boolean => {
  const keys = Object.keys(resourcesEnum);
  if (!keys.includes(rate)) {
    log(
      chalk.red(
        "the input rate doesn't match, example: 23.98,24,25,29.87,30,50,59.94,60"
      )
    );
    return false;
  }
  return true;
};
export const formateRateKey = (rate: string): string => {
  if (rate) {
    return 'p' + (parseFloat(rate) * 100).toString();
  } else {
    return resourcesEnum.p3000;
  }
};
