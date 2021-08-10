import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Carriers = [
    { key: 1, value: "Mobitel" },
    { key: 2, value: "Dialog" },
    { key: 3, value: "Hutch" },
    { key: 4, value: "Airtel" },
    { key: 5, value: "Lanka Bell" },
    { key: 6, value: "Etisalat" }

]
function MobilePaymentPage(props) {

    const [ContinentValue, setContinentValue] = useState("mobile carrier")
    const [MobileNoValue, setMobileNoValue] = useState("")
    const [PINValue, setPINValue] = useState("")
    const [EmailValue, setEmailValue] = useState("")


    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

    const onMobileNoChange = (event) => {
        setMobileNoValue(event.currentTarget.value)
    }

    const onEmailChange = (event) => {
        setEmailValue(event.currentTarget.value)
    }

    const onPINChange = (event) => {
        setPINValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();


        if (!ContinentValue || !MobileNoValue || !PINValue || !EmailValue ) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            continents: ContinentValue,
            mobileno: MobileNoValue,
            email: EmailValue,
            pin: PINValue
        }

        Axios.post('/api/payment/mobilePayment', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Payment Successful')
                    props.history.push('/')
                } else {
                    alert('Failed to Process the Payment')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Payment Details</Title>
            </div>


            <Form onSubmit={onSubmit} >
                <br />
                <br />
                <label>Service Provider : </label>
                <select onChange={onContinentsSelectChange} value={ContinentValue}>
                    {Carriers.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />
                <label>Mobile Number</label>
                <Input
                    onChange={onMobileNoChange}
                    value={MobileNoValue}
                    maxLength="16"
                    pattern="[0-9\s]{13,19}"
                    placeholder="+94XX-XXX-XXXX"

                />
                <br /><br />
                <label>Email Address</label>
                <Input
                    onChange={onEmailChange}
                    value={EmailValue}
                    type="email"
                />
                <br />
                <br />
                <label>PIN Code</label>
                <Input
                    onChange={onPINChange}
                    value={PINValue}
                    maxLength="4"
                    placeholder="XXXX"
                />
                <br /><br />


                <Button
                    onClick={onSubmit}
                >
                    Pay Now
                </Button>
            </Form>
        </div>
    )
}

export default MobilePaymentPage
