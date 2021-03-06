import React from 'react'
import { PropTypes } from 'prop-types'
import { useDeepState } from 'use-deep-state'
import './index.css'

const initialState = {
    users: [
        {
            name: 'Adam Smith',
            age: 27,
            address: {
                line1: '123 Main St.',
                line2: 'Apt 101',
                city: 'San Francisco',
                state: 'CA',
                zip: '94103',
            },
        },
        {
            name: 'Barbara Jones',
            age: 31,
            address: {
                line1: '300 Madison Ave.',
                line2: '',
                city: 'Chicago',
                state: 'IL',
                zip: '60606',
            },
        },
        {
            name: 'Chris Lee',
            age: 16,
            address: {
                line1: '1801 N. Miami Dr.',
                line2: '',
                city: 'Miami',
                state: 'FL',
                zip: '33132',
            },
        },
        {
            name: 'David Lopez',
            age: 42,
            address: {
                line1: '5432 27th St.',
                line2: 'Apt 789',
                city: 'New York',
                state: 'NY',
                zip: '10023',
            },
        },
        {
            name: 'Ellen Anderson',
            age: 15,
            address: {
                line1: '2917 North Ave.',
                line2: '',
                city: 'Washington',
                state: 'DC',
                zip: '20012',
            },
        },
    ],
    selectedUserIndex: 0,
}

const DisplayUser = ({ user }) => {
    return (
        <div>
            <h2>{user.name}</h2>
            <div>Age: {user.age}</div>
            <br />
            <div>
                Address:
                <div className="">
                    {user.address.line1} {user.address.line2},
                    <br />
                    {user.address.city}, {user.address.state} {user.address.zip}
                </div>
            </div>
        </div>
    )
}
DisplayUser.propTypes = {
    user: PropTypes.any,
}

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

const App = () => {
    const { state, setState, getStateAt, setStateAt } = useDeepState(initialState)

    const selectUser = selectedUserIndex => {
        setState({ selectedUserIndex })
    }

    const newUser = {
        name: 'Frank White',
        age: 24,
        address: {
            line1: '345 Palms Ave.',
            line2: '',
            city: 'Beverly Hills',
            state: 'CA',
            zip: '90034',
        },
    }

    return (
        <div>
            <h1>use-deep-state</h1>
            <div className="">Custom React hook to manage a deeply nested state </div>
            <br />
            <div className="d-flex">
                <div className="">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Street Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.users.map((user, userIndex) => {
                                const address = user.address
                                return (
                                    <tr key={userIndex}>
                                        <td>
                                            <button
                                                className="btn-link"
                                                onClick={() => {
                                                    selectUser(userIndex)
                                                }}>
                                                {user.name}
                                            </button>
                                        </td>
                                        <td>{user.age}</td>
                                        <td>
                                            {address.line1} {address.line2}
                                        </td>
                                        <td>{address.city}</td>
                                        <td>{address.state}</td>
                                        <td>{address.zip}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="" style={{ marginLeft: '1rem' }}>
                    <DisplayUser user={state.users[state.selectedUserIndex]} />
                </div>
            </div>
            <br />
            <div>
                <button
                    onClick={() => {
                        setStateAt(['users', state.users.length], newUser)
                    }}>
                    Add User
                </button>
                &nbsp;
                <button
                    onClick={() => {
                        setStateAt(['users', 0, 'address', 'city'], 'Oakland')
                    }}>
                    Change City of First User
                </button>
            </div>
            <br />
            <br />
            <div className="">
                <h3>Users below 30 years</h3>
                <div className="">
                    <code className="">getStateAt(['users', user => user.age &lt; 30])</code>
                </div>
                <br />
                <div className="">
                    <code className="">{JSON.stringify(getStateAt(['users', user => user.age < 30]))}</code>
                </div>
            </div>
            <br />
            <div className="">
                <h3>Cities and states of users who are minors</h3>
                <div className="">
                    <code className="">getStateAt(['users', user => user.age &lt; 30, 'address', ['city', 'state']])</code>
                </div>
                <br />
                <div className="">
                    <code className="">{JSON.stringify(getStateAt(['users', user => user.age < 18, 'address', ['city', 'state']]))}</code>
                </div>
            </div>
            <br />
            <div className="">
                <Example />
            </div>
        </div>
    )
}
export default App
