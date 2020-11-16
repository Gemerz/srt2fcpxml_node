export * from './lib/async';
export * from './lib/number';
import { program } from 'commander';
import { Parser } from './parser';


program
    .requiredOption('-s, --srt <source>', 'srt file path')
    .option('-o, --output', 'fileout name [deafault current]')
    .option('-name, --pizza-type <type>', 'flavour of pizza');


program.parse(process.argv);


console.log('Options: ', program.opts());
console.log('Remaining arguments: ', program.args);
if (program.opts().srt) {
    const srtParam = program.opts().srt
    const srtParser = new Parser(srtParam, ".");
    srtParser.init()
}