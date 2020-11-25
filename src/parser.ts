import chalk from 'chalk';
import * as fs from 'fs-extra';
import { map, parse } from 'subtitle';
// import { parse, resync, stringify } from 'subtitle';
import { v4 as uuidv4 } from 'uuid';
import formater from 'xml-formatter';

import { resources } from './constants/resources';
import { CueTempate, cueType, MainTemplate } from './template';

type ParserParam = {
  readonly srtPath: string;
  readonly outputPath: string;
  readonly eventName: string;
  readonly rateKey?: string;
  readonly projectName?: string;
  readonly gap?: number;
};
function runParse(params: ParserParam) {
  const list = [];
  fs.createReadStream(params.srtPath)
    .pipe(parse())
    .pipe(
      map((node) => {
        if (node.type === 'cue') {
          // eslint-disable-next-line functional/immutable-data
          node.data.text = node.data.text.replace(/"/g, '&#34;');
        }
        return node;
      })
    )
    .on('data', (node) => {
      // eslint-disable-next-line functional/immutable-data
      list.push(node);
    })
    .on('error', (err) => {
      console.log(chalk.blue.bgRed.bold(err));
    })
    .on('finish', () => {
      const lastCue: cueType = list.slice(-1)[0];
      const totalCueTime = lastCue.data.end;
      const fileName = params.srtPath.replace(/(.+)\/(.+)$/, '$2');
      const projectName = params.projectName || fileName;
      const outputPath = params.outputPath + '/' + fileName + '.fcpxml';
      const eventName = params.eventName || 'srt2fcpxml_node';
      const resourceConfig = resources[params.rateKey];
      const gap = params.gap
      const config = {
        cuesTempate: CueTempate(list, resourceConfig, gap).join(''),
        project: {
          name: projectName,
          uid: uuidv4(),
          modDate: 'today',
        },
        event: {
          name: eventName,
          uid: uuidv4(),
        },
        totalCueTime: totalCueTime,
        resources: resourceConfig,
        gap
      };
      const fcpXMl = MainTemplate(config, resourceConfig);
      const fcpxmlFile = fs.createWriteStream(outputPath);
      const formattedXml = formater(fcpXMl);
      fcpxmlFile.write(formattedXml);
      fcpxmlFile.end(() => {
        console.log(
          chalk.greenBright.bold(`success! the output file are ${outputPath}`)
        );
      });
    });
}
export const Parser = (params: ParserParam) => {
  return runParse(params);
};
