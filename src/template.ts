import { constants } from './constants/constants';
import { pluginType } from './constants/plugin';
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
  readonly cuesTemplate: string;
  readonly project: {
    readonly name: string;
    readonly uid: string;
    readonly modDate: string;
  };
  readonly event: {
    readonly name: string;
    readonly uid: string;
  };
  readonly totalCueTime: number;
  readonly resources: resourcesType;
  readonly gap?: number;
  readonly isUsePlugin?: boolean;
};
export const MainTemplate = (
  data: MainTemplateDataType,
  resource: resourcesType
) => {
  const gap = data.gap || 3.6;
  const gapStart =
    gap * resource.frameDurationDenominator * resource.frameDurationMolecular;
  const gapDuration =
    Math.round((data.totalCueTime / 1000) * resource.frameRate) *
    resource.frameDurationMolecular;
  const sequenceDuration =
    Math.round((data.totalCueTime / 1000) * resource.frameRate) *
    resource.frameDurationMolecular;
  const pluginPath = data.isUsePlugin ? pluginType.custom : pluginType.base
  /* cSpell:disable */
  return `<?xml version="1.0" encoding="UTF-8" ?>
        <!DOCTYPE fcpxml>
        <fcpxml version="1.7">
        <resources>
            <format id="r1" name="FFVideoFormat1920x1080${data.resources.name}" frameDuration="${data.resources.frameDuration}" width="1920" height="1080" colorSpace="1-1-1 (Rec. 709)"></format>
            <effect id="r2" name="字幕" uid="${pluginPath}"></effect>
        </resources>
        <library location="file:///Users/gemer/Movies/test-vue.fcpbundle">
            <event name="${data.event.name}" uid="${data.event.uid}">
                <project name="${data.project.name}" uid="${data.project.uid}" modDate="2020-11-16 13:22:32 +0800">
                    <sequence duration="${sequenceDuration}/${resource.frameDurationDenominator}s" format="r1" tcStart="0s" tcFormat="NDF" audioLayout="stereo" audioRate="48k">
                        <spine>
                            <gap name="空隙" offset="0s" duration="${gapDuration}/${resource.frameDurationDenominator}s" start="${gapStart}/${resource.frameDurationDenominator}s">
                                ${data.cuesTemplate}
                            </gap>
                        </spine>
                    </sequence>
                </project>
            </event>
        </library>
    </fcpxml> 
    `;
};

export const CueTemplate = (
  cue: readonly cueType[],
  resource: resourcesType,
  gap = 3.6,
  isUsePlugin = false
) => {
  return Array.from(cue).map((item, key) => {
    const start = item.data.start / 1000 || 0;
    const end = item.data.end / 1000 || 0;
    const projectStart =
      gap * resource.frameDurationDenominator * resource.frameDurationMolecular;
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
                    ${pluginTemplate(isUsePlugin)}
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

const pluginTemplate = (isUsePlugin = false): string => {
  const base = ` <param name="位置" key="9999/999166631/999166633/1/100/101" value="0 -450"></param>
  <param name="对齐" key="9999/999166631/999166633/2/354/999169573/401" value="1 (居中)"></param>
  <param name="展平" key="9999/999166631/999166633/2/351" value="1"></param>`
  const custom = `<param name="位置" key="9999/10199/10201/1/100/101" value="0 -445.000"/>
  <param name="对齐" key="9999/10199/10201/2/354/1002961760/401" value="1 (居中)"/><param name="Scale X" key="9999/1825768416/100/1825768417/2/100" value="0.03333333333333333"/>
  <param name="Scale Y" key="9999/1825768479/100/1825768480/2/100" value="0.03333333333333333"/>
  <param name="Build In" key="9999/10000/2/101" value="0"/>
  <param name="Build Out" key="9999/10000/2/102" value="0"/>
  <param name="Opacity" key="9999/1825768325/10003/10045/1/200/202" value="0.7"/>
  <param name="BG Color" key="9999/1825768325/10003/10045/2/353/113/111" value="0 0 0"/>
  <param name="Out Sequencing" key="9999/10199/10201/4/10233/201/202" value="0 (到)"/>`
  return isUsePlugin ? custom : base
}