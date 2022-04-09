import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { types } from './App';

const DetailCard = ({ state, dispatch }) => {
    const [data, setData] = useState([])
    const [amount, setAmount] = useState()
    const donateRef = useRef()
    //on component render get all fundraise of provided params value that is get from useReducer state.active value and when state.active value and state.refetch value changes, get all fundraise again
    useEffect(() => {
        if (state.active?.param || state.refetch) {
            axios.get(`/fundraises/${state.active?.param}`)
                .then(res => {
                    setData(res.data)
                })
                .catch(err => console.log(err))
            dispatch({ type: types.SET_REFETCH, refetch: false })
        }
    }, [state.active?.param, state.refetch])


    //onDontate button click, get amount value from amount and post data and dispatch function call and set refetch true in useReducer
    const onDonate = () => {
        //donateRef is use to close modal
        donateRef.current.click()
        if (amount && state.currentUser) {
            axios.post(`/transactions/donate`, { amount: Number(amount), fundraise: state.active?.param, sender: state.currentUser, type: 'donation' })
                .then(res => {
                    if (res.data?.error) return alert(res.data.error.message)
                    dispatch({ type: types.SET_REFETCH, refetch: true })
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="card my-3">
            <div className="card-body p-5 ">
                <div className="row">
                    <div className="col-8">
                        <h2 className='fw-bold text-uppercase'>{data?.title}</h2>
                        <h4>{data?.description}</h4>
                        <p>{data?.summary}</p>
                        <button ref={donateRef} className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal1">Donate</button>
                    </div>
                    <div className="col-4">
                        <div>
                            <div className="d-flex justify-content-between">
                                <h5>Donations</h5>
                                <h5>{data?.totalDonators}</h5>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5>Goal</h5>
                                <h5>{data?.goal}</h5>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h3>Collected</h3>
                                <h3>${data?.collected}</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-body py-4 text-center">
                            <h5 className='text-center'>Select amount to donate</h5>
                            <div className="d-flex justify-content-center my-4">
                                <button className={`btn btn-outline-secondary ${amount === 50 ? 'active' : ''}`} onClick={() => setAmount(50)}>50</button>
                                <button className={`btn btn-outline-secondary ${amount === 100 ? 'active' : ''}`} onClick={() => setAmount(100)}>100</button>
                                <button className={`btn btn-outline-secondary ${amount === 250 ? 'active' : ''}`} onClick={() => setAmount(250)}>250</button>
                                <button className={`btn btn-outline-secondary ${amount === 500 ? 'active' : ''}`} onClick={() => setAmount(500)}>500</button>
                                <button className={`btn btn-outline-secondary ${amount === 1000 ? 'active' : ''}`} onClick={() => setAmount(1000)}>1000</button>
                            </div>
                            <button className='btn btn-primary' onClick={onDonate}>Donate</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCard