import fs from 'fs-extra'
import path from 'path'
import chokidar from 'chokidar'
import React from 'react'
import { render as renderEmail } from './index.js'
import clipboardy from 'clipboardy'
import chalk from 'chalk'
import cmd from 'node-cmd'

const { _, ...props } = require('minimist')(process.argv.slice(2))

const mode = _[0]
const cwd = process.cwd()
const filePath = path.resolve(cwd, _[1])
const fileName = path.basename(filePath).split('.')[0] + '.html'
const outDir = _[2] || 'dist'
const outDirPath = path.resolve(cwd, outDir)
const outFilePath = path.resolve(outDir, fileName)

// console.log('mode', mode)
// console.log('filePath', filePath)
// console.log('fileName', fileName)
// console.log('outDir', outDir)
// console.log('outDirPath', outDirPath)
// console.log('outFilePath', outFilePath)

const Template = require(filePath).default

function render(changedFilePath) {
  // delete require.cache[file]
  // Template = require(file).default

  fs.outputFile(outFilePath, renderEmail(<Template {...props} />), err => {
    if (err) console.log(chalk.red('error'), err)

    console.log(
      chalk.inverse('clare-emails'),
      chalk.green('built'),
      fileName,
      chalk.green('to'),
      outDir
    )
  })
}

if (mode === 'build') {
  console.log(
    chalk.inverse('clare-emails'),
    chalk.green('building to'),
    outDir
  )

  render()
} else if (mode === 'copy') {
  clipboardy.writeSync(renderEmail(<Template {...props} />))

  console.log(
    chalk.inverse('clare-emails'),
    chalk.green('built'),
    fileName,
    chalk.green('to'),
    'clipboard'
  )
} else if (mode === 'watch') {
  console.log(
    chalk.inverse('clare-emails'),
    chalk.green('watching'),
    fileName
  )

  function renderChange () {
    cmd.get(`clare build ${filePath} ${outDir}`, (err, data, stderr) => {
      if (err) console.log(chalk.red('error'), err)

      console.log(
        chalk.inverse('clare-emails'),
        chalk.green('built'),
        fileName,
        chalk.green('to'),
        outDir
      )
    })
  }

  chokidar.watch(cwd, {
    ignored: [
      /(^|[\/\\])\../,
      /node_modules/
    ]
  })
    .on('ready', renderChange)
    .on('change', renderChange)
}
