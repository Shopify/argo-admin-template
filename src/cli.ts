#!/usr/bin/env node

import path from 'path';
import {build} from './build';
import {init} from './init';
import {server} from './server';

const argv = require('yargs').argv;
const {_: [command]} = argv;

console.log('command', command);
console.log('path', path.resolve('.'));

switch (command) {
  case 'init': init(); break;
  case 'build': build(); break;
  case 'server': server(); break;
  default: throw new Error(`Unknown command: ${command}`);
}
