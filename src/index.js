import * as React from 'react'

const clone = obj => JSON.parse(JSON.stringify(obj))

export const useDeepState = (initialState = {}) => {
    let [state, _setState] = React.useState(initialState)
    const setState = updates => {
        _setState((prevState) => {
            return { ...clone(prevState), ...updates }
        })
    }
    return [state, setState]
}
