import React from 'react'

function scale (x) {
  return x ? `${x}px` : 0
}

export default function Box({
  space = [ 0, 0, 0, 0 ],
  center,
  right,
  color,
  background,
  style,
  children,
  ...props
}) {
  const align = center ? 'center' : right ? 'right' : 'left'
  const width = props.width ? props.width : center ? 'auto' : '100%'

  return (
    <table
      cellPadding='0'
      cellSpacing='0'
      border='0'
      align={align}
      width={width}
      {...props}
      style={Object.assign({
        tableLayout: 'fixed',
        margin: center ? '0 auto' : 0,
        backgroundColor: background || 'transparent',
        color: color || 'black',
        width: props.width ? props.width + 'px' : '100%'
      }, style)}>
      <tbody>
        <tr>
          <td
            bgcolor={background}
            style={{
              padding: `${scale(space[0])} ${space[1]} ${scale(space[2])} ${scale(space[3])}`
            }}>
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
