
interface cueType {
    type: string,
    data: {
        start: number,
        end: number,
        text: string
    }
}
interface MainTemplateDataType {
    cues: string[]
    config: {

    },
    event: {
        name: string,
        uid: string
    }

}
export const MainTemplate = (data: MainTemplateDataType) => {
    return `
    <?xml version="1.0" encoding="UTF-8" ?>
        <!DOCTYPE fcpxml>
        <fcpxml version="1.7">
        <resources>
            <format id="r1" name="FFVideoFormat1920x1080p5994" frameDuration="1001/60000s" width="1920" height="1080" colorSpace="1-1-1 (Rec. 709)"></format>
            <effect id="r2" name="基本字幕" uid=".../Titles.localized/Bumper:Opener.localized/Basic Title.localized/Basic Title.moti"></effect>
        </resources>
        <library location="file:///~/Movies/Day%20in%20the%20Life%20of%20a%20Japanese%20Game%20Programmer.pl.fcpbundle">
            <event name="${data.event.name}" uid="${data.event.uid}">
                <project name="Day in the Life of a Japanese Game Programmer.pl" uid="70863902-8e92-4265-8f01-850c5006b6df" modDate="2020-11-16 13:22:32 +0800">
                    <sequence duration="49808759/60000s" format="r1" tcStart="0s" tcFormat="NDF" audioLayout="stereo" audioRate="48k">
                        <spine>
                            <gap name="空隙" offset="0s" duration="49808759/60000s" start="216216000/60000s">
                                {${data.cues}}
                            </gap>
                        </spine>
                    </sequence>
                </project>
            </event>
        </library>
    </fcpxml> 
    `
}

export const cueTempate = (cue: cueType[]) => {
    return Array.from(cue).forEach((item, key) => {
        console.log(item, key)
        return `
            <title name="${item.data.text}" lane="1" offset="216216000/60000s" ref="ts${key + 1}" duration="346346/120000s" start="216216000/60000s">
                <param name="位置" key="9999/999166631/999166633/1/100/101" value="0 -450"></param>
                <param name="对齐" key="9999/999166631/999166633/2/354/999169573/401" value="1 (居中)"></param>
                <param name="展平" key="9999/999166631/999166633/2/351" value="1"></param>
                <text>
                    <text-style ref="ts${key + 1}">${item.data.text}</text-style>
                </text>
                <text-style-def id="ts${key + 1}">
                    <text-style font="PingFang SC" fontSize="52" fontFace="Semibold" fontColor="0.999993 1 1 1" bold="1" shadowColor="0 0 0 0.75" shadowOffset="5 315" alignment="center"></text-style>
                </text-style-def>
             </title>
        `
    })

}