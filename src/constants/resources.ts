export enum resourcesEnum {
  p2398 = 'p2398',
  p2400 = 'p2400',
  p2500 = 'p2500',
  p2997 = 'p2997',
  p3000 = 'p3000',
  p5000 = 'p5000',
  p5994 = 'p5994',
  p6000 = 'p6000',
}
export type resourcesType = {
  readonly name: string;
  readonly duration: string;
  readonly frameDuration: string;
  readonly frameRate: number;
  readonly frameDurationMolecular: number;
  readonly frameDurationDenominator: number;
};
export const resources = {
  p2398: {
    name: 'p2398',
    duration: '2400s',
    frameDuration: '1001/24000s',
    frameRate: 23.98,
    frameDurationMolecular: 1001,
    frameDurationDenominator: 24000,
  },
  p2400: {
    name: 'p2400',
    duration: '2400s',
    frameDuration: '100/2400s',
    frameRate: 24,
    frameDurationMolecular: 100,
    frameDurationDenominator: 2400,
  },
  p2500: {
    name: 'p2500',
    duration: '2500s',
    frameDuration: '100/2500',
    frameRate: 25,
    frameDurationMolecular: 100,
    frameDurationDenominator: 2500,
  },
  p2997: {
    name: 'p2997',
    duration: '3000s',
    frameDuration: '1001/30000s',
    frameRate: 29.97,
    frameDurationMolecular: 1001,
    frameDurationDenominator: 30000,
  },
  p3000: {
    name: 'p3000',
    duration: '3000s',
    frameDuration: '100/3000s',
    frameRate: 30,
    frameDurationMolecular: 100,
    frameDurationDenominator: 3000,
  },
  p5000: {
    name: 'p5000',
    duration: '5000s',
    frameDuration: '100/5000s',
    frameRate: 50,
    frameDurationMolecular: 100,
    frameDurationDenominator: 5000,
  },
  p5994: {
    name: 'p2398',
    duration: '6000s',
    frameDuration: '1001/60000s',
    frameRate: 50,
    frameDurationMolecular: 1001,
    frameDurationDenominator: 60000,
  },
  p6000: {
    name: 'p6000',
    duration: '6000s',
    frameDuration: '100/6000s',
    frameRate: 60,
    frameDurationMolecular: 100,
    frameDurationDenominator: 6000,
  },
};
