import React from 'react'
import { useDeepState } from 'use-deep-state'
// import './index.css'

// Types definitions
interface Address {
    line1: string
    line2: string
    city: string
    state: string
    zip: string
}

interface User {
    name: string
    age: number
    address: Address
}

interface Activity {
    id: string
    name: string
    active: boolean
}

interface AppState {
    users: User[]
    selectedUserIndex: number
}

interface ExampleState {
    user: {
        name: string
        age: number
        activities: Activity[]
    }
    verified: boolean
}

// Props interfaces
interface DisplayUserProps {
    user: User
}

const initialState: AppState = {
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

const DisplayUser: React.FC<DisplayUserProps> = ({ user }) => {
    return (
        <div>
            <h2>{user.name}</h2>
            <div>Age: {user.age}</div>
            <br />
            <div>
                Address:
                <div>
                    {user.address.line1} {user.address.line2},
                    <br />
                    {user.address.city}, {user.address.state} {user.address.zip}
                </div>
            </div>
        </div>
    )
}

const Example: React.FC = () => {
    const initialExampleState: ExampleState = {
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

    const { state, setState, getStateAt, setStateAt } = useDeepState<ExampleState>(initialExampleState)

    const verify = (): void => {
        setState({ verified: true })
    }

    const goPlay = (): void => {
        setStateAt(['user', 'activities', (activity: Activity) => activity.id === 'PLAY', 0, 'active'], true)
    }

    const { user, verified } = state

    const playing = getStateAt(['user', 'activities', (activity: Activity) => activity.id === 'PLAY', 0, 'active'])

    return (
        <div>
            <h3>Demo of getStateAt()</h3>
            <div>
                {user.name}, {user.age} {verified && <span> - Verified</span>}
            </div>
            <br />
            <div>
                <button className="btn btn-secondary me-2" onClick={verify}>
                    Verify
                </button>
                <button className="btn btn-secondary" onClick={goPlay}>
                    Go play!
                </button>
            </div>
            <br />
            <div>{playing ? <span>Yay, let's play!</span> : <span>Need to work.</span>}</div>
        </div>
    )
}

const App: React.FC = () => {
    const { state, setState, getStateAt, setStateAt } = useDeepState<AppState>(initialState)

    const selectUser = (selectedUserIndex: number): void => {
        setState({ selectedUserIndex })
    }

    const newUser: User = {
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
        <div className="container">
            <br />
            <h1>use-deep-state</h1>
            <p>Custom React hook to manage a deeply nested state </p>
            <p>The whole data table below is stored in a single state object. Click on a user to view their details. This is done by filtering the deep state. </p>
            <br />
            <div className="d-flex">
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
                                            <button className="btn btn-link" onClick={() => selectUser(userIndex)}>
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
                <div style={{ marginLeft: '1rem' }} className="border bg-light p-4 ms-4">
                    <DisplayUser user={state.users[state.selectedUserIndex]} />
                </div>
            </div>
            <br />
            <div>
                <h3>Mutating the deep state</h3>
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => {
                        setStateAt(['users', state.users.length], newUser)
                    }}>
                    Add User
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        setStateAt(['users', 0, 'address', 'city'], 'Oakland')
                    }}>
                    Change City of First User
                </button>
            </div>
            <br />
            <br />
            <div>
                <h3>Filter: Users below 30 years</h3>
                <div>
                    <code>getStateAt(['users', user =&gt; user.age &lt; 30])</code>
                </div>
                <br />
                <div>
                    <code>{JSON.stringify(getStateAt(['users', (user: User) => user.age < 30]))}</code>
                </div>
            </div>
            <br />
            <div>
                <h3>Filter: Cities and states of users who are minors</h3>
                <div>
                    <code>getStateAt(['users', user =&gt; user.age &lt; 30, 'address', ['city', 'state']])</code>
                </div>
                <br />
                <div>
                    <code>{JSON.stringify(getStateAt(['users', (user: User) => user.age < 18, 'address', ['city', 'state']]))}</code>
                </div>
            </div>
            <br />
            <div>
                <Example />
            </div>

            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default App
