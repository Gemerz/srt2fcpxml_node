import { resourcesType } from './constants/resources';
export type cueType = {
  readonly type: string;
  readonly data: {
    readonly start: number;
    readonly end: number;
    readonly text: string;
  };
};
type MainTemplateDataType = {
  readonly cuesTempate: string;
  readonly project: {
    readonly fileName: string;
    readonly uid: string;
    readonly modDate: string;
  };
  readonly event: {
    readonly name: string;
    readonly uid: string;
  };
  readonly totalCueTime: number;
  readonly resources: resourcesType;
};
export const MainTemplate = (
  data: MainTemplateDataType,
  resource: resourcesType
) => {
  const gapStart =
    3.6 * resource.frameDurationDenominator * resource.frameDurationMolecular;
  const gapDuration =
    Math.round((data.totalCueTime / 1000) * resource.frameRate) *
    resource.frameDurationMolecular;
  const sequenceDuration =
    Math.round((data.totalCueTime / 1000) * resource.frameRate) *
    resource.frameDurationMolecular;

  return `<?xml version="1.0" encoding="UTF-8" ?>
        <!DOCTYPE fcpxml>
        <fcpxml version="1.7">
        <resources>
            <format id="r1" name="FFVideoFormat1920x1080${data.resources.name}" frameDuration="${data.resources.frameDuration}" width="1920" height="1080" colorSpace="1-1-1 (Rec. 709)"></format>
            <effect id="r2" name="基本字幕" uid=".../Titles.localized/Bumper:Opener.localized/Basic Title.localized/Basic Title.moti"></effect>
        </resources>
        <library location="file:///Users/gemer/Movies/test-vue.fcpbundle">
            <event name="${data.event.name}" uid="${data.event.uid}">
                <project name="${data.project.fileName}" uid="${data.project.uid}" modDate="2020-11-16 13:22:32 +0800">
                    <sequence duration="${sequenceDuration}/${resource.frameDurationDenominator}s" format="r1" tcStart="0s" tcFormat="NDF" audioLayout="stereo" audioRate="48k">
                        <spine>
                            <gap name="空隙" offset="0s" duration="${gapDuration}/${resource.frameDurationDenominator}s" start="${gapStart}/${resource.frameDurationDenominator}s">
                                ${data.cuesTempate}
                            </gap>
                        </spine>
                    </sequence>
                </project>
            </event>
        </library>
    </fcpxml> 
    `;
};

export const CueTempate = (
  cue: readonly cueType[],
  resource: resourcesType,
) => {
  return Array.from(cue).map((item, key) => {
    const start = item.data.start / 1000 || 0;
    const end = item.data.end / 1000 || 0;
    const projectStart =
      3.6 * resource.frameDurationDenominator * resource.frameDurationMolecular;
    const offset =
      Math.round(start * resource.frameRate) * resource.frameDurationMolecular +
      projectStart;
    const duration =
      (Math.round((end - start) * resource.frameRate) *
        resource.frameDurationMolecular *
        120000.0) /
      resource.frameDurationDenominator;

    return ` <title name="${item.data.text}" lane="1" offset="${offset}/${resource.frameDurationDenominator
      }s" ref="r2" duration="${duration}/${resource.frameDurationDenominator
      }s" start="${projectStart}/${resource.frameDurationDenominator}s">
                    <param name="位置" key="9999/999166631/999166633/1/100/101" value="0 -450"></param>
                    <param name="对齐" key="9999/999166631/999166633/2/354/999169573/401" value="1 (居中)"></param>
                    <param name="展平" key="9999/999166631/999166633/2/351" value="1"></param>
                <text>
                    <text-style ref="ts${key + 1}">${item.data.text
      }</text-style>
                </text>
                <text-style-def id="ts${key + 1}">
                    <text-style font="PingFang SC" fontSize="52" fontFace="Semibold" fontColor="0.999993 1 1 1" bold="1" shadowColor="0 0 0 0.75" shadowOffset="5 315" alignment="center"></text-style>
                </text-style-def>
             </title>
        `;
  });
};
