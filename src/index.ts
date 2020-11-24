export * from './lib/async';
export * from './lib/number';
import { program } from 'commander';

import { Parser } from './parser';

program
  .requiredOption('-s, --srt <source>', 'srt file path')
  .option('-o, --output <output>', 'fileout name [deafault current]')
  .option('-r, --rate <rate>', 'rate')
  .option('-event, --event <event>', 'event name');

program.parse(process.argv);

console.log('Options: ', program.opts());
console.log('Remaining arguments: ', program.args);

if (program.opts().srt) {
  const srtParam = program.opts().srt;
  const outputParam = program.opts().output || '.';
  // const rateParam = program.opts().rate || 30
  Parser(srtParam, outputParam);
}
