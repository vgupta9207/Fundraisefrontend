import axios from 'axios';
import React, { useState } from 'react'
import { types } from './App';
// DEposit form is rendered here
const DepositInput = ({ state, dispatch }) => {
    const [formInputs, setFormInputs] = useState({
        ccNumber: "",
        expiryDate: "",
        cvv: "",
        amount: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target
        setFormInputs({ ...formInputs, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formInputs);
        console.log(state.currentUser);
        axios.post(`/transactions/deposit/`, { ...formInputs, sender: state.currentUser, type: 'deposit' })
            .then(res => {
                dispatch({ type: types.SET_ACTIVE, active: { title: '', param: '' } })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="card my-3">
            <div className="card-body">

                <div className="row justify-content-center">
                    <div className="mt-3 col-6">
                        <h4 className="fw-bold mb-3 text-center">DEPOSIT</h4>
                        <form onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">CC Number</label>
                                        <input type="text" required name="ccNumber" value={formInputs.ccNumber} onChange={onChange} className="form-control" />
                                    </div>

                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label className="form-label">Expiry Date</label>
                                        <input type="text" required name="expiryDate" value={formInputs.expiryDate} onChange={onChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label className="form-label">CVV</label>
                                        <input type="text" required name="cvv" value={formInputs.cvv} onChange={onChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">Amount (in $)</label>
                                        <input type="text" required name="amount" value={formInputs.amount} onChange={onChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <button className='btn btn-success w-100' type='submit'>DEPOSIT</button>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepositInput