#!/usr/bin/env node
export * from './lib/async';
export * from './lib/number';
import { program } from 'commander';

import { checkSrtPath } from './lib/helper';
import { Parser } from './parser';

program
  .requiredOption('-s, --srt <source>', 'srt file path')
  .option('-o, --output <output>', 'fileout name [deafault current]')
  .option('-r, --rate <rate>', 'rate')
  .option('-event, --event <event>', 'event name');

program.parse(process.argv);

if (program.opts().srt) {
  const srtParam = program.opts().srt;
  const outputParam = program.opts().output || '.';
  if (checkSrtPath(srtParam)) {
    Parser(srtParam, outputParam);
  }
  // const rateParam = program.opts().rate || 30

}
