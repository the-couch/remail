import fs from 'fs-extra'
import path from 'path'
import chokidar from 'chokidar'
import React from 'react'
import { render as renderEmail } from './index.js'
import clipboardy from 'clipboardy'
import chalk from 'chalk'
import cmd from 'node-cmd'
import decache from 'decache'

const {
  _: files,
  c,
  w,
  o,
  data,
  ...props
} = require('minimist')(process.argv.slice(2))

const cwd = process.cwd()
const outDir = o || 'dist'
const outDirPath = path.resolve(cwd, outDir)

const dataObject = data ? require(path.resolve(cwd, data)).default : null

function render (filepath) {
  const Template = require(filepath).default
  return renderEmail(<Template {...props} data={dataObject} />)
}

function build (paths) {
  console.log(
    chalk.inverse('remail'),
    chalk.green(`building ${paths.length} emails to`),
    outDir
  )

  paths.map(f => {
    fs.outputFile(path.resolve(outDir, f[1]), render(f[0]), err => {
      if (err) console.log(chalk.red('error'), err)

      console.log(
        chalk.inverse('remail'),
        chalk.green('built'),
        f[1],
        chalk.green('to'),
        outDir
      )
    })
  })
}

function copy (paths) {
  if (paths.length > 1) {
    console.log(
      chalk.inverse('remail'),
      chalk.magenta('copying first file only')
    )
  }

  const file = paths[0]
  const Template = require(file[0]).default

  clipboardy.writeSync(render(file[0]))

  console.log(
    chalk.inverse('remail'),
    chalk.green('copied'),
    file[1],
    chalk.green('to'),
    'clipboard'
  )
}

function run (watching) {
  const paths = files.map(f => {
    return [
      path.resolve(cwd, f),
      path.basename(f).split('.')[0] + '.html'
    ]
  })

  // console.log(paths)

  if (watching || (!c && !w)) {
    build(paths)
  } else if (c) {
    copy(paths)
  } else if (w) {
    console.log(
      chalk.inverse('remail'),
      chalk.green(`watching ${paths.length} emails`)
    )

    chokidar.watch(cwd, {
      ignored: [
        /(^|[\/\\])\../,
        /node_modules/,
        outDirPath
      ]
    })
      .on('ready', () => run(true))
      .on('change', path => {
        decache(path)
        paths.map(p => decache(p[0]))
        run(true)
      })
  }
}

run()
