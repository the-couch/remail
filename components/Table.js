import React from 'react'

export default function Box({
  left,
  center,
  right,
  color,
  background,
  style,
  children,
  ...props
}) {
  const align = center ? 'center' : right ? 'right' : left ? 'left' : ''
  const width = props.width ? props.width : center ? 'auto' : false

  return (
    <table
      cellPadding='0'
      cellSpacing='0'
      border='0'
      align={align}
      width={width || '100%'}
      {...props}
      style={Object.assign(
        {
          tableLayout: 'fixed',
          margin: center ? '0 auto' : 0,
          backgroundColor: background || 'transparent',
          color: color || 'black',
        },
        style,
        width && width !== 'auto' ? {
          width: typeof width === 'string' ? width : `${width}px`,
          maxWidth: typeof width === 'string' ? width : `${width}px`
        } : {}
      )}>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}
