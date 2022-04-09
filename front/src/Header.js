
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { types } from './App';
//
const Header = ({ dispatch }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('/users')
            .then(res => {
                if (res.data.length) {
                    dispatch({ type: types.SET_USER, user: res.data[0]._id })
                    setUsers(res.data)
                }
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <div className="navbar-brand" onClick={() => dispatch({ type: types.SET_ACTIVE, active: { title: '', param: '' } })}>FUNDRAISE</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="nav-link" onClick={() => dispatch({ type: types.SET_ACTIVE, active: { title: '', param: '' } })}>HOME</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" onClick={() => dispatch({ type: types.SET_ACTIVE, active: { title: 'deposit', param: '' } })}>DEPOSIT</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" to="/" data-bs-toggle="modal" data-bs-target="#exampleModal">CHANGE USER</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-body" style={{ height: '500px' }}>
                            <h5>Select a user</h5>
                            <div className="mt-3">
                                <select className="form-select" onChange={(e) => dispatch({ type: types.SET_USER, user: e.target.value })} defaultValue={users.length && users[0]._id} aria-label="Default select example">
                                    {users.map(user =>
                                        <option key={user?._id} value={user?._id}>{user?.fullName}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header