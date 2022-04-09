import React from 'react'
import { types } from './App';

const FundraisesCard = ({ data, dispatch }) => {
    return (
        <div className="card my-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <h5>{data?.title}</h5>
                    </div>
                    <div className="col-3 text-end">
                        Goal: ${data?.goal}
                    </div>
                    <div className="col-3 text-end">
                        <button className='btn btn-outline-secondary' onClick={() => dispatch({ type: types.SET_ACTIVE, active: { title: 'donate', param: data?._id } })}>DETAILS</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FundraisesCard