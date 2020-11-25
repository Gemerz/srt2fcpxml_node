/**
 * checkout file exist
 */
import os from 'os';
import * as path from 'path';

import chalk from 'chalk';
import * as copydir from 'copy-dir';
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

export const copyPlugin = () => {
  const titlesPath = `${os.homedir()}/Movies/Motion Templates.localized/Titles.localized`;
  const pluginPath = path.resolve(
    __dirname,
    '../../../src/plugin/adaptive-background'
  );
  if (!fs.existsSync(titlesPath)) {
    /* cSpell:disable */
    log(
      chalk.red(
        'hey, your FCPX Motion is not a default path, please copy by yourself'
      )
    );
    /* cSpell:enable */
  }
  copydir.sync(
    pluginPath,
    titlesPath + '/adaptive-background',
    {
      utimes: true, // keep add time and modify time
      mode: true, // keep file mode
      cover: true, // cover file when exists, default is true
    },
    (error) => {
      if (error)
        log(chalk.red('hey, somethings wrong,please copy plugin by yourself'));
    }
  );
  log(chalk.greenBright('copy custom plugin done!'));
  return null;
};
