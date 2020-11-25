# srt2fcpxml

[![CircleCI]((https://circleci.com/gh/chloe-lam/srt2fcpxml_node.svg?style=shield)](https://circleci.com/gh/chloe-lam/srt2fcpxml_node)

> the srt subtitle file is converted to a final cut pro subtitle

[online document](https://chloe-lam.github.io/srt2fcpxml_node/)

# installation

```js
npm i srt2fcpxml -g
```

# usage

```bash
srt2fcpxml [options]


usage: srt2fcpxml [options]

Options:
-V, --version output the version number
-s, --srt <source> srt file path
-o, --output <output> fileout name [deafault current]
-r, --rate <rate> rate:AKA:23.98,24,25,29.87,30,50,59.94,60
-e, --event <event> event name
-p, --project <project> project name
-g, --gap <gap> gap: number,default 3.6
-h, --help display help for command
```

## basic

```bash
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop
```

## thanks:

### go version:

[https://github.com/GanymedeNil/srt2fcpxml](https://github.com/GanymedeNil/srt2fcpxml)
