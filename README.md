# srt2fcpxml

[![chloe-lam](https://circleci.com/gh/chloe-lam/srt2fcpxml_node.svg?style=shield)](https://circleci.com/gh/chloe-lam/srt2fcpxml_node)

> the srt subtitle file is converted to a final cut pro subtitle

[online document](https://chloe-lam.github.io/srt2fcpxml_node/)

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

## thanks:

### go version:

[https://github.com/GanymedeNil/srt2fcpxml](https://github.com/GanymedeNil/srt2fcpxml)
