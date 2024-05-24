import React, {useEffect} from 'react'
import "./order.css"
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../redux/UserSlice';
import {Link} from 'react-router-dom'

const Order = () => {
    const dispatch = useDispatch();
    const {userDetails, orders} = useSelector((state)=> state.user);
    useEffect(()=>{
        dispatch(getOrder())
    },[]);
  return (
    <div className='container-all-order'>
         {userDetails?.orders?.length > 0 ? (
            <div className='order-container1'>
            <h3>Your Order</h3>
            {orders &&orders.map((value, index)=>(
                <div className='order-item' key={index}>
                    <div className='order-item-top'>
                        <div className='order-item-top-element'>
                            <p>ORDER PLACED</p>
                            <p>{new Date(value?.createdAt).toLocaleString()}</p>
                        </div>
                        <div className='order-item-top-element'>
                            <p>TOTAL AMOUNT</p>
                            <p>${value?.amount}</p>
                        </div>
                       
                        <div className='order-ids'>
                            <p>ORDER_ID # {value?.orderID}</p>
                            <a href='#'>Invoice</a>
                        </div>
                    </div>
                    <div className='order-item-bottom'>
                       <div className='order-item-info'>
                            <div className='order-item-img'>
                                <img src={userDetails?.contentCreator ? `${value?.buyer?.profilePic}` : `${value?.influencer?.profilePic}`} alt={value?.buyer?.name} />
                            </div>
                            <div>
                                <h4>{userDetails?.contentCreator ? value?.buyer?.name : value?.influencer?.name}</h4>
                                <p>{value?.orderSummary?.details}</p>
                            </div>
                        </div>
                        <div className='order-item-button'>
                            <Link to={`/user/orders/${value._id}`} className='profile-buttons' state={{orderDetails : value}}>View order details</Link>
                            <Link className='profile-buttons' to={"#"}>Chat with influencer</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        ) : (
            <div style={{width : '100%', height : '70vh', display : 'flex', alignItems : 'center', justifyContent : 'center',}}>
                <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center',}}>
                    <h3>No Order</h3>
                    <Link to={'/'} className='profile-buttons' style={{paddingInline : '25px', fontWeight : 'bold', letterSpacing : 0.9, height : '30px'}} variant='contained'>Find influencer</Link>
                </div>
            </div>
        )} 
    </div>
  )
}

export default Order