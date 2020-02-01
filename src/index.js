import * as React from 'react'

const clone = obj => JSON.parse(JSON.stringify(obj))

const deepValue = (obj, pathArray, value) => {
    const get = (obj, pathArray) => pathArray.reduce((item, prop) => (item && item[prop] ? item[prop] : null), obj)
    if (value === undefined) {
        return get(obj, pathArray)
    } else {
        const node = get(obj, pathArray.slice(0, -1))
        if (node && typeof node === 'object') {
            node[pathArray.slice(-1)] = value
            return obj
        } else {
            return null
        }
    }
}

const useDeepState = (initialState = {}) => {
    let [state, _setState] = React.useState(initialState)
    const setState = (updates = {}, value = null) => {
        if (Array.isArray(updates) && updates.length > 0) {
            const pathArray = [...updates]
            const newState = deepValue(clone(state), pathArray, value)
            if (newState) _setState(newState)
        } else if (typeof updates === 'object') {
            _setState(prevState => {
                return { ...clone(prevState), ...updates }
            })
        }
    }
    return [state, setState]
}

export default useDeepState
export { useDeepState }
