import fs from 'fs'
// import { parse, resync, stringify } from 'subtitle';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'subtitle';
import { MainTemplate, CueTempate, cueType } from './template';
import { resources, resourcesEnum } from './constants/resources';
export class Parser {
    private srtPath: string = '';
    private workspaceName: string = '.';
    constructor(srtPath: string, workspaceName: string) {
        this.srtPath = srtPath
        this.workspaceName = workspaceName
    }
    init() {
        this.runParse(this.srtPath, this.workspaceName);
    }
    runParse(srtPath: string, workspaceName: string): void {
        console.log(workspaceName)
        const list = [];
        fs.createReadStream(srtPath)
            .pipe(parse())
            .on('data', node => {
                list.push(node)
            })
            .on('error', console.error)
            .on('finish', () => {
                const lastCue: cueType = list.slice(-1)[0]
                const totalCueTime = lastCue.data.end
                const fileName = srtPath.replace(/(.+)\/(.+)$/, '$2')
                const eventName = "srt2fcpxml_node"
                const resourceConfig = resources[resourcesEnum.p6000]
                const config = {
                    cuesTempate: CueTempate(list).join(''),
                    project: {
                        fileName: fileName,
                        uid: uuidv4(),
                        modDate: "today",
                    },
                    event: {
                        name: eventName,
                        uid: uuidv4()
                    },
                    totalCueTime: totalCueTime,
                    resources: resourceConfig
                }
                const fcpXMl = MainTemplate(config)
                const fcpxmlFile = fs.createWriteStream('./t.fcpxml')
                fcpxmlFile.write(fcpXMl)
                console.log('fcpXMl', fcpXMl)
            })
        // .pipe(resync(-100))
        // .pipe(stringify({ format: 'WebVTT' }))
        // .pipe(fs.createWriteStream('./my-subtitles.vtt'))
    }
}