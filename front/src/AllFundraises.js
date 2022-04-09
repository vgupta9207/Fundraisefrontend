import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FundraisesCard from './FundraisesCard'

const AllFundraises = ({ dispatch }) => {
    const [data, setData] = useState([])
    //on component render get all fundraises and set to data
    useEffect(() => {
        axios.get(`/fundraises/`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="card my-3">
            <div className="card-body">
                <h4 className='fw-bold'>All Fundraises</h4>
                {data.length ?
                    <div className="row">
                        {/*List all fundraises and pass props to FndraisesCard component*/}
                        {data.map(d => (
                            <div key={d?._id} className="col-6">
                                <FundraisesCard data={d} dispatch={dispatch} />
                            </div>

                        ))}
                    </div> :
                    "Fundraises list empty"
                }
            </div>
        </div>
    )
}

export default AllFundraises