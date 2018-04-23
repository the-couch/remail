import React from 'react'
import Table from './Table.js'

function padding (space) {
  let def = ''
  for (let i = 0; i < 4; i++) {
    const s = space[i]
    def += s ? typeof s === 'string' ? s : ` ${s}px` : ' 0'
  }
  return def
}

export default function Box({
  space,
  background,
  children,
  ...props
}) {
  return (
    <Table {...props}>
      <tr>
        <td
          bgcolor={background}
          style={Object.assign(
            space ? { padding: padding(space) } : {}
          )}>
          {children}
        </td>
      </tr>
    </Table>
  )
}
