import React from 'react'
import cx from 'classnames'
import Box from './Box.js'

export default function Columns ({ wrap, className, children, ...props }) {
  return (
    <Box className={cx(className, 'columns')} {...props}>
      <tr>
        {children.map(c => {
          return (
            <td className={cx('column', {
              'column--wrap': wrap
            })}>{c}</td>
          )
        })}
      </tr>
    </Box>
  )
}
