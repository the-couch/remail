import React from 'react'

export default function A ({
  title,
  href,
  children,
  ...props
}) {
  return (
    <a
      title={title}
      href={href}
      target='_blank'
      >
      {children}
    </a>
  )
}
