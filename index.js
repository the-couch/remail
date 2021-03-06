import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import decode from 'ent/decode'

import Document from './components/Document.js'
import A from './components/A.js'
import Box from './components/Box.js'
import Table from './components/Table.js'
import Type, { createType } from './components/Type.js'
import Columns from './components/Columns.js'
import Col from './components/Col.js'
import Image from './components/Image.js'
import Raw from './components/Raw.js'

function render (comp) {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
  const markup = renderToStaticMarkup(comp)
  const parts = markup.split(/style="(?:[^"]*)"/gm)
  const styles = markup.match(/style="(?:[^"]*)"/gm)
  const escaped = parts.map((p, i) => decode(p) + ' ' + (styles[i] || '')).join(' ')
  return doctype + escaped
}

export {
  Document,
  A,
  Box,
  Table,
  Type,
  createType,
  Columns,
  Col,
  Image,
  Raw,
  render
}
