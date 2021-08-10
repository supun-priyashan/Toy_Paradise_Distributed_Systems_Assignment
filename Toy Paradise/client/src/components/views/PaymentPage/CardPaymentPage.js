import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Axios from 'axios';

const { Title } = Typography;

function CardPaymentPage(props) {

    const [CardNameValue, setTitleValue] = useState("")
    const [CardNumberValue, setCardNumberValue] = useState("")
    const [ExpDateValue, setExpDateValue] = useState("")
    const [CVVValue, setCVVValue] = useState("")
    const [ZIPValue, setZIPValue] = useState("")
    const [EmailValue, setEmailValue] = useState("")
    const [TelNoValue, setTelNoValue] = useState("")


    const onCardNameChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onCardNumberChange = (event) => {
        setCardNumberValue(event.currentTarget.value)
    }

    const onExpDateChange = (event) => {
        setExpDateValue(event.currentTarget.value)
    }

    const onCVVChange = (event) => {
        setCVVValue(event.currentTarget.value)
    }

    const onZIPChange = (event) => {
        setZIPValue(event.currentTarget.value)
    }

    const onEmailChange = (event) => {
        setEmailValue(event.currentTarget.value)
    }

    const onTelNoChange = (event) => {
        setTelNoValue(event.currentTarget.value)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!CardNameValue || !CardNumberValue || !ExpDateValue || !CVVValue || !ZIPValue || !EmailValue || !TelNoValue ) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: CardNameValue,
            description: CardNumberValue,
            price: ExpDateValue,
            cvv:CVVValue,
            zip:ZIPValue,
            email:EmailValue,
            telno:TelNoValue
        }

        Axios.post('/api/payment/cardPayment', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Payment Successful')
                    props.history.push('/')
                } else {
                    alert('Failed to process payment')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Card Details <Icon type="credit-card"/></Title>
            </div>


            <Form onSubmit={onSubmit} >
                <br />
                <br />
                <label>Name on Card</label>
                <Input
                    onChange={onCardNameChange}
                    value={CardNameValue}
                />
                <br />
                <br />
                <label>Card Number</label>
                <Input
                    onChange={onCardNumberChange}
                    value={CardNumberValue}
                    maxLength="16"
                    type="number"
                    pattern="[0-9\s]{13,19}"
                    placeholder="xxxx xxxx xxxx xxxx"

                />
                <br />
                <br />
                <label>ExpiredDate</label>
                <Input
                    onChange={onExpDateChange}
                    value={ExpDateValue}
                    type="month"
                />
                <br /><br />
                <label>CVV</label>
                <Input
                    onChange={onCVVChange}
                    value={CVVValue}
                    type="number"
                    maxLength="3"
                />
                <br /><br />
                <label>ZIP/Postal Code</label>
                <Input
                    onChange={onZIPChange}
                    value={ZIPValue}
                    type="number"
                    maxLength="5"
                />
                <br /><br />
                <label>Email Address</label>
                <Input
                    onChange={onEmailChange}
                    value={EmailValue}
                    type="email"
                />
                <br /><br />
                <label>Telephone Number</label>
                <Input
                    onChange={onTelNoChange}
                    value={TelNoValue}
                    type="tel"
                />
                <br /><br />
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Pay Now
                </Button>
            </Form>
        </div>
    )
}

export default CardPaymentPage
