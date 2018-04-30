import React from 'react'
import Box from './Box.js'

const sansFamily = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif'
const serifFamily = 'Georgia, serif'

export default function Type ({
  serif,
  center,
  right,
  style,
  italic,
  bold,
  fontSize = 16,
  lineHeight = 1.4,
  className,
  children,
  ...props
}) {
  const attrs = {
    width: '100%',
    style: Object.assign({
      fontFamily: serif ? serifFamily : sansFamily,
      textAlign: center ? 'center' : right ? 'right' : 'left',
      fontSize: fontSize + 'px',
      lineHeight: (fontSize * lineHeight) + 'px',
      msoLineHeightRule: 'exactly',
      color: 'inherit',
      fontWeight: bold ? 'bold' : 'normal',
      fontStyle: italic ? 'italic' : 'normal',
      display: 'inline-block',
      width: '100%'
    }, style)
  }

  return (
    <Box center={center} right={right} {...props}>
      <span {...attrs} className={className}>{children}</span>
    </Box>
  )
}

export function createType (defaults) {
  return props => <Type {...defaults} {...props} />
}
