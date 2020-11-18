import fs from 'fs'
// import { parse, resync, stringify } from 'subtitle';
import { v4 as uuidv4 } from 'uuid';
import { parse, map } from 'subtitle';
import formater from 'xml-formatter';
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
            .pipe(
                map(node => {
                    if (node.type === 'cue') {
                        node.data.text = node.data.text.replace(/"/g, "&#34;")
                    }
                    return node
                })).on('data', node => {
                    list.push(node)
                })
            .on('error', console.error)
            .on('finish', () => {
                const lastCue: cueType = list.slice(-1)[0]
                const totalCueTime = lastCue.data.end
                const fileName = srtPath.replace(/(.+)\/(.+)$/, '$2')
                const eventName = "srt2fcpxml_node"
                const resourceConfig = resources[resourcesEnum.p2400]
                const config = {
                    cuesTempate: CueTempate(list, resourceConfig).join(''),
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
                const fcpXMl = MainTemplate(config, resourceConfig)
                const fcpxmlFile = fs.createWriteStream('./test-vue.fcpxml')
                var formattedXml = formater(fcpXMl);
                fcpxmlFile.write(formattedXml)
            })
        // .pipe(resync(-100))
        // .pipe(stringify({ format: 'WebVTT' }))
        // .pipe(fs.createWriteStream('./my-subtitles.vtt'))
    }
}