# srt2fcpxml

[![chloe-lam](https://circleci.com/gh/chloe-lam/srt2fcpxml_node.svg?style=shield)](https://circleci.com/gh/chloe-lam/srt2fcpxml_node)

> the srt subtitle file is converted to a final cut pro subtitle

[online document](https://chloe-lam.github.io/srt2fcpxml_node/)

# About FCPXML

[apple official online document](https://developer.apple.com/library/archive/documentation/FinalCutProX/Reference/FinalCutProXXMLFormat/Introduction/Introduction.html)

# installation

```js
npm i srt2fcpxml -g
```

# usage

```bash
Usage: srt2fcpxml [options]

Options:
  -V, --version            output the version number
  -s, --srt <source>       srt file path
  -o, --output <output>    output dir name [default current]
  -r, --rate <rate>        rate: default 30, AKA:23.98,24,25,29.87,30,50,59.94,60
  -e, --event <event>      event name
  -p, --project <project>  project name
  -c, --custom             use custom plugin
  -g, --gap <gap>          gap: number,default 3.6
  -h, --help               display help for command
```

## basic

```bash
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop
```

## FPS rate

```bash
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -r 23.98
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -r 40
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -r 25
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -r 29.87
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -r 30
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -r 50
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -r 59.94
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -r 60
```

## FCPX EventName

```bash
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop -e <eventname>
```

## FCPX projectName

```bash
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop  -p <projectName>
```

## FCPX custom subtitle plugin

```bash
srt2fcpxml -s ~/Desktop/test-vue.srt  -o ~/Desktop  -c
```

![FCPX custom subtitle plugin gif](https://user-images.githubusercontent.com/60084718/100301992-50cb3900-2fd4-11eb-864f-cedbdd2ad5e9.gif)

> using FCPX custom subtitle plugin flag will copy a subtitle plugin to your motion teamplate folder

## thanks:

### go version:

[https://github.com/GanymedeNil/srt2fcpxml](https://github.com/GanymedeNil/srt2fcpxml)
