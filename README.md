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
import { useDeepState } from 'use-deep-state'

const Example = () => {
    const initialState = {
        user: {
            name: 'John Smith',
            age: 21
        },
        verified: false
    }
    const [state, setState] = useDeepState(initialState)
    const verify = (evt) => { setState({ verified: true }) }
    return (
        <div>{state.user.name}, {state.user.age} <button onClick={verify}>Verify</button></div>
    )
}
```

## License

MIT © [samirdamle](https://github.com/samirdamle)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
