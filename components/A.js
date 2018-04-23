import React from 'react'

export default function A ({
  title,
  href,
  style,
  children,
  ...props
}) {
  return (
    <a
      title={title}
      href={href}
      target='_blank'
      style={style}
      {...props}>
      {children}
    </a>
  )
}
