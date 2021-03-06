import React from 'react'
import A from './A.js'
import Box from './Box.js'

export default function Img ({ src, alt, href, width, height, style, className, ...props }) {
  const img = (
    <img
      alt={alt}
      src={src}
      width={width || 600}
      height={height || 'auto'}
      className={className}
      style={Object.assign({
        display: 'block',
        outline: 'none',
        border: 'none',
        textDecoration: 'none',
        maxWidth: (width || 600) + 'px'
      }, style)}
    />
  )

  return (
    <Box width={width} {...props}>
      {href ? (
        <A href={href} title={alt}>{img}</A>
      ) : (
        img
      )}
    </Box>
  )
}
