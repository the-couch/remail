import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import Document from './components/Document.js'
import A from './components/A.js'
import Box from './components/Box.js'
import Table from './components/Table.js'
import Type, { createType } from './components/Type.js'
import Columns from './components/Columns.js'
import Image from './components/Image.js'

function render (comp) {
  return renderToStaticMarkup(comp)
}

export {
  Document,
  A,
  Box,
  Table,
  Type,
  createType,
  Columns,
  Image,
  render
}
