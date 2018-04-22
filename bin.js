#! /usr/bin/env node
'use strict'

require('@babel/register')({
  plugins: [
    require.resolve('@babel/plugin-proposal-object-rest-spread')
  ],
  presets: [
    [require.resolve('@babel/preset-env'), {
      targets: {
        node: 'current'
      }
    }],
    require.resolve('@babel/preset-react')
  ]
})

require('./cli.js')
