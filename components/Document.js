import React from 'react'
import PropTypes from 'prop-types'

const bodyStyle = {
  width: '100%',
  margin: 0,
  padding: 0,
  WebkitTextSizeAdjust: '100%',
  MsTextSizeAdjust: '100%',
}

export default function Email ({
  lang = 'en',
  title,
  headCSS,
  bodyCSS,
  background,
  style,
  width = 600,
  gutter = 16,
  children
}) {
  return (
    <html lang={lang} xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {headCSS && <style type="text/css">{headCSS}</style>}
      </head>
      <body style={Object.assign(bodyStyle, style)}>
        {bodyCSS && <style type="text/css">{bodyCSS}</style>}

        {children}
      </body>
    </html>
  )
}

Email.PropTypes = {
  title: PropTypes.string.required
}
