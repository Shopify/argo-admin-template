#!/usr/bin/env node

import yargs from 'yargs';
import {build} from './build';
import {init} from './init';
import {server} from './server';

(async function run() {
  yargs
    .command(
      'init',
      'initialize project',
      (_yargs) =>
        _yargs.options({
          type: {type: 'string', demandOption: true},
        }),
      init
    )
    .command(
      'server',
      'run local server',
      (_yargs) =>
        _yargs.options({
          type: {type: 'string', demandOption: true},
          entry: {type: 'string', demandOption: true},
          port: {type: 'number', demandOption: true},
        }),
      server
    )
    .command(
      'build',
      'build project',
      (_yargs) =>
        _yargs.options({
          entry: {type: 'string', demandOption: true},
        }),
      build
    )
    .strict().argv;
})();
