import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Axios from 'axios';

const { Title } = Typography;

function DeliveryPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [ContactValue, setContactValue] = useState(0)
    const [ZipValue, setZipValue] = useState(0)
    const [StateValue, setStateValue] = useState("")
    const [StreetValue, setStreetValue] = useState("")
    const [CityValue, setCityValue] = useState("")
    const [SubmitValue, setSubmitValue] = useState(0)

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onContactChange = (event) => {
        setContactValue(event.currentTarget.value)
    }

    const onStateChange = (event) => {
        setStateValue(event.currentTarget.value)
    }

    const onStreetChange = (event) => {
        setStreetValue(event.currentTarget.value)
    }

    const onCityChange = (event) => {
        setCityValue(event.currentTarget.value)
    }

    const onZipChange = (event) => {
        setZipValue(event.currentTarget.value)
    }

    const onSubmitCard = (event) =>{
        event.preventDefault()
        setSubmitValue(0)
        onSubmit(event)
    }

    const onSubmitMobile = (event) =>{
        event.preventDefault()
        setSubmitValue(1)
        onSubmit(event)
    }

    const onSubmit = (event) => {
        event.preventDefault()


        if (!TitleValue || !ContactValue || !StreetValue ||
            !StateValue || !CityValue || !ZipValue) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            contact: ContactValue,
            street: StreetValue,
            state: StateValue,
            city: CityValue,
            zip: ZipValue,
        }

        Axios.post('/api/delivery/addDelivery', variables)
            .then(response => {
                if (response.data.success) {

                    if(SubmitValue === 0) props.history.push('/cardPayment/')
                    else props.history.push('/mobilePayment/')

                } else {
                    alert('Oops. An error happened...')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Delivery <Icon type="shopping-cart" /></Title>
            </div>
            <Form onSubmit={onSubmit} >

                <label>Name</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Contact No</label>
                <Input
                    onChange={onContactChange}
                    value={ContactValue}
                    type ="number"
                />
                <br />
                <br />
                <label>Street</label>
                <Input
                    onChange={onStreetChange}
                    value={StreetValue}
                />
                <br /><br />
                <label>State</label>
                <Input
                    onChange={onStateChange}
                    value={StateValue}
                />
                <br /><br />
                <label>City</label>
                <Input
                    onChange={onCityChange}
                    value={CityValue}
                />
                <br />
                <br />

                <label>Postal Code:</label>
                <Input
                    onChange={onZipChange}
                    value={ZipValue}
                    type ="number"
                />
                <br />
                <br />
                <div style={{ margin: '1px' }}>
                    <a href={`/cardPayment/`} >
                        <Button
                            style={{ margin: '1px' }}
                            onClick={onSubmitCard}
                            type = "primary"
                        >
                            Pay with Card
                        </Button>
                    </a>
                    <Button
                        style={{ margin: '1px' }}
                        onClick={onSubmitMobile}
                        type = "primary"
                    >
                        Pay with Mobile
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default DeliveryPage
