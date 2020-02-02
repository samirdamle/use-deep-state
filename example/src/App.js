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
            <h1>{user.name}</h1>
            <div>Age: {user.age}</div>
            <div>
                Address: {user.address.line1} {user.address.line2}, {user.address.city}, {user.address.state} {user.address.zip}
            </div>
        </div>
    )
}
DisplayUser.propTypes = {
    user: PropTypes.any,
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
            line1: '345 Rodeo Dr.',
            line2: '',
            city: 'Beverly Hills',
            state: 'CA',
            zip: '90034',
        },
    }

    return (
        <div>
            <div>
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
            <DisplayUser user={state.users[state.selectedUserIndex]} />
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
        </div>
    )
}
export default App
