ionic-webpack
=============

Ionic Webpack Starter

## Quick Start

Clone the repository

```bash
$ git clone https://github.com/cmackay/ionic-webpack.git
```

Install the dependencies

```bash
$ npm install
```

Watch Mode (this will run the webpack dev server)

```bash
$ gulp watch
```

Adding Cordova Plugins

```bash
$ cordova plugins add ionic-plugin-keyboard cordova-plugin-console cordova-plugin-device
```

Adding Cordova Platforms

```bash
$ cordova platform add ios
```

Build

```bash
$ gulp && cordova build
```

Running in the emulator

```bash
$ cordova emulate ios
```
