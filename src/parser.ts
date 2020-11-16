import fs from 'fs'
// import { parse, resync, stringify } from 'subtitle';
import { v4 as uuidv4 } from 'uuid';
// import { cueTempate } from './template';
import { parse } from 'subtitle';
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
        // console.log(workspaceName)
        const list = [];
        fs.createReadStream(srtPath)
            .pipe(parse())
            .on('data', node => {
                list.push(node)
            })
            .on('error', console.error)
            .on('finish', () => {
                console.log('list', list)
                console.log('uuidv4', uuidv4())
            })
        // .pipe(resync(-100))
        // .pipe(stringify({ format: 'WebVTT' }))
        // .pipe(fs.createWriteStream('./my-subtitles.vtt'))
    }
}