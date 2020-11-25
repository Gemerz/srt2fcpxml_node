#!/usr/bin/env node
export * from './lib/async';
export * from './lib/number';
export { Parser } from './parser';
import * as path from 'path';

import * as root from 'app-root-path';
import { program } from 'commander';
import * as fs from 'fs-extra';

import { checkRate, checkSrtPath, formateRateKey } from './lib/helper';
import { Parser } from './parser';

const packageJson = fs.readJsonSync(
  path.resolve(__dirname, '../../', 'package.json')
);
program
  .version(packageJson.version)
  .requiredOption('-s, --srt <source>', 'srt file path')
  .option('-o, --output <output>', 'output dir name [default current]')
  .option(
    '-r, --rate <rate>',
    'rate: default 30, AKA:23.98,24,25,29.87,30,50,59.94,60'
  )
  .option('-e, --event <event>', 'event name')
  .option('-p, --project <project>', 'project name')
  .option('-g, --gap <gap>', 'gap: number,default 3.6');

program.parse(process.argv);

if (program.opts().srt) {
  const srtParam = program.opts().srt;
  const outputParam = program.opts().output || root.path;
  const rateParam = formateRateKey(program.opts().rate);
  /* cSpell:disable */
  const eventName = program.opts().event || 'srt2fcpxml_node';
  const projectName = program.opts().project;
  const gap = parseFloat(program.opts().gap);

  if (checkSrtPath(srtParam) && checkRate(rateParam)) {
    Parser({
      srtPath: srtParam,
      outputPath: outputParam,
      eventName,
      rateKey: rateParam,
      projectName,
      gap,
    });
  }
}
