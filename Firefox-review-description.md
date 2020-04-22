## How to build

It is recommended to use nvm to switch the node version.

OS: macOS or Windows 10
Node version: 8.16.0
NPM version: v6.4.1

Build steps:

 1. Run `npm ci` install dependencies.
 2. Run `npm run build`, and load extension at `dist-firefox` folder.

## Why I use `unsafe-eval` in CSP?

This is because when I developed this extension four years ago, I used Vue.js, which was still version 1.x, and it used `new Function` to compile the template string at runtime. Although it also provided a CSP compatible version at the time, I encountered some problems during the use (I have forgotten what the specific problem was), so I later used the version that is not compatible with CSP and added `unsafe-eval` in CSP settings.

## About Google Analytics

In fact, Google Analytics is no longer in my extension. You can view `src/public/ga.js`, and the code introduced into Google Analytics has been commented out. I have also deleted the Google Analytics URL in the CSP.
