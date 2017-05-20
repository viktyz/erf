#!/usr/bin/env node

const program = require('commander')
const cnc = require('../src/cnc')
const content = require('../src/content')
const name = require('../src/name')

program
    .command('cnc [source_string] [target_string]')
    .description('change source name and content to target name and content')
    .action(function (first, second) {

        cnc(first,second);
    });

program
    .command('content [source_content] [target_content]')
    .description('change source content to target content')
    .action(function (first, second) {

        content(first,second);
    });

program
    .command('name [source_name] [target_name]')
    .description('change source name to target name')
    .action(function (first, second) {

        name(first,second);
    });

program.parse(process.argv);