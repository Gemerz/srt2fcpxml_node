import fs from 'fs';

// import { parse, resync, stringify } from 'subtitle';
import { map, parse } from 'subtitle';
import { v4 as uuidv4 } from 'uuid';
import formater from 'xml-formatter';

import { resources, resourcesEnum } from './constants/resources';
import { CueTempate, cueType, MainTemplate } from './template';


function runParse(srtPath: string, output: string) {
    const list = [];
    fs.createReadStream(srtPath)
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
        .on('error', console.error)
        .on('finish', () => {
            const lastCue: cueType = list.slice(-1)[0];
            const totalCueTime = lastCue.data.end;
            const fileName = srtPath.replace(/(.+)\/(.+)$/, '$2');
            const outputPath = output + '/' + fileName + '.fcpxml';
            const eventName = 'srt2fcpxml_node';
            const resourceConfig = resources[resourcesEnum.p2400];
            const config = {
                cuesTempate: CueTempate(list, resourceConfig).join(''),
                project: {
                    fileName: fileName,
                    uid: uuidv4(),
                    modDate: 'today',
                },
                event: {
                    name: eventName,
                    uid: uuidv4(),
                },
                totalCueTime: totalCueTime,
                resources: resourceConfig,
            };
            const fcpXMl = MainTemplate(config, resourceConfig);
            const fcpxmlFile = fs.createWriteStream(outputPath);
            const formattedXml = formater(fcpXMl);
            fcpxmlFile.write(formattedXml);
            fcpxmlFile.on('finish', () => {
                console.log('输出成功！！');
            });
        });
    // .pipe(resync(-100))
    // .pipe(stringify({ format: 'WebVTT' }))
    // .pipe(fs.createWriteStream('./my-subtitles.vtt'))
}
export const Parser = (srtPath: string, output: string) => {
    return runParse(srtPath, output)
}

