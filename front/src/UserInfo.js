import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserInfo = ({ state }) => {
    const [user, setUser] = useState({})
    //on component render get current user info with provided state.currentUser get form useReducer and set to user and when currentUser changes, get current user info again and set to user
    useEffect(() => {
        if (state.currentUser)
            axios.get(`/users/${state.currentUser}`)
                .then(res => {
                    setUser(res.data)
                })
                .catch(err => console.log(err))
    }, [state.currentUser, state.refetch])

    return (
        <div className="card my-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6 text-center">
                        <h5>{user?.fullName}</h5>
                    </div>
                    <div className="col-sm-6 text-center">
                        <h5>Balance<b> ${user?.depositBalance}</b></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo