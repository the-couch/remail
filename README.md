# remail
Email component library for React.

## Install
```
npm i remail --save
```

# Usage
Rough example below. Full API coming soon.
```javascript
import React from 'react'
import { Document, Box, Image, Type, A, Columns, Raw } from 'remail'

export default function Template ({ foo, bar }) {
  return (
    <Document title='My Email Template'>
      <Box width="100%" height="100%" background='whitesmoke' space={[0, 16, 0, 16]}>
        <Box id='root' center width={600} space={[0, 0, 48, 0]}>
          <Type fontSize={32} lineHeight={1.2}>
            I'm an email!
          </Type>

          <Image
            src=''
            alt=''
            href='' />

          <A href=''>I'm a link</A>

          <Columns>
            <A href=''>Twitter</A>
            <A href=''>Instagram</A>
          </Columns>

          <Raw output={`
            <!-- This is arbitrary templating code you may need for you ESP -->

            {% for item in cart.items %}
          `} />
          <MyLineItemComponent />
          <Raw output={`
            {% endfor %}
          `} />
        </Box>
      </Box>
    </Document>
  )
}
```

## CLI
`remail` includes a handy CLI. Any additional flags (denoted with a preceding
`--`) will be passed directly to the `default` export of the specified template
file.

### `build`
Compile and render to `dest` folder:
```
remail build path/to/template.js path/to/dest
```
### `watch`
Watch for changes in the current working directory, compile and render to `dest` folder:
```
remail watch path/to/template.js path/to/dest
```
### `copy`
Compiles and renders template to system clipboard:
```
remail copy path/to/template.js
```

## License
MIT License © [The Couch](https://thecouch.nyc)
