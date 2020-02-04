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
            name: 'John Cleese',
            age: 30,
            activities: [
                { id: 'WORK', name: 'Working', active: true },
                { id: 'PLAY', name: 'Playing', active: false },
            ],
        },
        verified: false,
    }

    const { state, setState, getStateAt, setStateAt } = useDeepState(initialState)

    const verify = () => {
        setState({ verified: true })
    }

    const goPlay = () => {
        setStateAt(['user', 'activities', activity => activity.id === 'PLAY', 0, 'active'], true)
    }

    const { user, verified } = state

    const playing = getStateAt(['user', 'activities', activity => activity.id === 'PLAY', 0, 'active'])

    return (
        <div>
            <div>
                {user.name}, {user.age} {verified && <span> - Verified</span>}
            </div>
            <br />
            <div>
                <button onClick={verify}>Verify</button>
                <button onClick={goPlay}>Go play!</button>
            </div>
            <br />
            <div>{playing ? <span>Yay, let's play!</span> : <span>Need to work.</span>}</div>
        </div>
    )
}
```

## License

MIT © [samirdamle](https://github.com/samirdamle)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
