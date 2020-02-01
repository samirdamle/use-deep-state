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
            age: 21,
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
            age: 36,
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
    const [state, setState] = useDeepState(initialState)
    const selectUser = selectedUserIndex => {
        setState({ selectedUserIndex })
    }
    const newUser = {
        name: 'Ellen White',
        age: 19,
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
            <h2>Select User</h2>
            <div>
                {state.users.map((user, userIndex) => (
                    <div key={userIndex} className="list-item">
                        <button
                            className="btn-link"
                            onClick={() => {
                                selectUser(userIndex)
                            }}>
                            {user.name}
                        </button>
                    </div>
                ))}
            </div>
            <br />
            <div>
                <button
                    onClick={() => {
                        setState(['users', state.users.length], newUser)
                    }}>
                    Add User
                </button> &nbsp;
                <button
                    onClick={() => {
                        setState(['users', 0, 'address', 'city'], 'Oakland')
                    }}>
                    Change City of User 1
                </button>
            </div>
            <br />
            <DisplayUser user={state.users[state.selectedUserIndex]} />
            <br />
        </div>
    )
}
export default App
