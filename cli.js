const fs = require('fs-extra')
const path = require('path')
const chokidar = require('chokidar')
const React = require('react')
const { render: renderEmail } = require('./index.js')
const clipboardy = require('clipboardy')
const chalk = require('chalk')
const cmd = require('node-cmd')

// import fs from 'fs-extra'
// import path from 'path'
// import chokidar from 'chokidar'
// import React from 'react'
// import { render as renderEmail } from './index.js'
// import clipboardy from 'clipboardy'
// import chalk from 'chalk'
// import cmd from 'node-cmd'

const { _, mock } = require('minimist')(process.argv.slice(2))

const mode = _[0]
const file = path.resolve(_[1])
const filename = path.basename(file).split('.')[0] + '.html'
const outfile = path.resolve(__dirname, 'dist', filename)

let Template = require(file).default

function render(changedPath) {
  delete require.cache[file]
  Template = require(file).default

  fs.outputFile(outfile, renderEmail(<Template mock />), err => {
    if (err) console.log(chalk.red('error'), err)

    console.log(
      chalk.inverse('clare-emails'),
      chalk.green('rendered'),
      filename,
      chalk.green('to'),
      'dist'
    )
  })
}

if (mode === 'build') {
  if (mock) {
    render()
  } else {
    clipboardy.writeSync(renderEmail(<Template />))

    console.log(
      chalk.inverse('clare-emails'),
      chalk.green('rendered'),
      filename,
      chalk.green('to'),
      'clipboard'
    )
  }
} else if (mode === 'watch') {
  console.log(
    chalk.inverse('clare-emails'),
    chalk.green('watching'),
    filename
  )

  function renderChange () {
    cmd.get(`clare build ${file} --mock`, (err, data, stderr) => {
      if (err) console.log(err)

      console.log(
        chalk.inverse('clare-emails'),
        chalk.green('rendered'),
        filename,
        chalk.green('to'),
        'dist'
      )
    })
  }

  chokidar.watch(['components/*.js', 'templates/*.js', 'styles/*.js'])
    .on('ready', renderChange)
    .on('change', renderChange)
}
