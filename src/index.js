import * as React from 'react'

const clone = obj => JSON.parse(JSON.stringify(obj))

const deepDive = (obj = {}, path = [], value) => {
    /*
     * @param {object}            obj={ }           Object in which you want to find a value or set a value deep inside.
     *
     * @param {string | Array}    path=[ ]          Path of the value specified as string -
     *                                              e.g. 'users.2.address.city' will get/set the city of the address of the 3rd user in the users array in obj.
     *                                              or an array -
     *                                              e.g. ['users', 2, 'address', 'city'] does the same as above.
     *
     * @param {any}               [value]           Optional value - if provided - will set the value of the node found at path to provided value.
     *                                              e.g. if path is 'users.2.address.city' and value is 'New York', then
     *                                              obj.users[2].address.city will be set to 'New York'.
     *                                              If value is not provided, then deeValue will get the value of the node at path and return it.
     *
     * @return {any}              val | obj | null  If value argument is not provided, returns the value of the node located at the path inside the object.
     *                                              e.g. path 'users.2.address.city' or ['users', 2, 'address', 'city'] will return obj.users[2].address.city.
     *
     *                                              If value argument is provided, returns the obj (that was provided as the first argument) modified with the
     *                                              value of the node located at the path inside the object set to value.
     *                                              e.g. path 'users.2.address.city' with value='New York' will return obj back with
     *                                              obj.users[2].address.city as 'New York'.
     *
     *                                              If a node is not found at the provided path, then null is return.
     * */

    const pathArray = typeof path === 'string' ? path.split('.') : Array.isArray(path) ? path : []

    // if value is not provided, deepDive will fetch and return the value of the node at the path given in pathArray
    const get = (obj, pathArray) => pathArray.reduce((item, prop) => (item && item[prop] ? item[prop] : null), obj)

    if (value === undefined) {
        return get(obj, pathArray)
    } else {
        // if value is provided, deepDive will set the value of the node at the path given in pathArray
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
        if (typeof updates === 'object') {
            _setState(prevState => {
                return { ...clone(prevState), ...updates }
            })
        }
    }

    const setStateAt = (path = {}, value = null) => {
        if ((Array.isArray(path) || typeof path === 'string') && path.length > 0) {
            const pathArray = [...path]
            const newState = deepDive(clone(state), pathArray, value)
            if (newState) _setState(newState)
        }
    }

    return { state, setState, setStateAt }
}

export default useDeepState
export { useDeepState }
