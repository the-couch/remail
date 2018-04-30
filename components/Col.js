import React from 'react'
import cx from 'classnames'

export default function Col ({ className, children, ...props }) {
  return (
    <td className={cx('column', className)} {...props}>{children}</td>
  )
}
