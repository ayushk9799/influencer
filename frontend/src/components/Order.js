import React, {useEffect} from 'react'
import "./order.css"
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../redux/UserSlice';
import {  s3Domain } from '../assets/Data';
import {Link} from 'react-router-dom'

const Order = () => {
    const dispatch = useDispatch();
    const {userDetails, orders} = useSelector((state)=> state.user);
    // const value = orders[0];
    useEffect(()=>{
        dispatch(getOrder())
    },[]);
    console.log(orders);
  return (
    <div className='container-all-order'>
        <h3>Your Order</h3>
        {userDetails?.orders?.length > 0 ? (
            <div className='order-container1'>
            {orders &&orders.map((value, index)=>(
                <div className='order-item' key={index}>
                    <div className='order-item-top'>
                        <div>
                            <p>ORDER PLACED</p>
                            <p>{new Date(value?.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p>TOTAL AMOUNT</p>
                            <p>${value?.amount}</p>
                        </div>
                        <div>
                            <p>WORK PROGRESS</p>
                            <p>Client is waiting for collaboration</p>
                        </div>
                        <div>
                            <p>ORDER_ID # {value?.orderID}</p>
                            <a href='#'>Invoice</a>
                        </div>
                    </div>
                    <div className='order-item-bottom'>
                       <div className='order-item-info'>
                            <div className='order-item-img'>
                                <img src={`${s3Domain}/${value?.buyer?.profilePic}`} alt={value?.buyer?.name} />
                            </div>
                            <div>
                                <h4>{value?.buyer?.name}</h4>
                                <p>{value?.orderSummary?.summary}</p>
                            </div>
                        </div>
                        <div className='order-item-button'>
                            <Link to={`/user/orders/${value._id}`} state={{orderDetails : value}}>View order details</Link>
                            <button>Chat with influencer</button>
                            <button>Get Support</button>
                        </div>
                    </div>
                   
                </div>
            ))}
        </div>
        ) : (
            <h3>No Order</h3>
        )}
    </div>
  )
}

export default Order