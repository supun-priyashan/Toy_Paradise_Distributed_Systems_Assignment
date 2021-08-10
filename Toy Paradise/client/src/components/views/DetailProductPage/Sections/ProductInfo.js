import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import {useSelector} from "react-redux";
import Axios from "axios";
import { withRouter } from 'react-router-dom';

function ProductInfo(props) {

    const user = useSelector(state => state.user)
    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }

    const deleteProductHandler= () =>{
        Axios.delete('/api/product/deleteProduct/' + props.detail._id)
            .then(response => {
                if (response.data.success) {
                    props.history.push('/');
                    alert('Product Successfully Deleted')
                } else {
                    alert('Failed to delete Product')
                }
            })
    }

    if (user.userData && !user.userData.isAuth) {
        return (
            <div>
                <Descriptions title="Product Info">
                    <Descriptions.Item label="Price"> {Product.price}$</Descriptions.Item>
                    <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                    <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
                    <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
                </Descriptions>
                <br/>
                <br/>
                <br/>
            </div>
        )
    } else if(user.userData && user.userData.isAdmin){
        return (
            <div>
                <Descriptions title="Product Info">
                    <Descriptions.Item label="Price"> {Product.price}$</Descriptions.Item>
                    <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                    <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
                    <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
                </Descriptions>
                <br/>
                <br/>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button size="large" shape="round" type="primary"
                            onClick={addToCarthandler}
                    >
                        Add to Cart
                    </Button>
                </div>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button size="large" shape="round" type="danger"
                            onClick={deleteProductHandler}
                    >
                        Delete product
                    </Button>
                </div>
            </div>
        )
    } else{
        return (
            <div>
                <Descriptions title="Product Info">
                    <Descriptions.Item label="Price"> {Product.price}$</Descriptions.Item>
                    <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                    <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
                    <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
                </Descriptions>
                <br/>
                <br/>
                <br/>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button size="large" shape="round" type="primary"
                            onClick={addToCarthandler}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductInfo);
