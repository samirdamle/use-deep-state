# use-deep-state

> Custom React hook to manage complex state with a deeply nested object.

[![NPM](https://img.shields.io/npm/v/use-deep-state.svg)](https://www.npmjs.com/package/use-deep-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-deep-state
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'use-deep-state'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [samirdamle](https://github.com/samirdamle)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
