import React from 'react'
import cx from 'classnames'
import Table from './Table.js'

export default function Columns ({ className, children, ...props }) {
  return (
    <Table className={cx(className, 'columns')} {...props} style={{
      tableLayout: 'auto' // override default of 'fixed'
    }}>
      <tr>
        {children}
      </tr>
    </Table>
  )
}
