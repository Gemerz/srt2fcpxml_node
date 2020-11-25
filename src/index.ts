#!/usr/bin/env node
export * from './lib/async';
export * from './lib/number';
import * as root from 'app-root-path';
import { program } from 'commander';

import { resourcesEnum } from './constants/resources';
import { checkSrtPath } from './lib/helper';
import { Parser } from './parser';

program
  .requiredOption('-s, --srt <source>', 'srt file path')
  .option('-o, --output <output>', 'fileout name [deafault current]')
  .option('-r, --rate <rate>', 'rate:AKA:23.98,24,25,29.87,30,50,59.94,60')
  .option('-e, --event <event>', 'event name');

program.parse(process.argv);

if (program.opts().srt) {
  const srtParam = program.opts().srt;
  const outputParam = program.opts().output || root.path;
  const rateParam = program.opts().rate || resourcesEnum.p2400;
  const eventName = program.opts().event || 'srt2fcpxml_node';
  for (let i in resourcesEnum) {
    console.log(i)
  }
  if (checkSrtPath(srtParam)) {
    Parser({
      srtPath: srtParam,
      outputPath: outputParam,
      eventName,
      rateKey: rateParam,
    });
  }
}
