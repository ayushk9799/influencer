import React, { useEffect, useRef, useState } from 'react'
import {useParams, useLocation, Link} from 'react-router-dom'
import "./orderDetails.css"
import { FaCheckCircle } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { AiTwotoneBank } from "react-icons/ai";
import { BACKEND_URL, getDateFormatted, s3Domain } from '../assets/Data';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import WorkingStep from './subcomponents/WorkingStep';


// import { BACKEND_URL } from '../assets/Data';

const OrderDetails = () => {
    const location = useLocation();
    const {userDetails} = useSelector(state=>state.user);
    const [orderDetails, setOrderDetails] = useState(location?.state?.orderDetails);
    const [second, setSecond] = useState(1);
    const [loading, setLoading] = useState(false)
    const {orderID} = useParams();
    const alertRef = useRef();
    // const {orderDetails} = location.state;

    // order status bar animation
    useEffect(() => {
        const iconsElement = document.querySelectorAll('.status-icon');
        const statusBar = document.querySelectorAll('.status-bar > div');
        if(orderDetails && orderDetails.orderStatus[0]) {
            iconsElement[0].style.color = '#1877F2';
        }
        const timer = setInterval(() => {
            if(orderDetails.orderStatus[second]) {
                iconsElement[second].style.color = '#1877F2';
                statusBar[second-1].style.width = '100px';
                setSecond(pre=>pre+1);
            } else {
                clearInterval(timer);
                return;
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [second, orderDetails]);

    // work accept api call
  
    const handlerWorkAccept = async () => {
        setLoading(true);
        const respose = await fetch(`${BACKEND_URL}/user/order/influencer-work-accept/${orderID}`, {credentials : 'include'});
        const data = await respose.json();
        setLoading(false);
        setOrderDetails({...orderDetails, ...data});
        alertRef.current.style.display='block'
    }



    const handleWorkReject = async () => {
        alertRef.current.style.display='block'
    }

    const handleClientApproval = async () => {
        setLoading(true);
        const respose = await fetch(`${BACKEND_URL}/user/order/client-work-approval/${orderID}`, {credentials : 'include'});
        const data = await respose.json();
        setLoading(false);
        setOrderDetails({...orderDetails, ...data});
        alertRef.current.style.display='block'
    }

    // get order data - direct refresh situation
    // useEffect(() => {
    //     const fetchOrderDetails = async () => {
    //         const response = await fetch(`${BACKEND_URL}/user/orders/${orderID}`, {
    //             credentials: "include",
    //         });
    //         const { order } = await response.json();
    //         return order;
    //     }
    //     if(location?.state) {
    //         setOrderDetails(fetchOrderDetails());
    //     }
    // }, []);

    console.log(orderDetails);
    
  return (
    <div className='order-container'>
            <div className='alert-success' onAnimationEnd={() => alertRef.current.style.display='none'} ref={alertRef} style={{position : 'absolute', width : '400px',height : '155px', boxSizing : 'border-box', overflow : 'hidden'}}><Alert severity="success">Accepted collaboration with Rajiv Ranjan</Alert></div>
        <div className='order-main'>
            <h4>Order Details</h4>
            <div className='order-top-container'>
                <div className='profile-xyz'>
                    <div className='order-item-info'>
                        <Link to={`#`} target='_blank' className='order-item-img'>
                            <img src={`${s3Domain}/${orderDetails?.buyer?.profilePic}`} alt={orderDetails?.buyer?.name} />
                        </Link>
                        <div>
                            <h4>{orderDetails?.buyer?.name}</h4>
                            <p>{orderDetails?.orderSummary?.summary}</p>
                        </div>
                    </div>
                    <div className='button-container-orders'>
                        <Link to={'#'} className='button-design'>{userDetails?.contentCreator ? 'Chat with client' : 'Chat with influencer' }</Link>
                        <Link to={'#'} className='button-design'>Get support</Link>
                    </div>
                </div>
                <div className='order-summary'>
                    <div className='order-summary-top'>
                        <div>
                            <p>ORDER PLACED</p>
                            <p>{new Date(orderDetails?.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p>TOTAL AMOUNT</p>
                            <p>${orderDetails?.amount}</p>
                        </div>
                    </div>
                    <div className='order-summary-bottom'>
                        <div>
                            <p>Social media handle : </p>
                            <p>{orderDetails?.orderSummary?.accountType}</p>
                        </div>
                        <div>
                            <p>Summary : </p>
                            <p>{orderDetails?.orderSummary?.summary}</p>
                        </div>
                        <div>
                            <p>Offer details : </p>
                            <p>{orderDetails?.orderSummary?.details}</p>
                        </div>
                        {orderDetails?.orderStatus[0] && (
                            orderDetails?.workAccepted?.status ? (
                                <div style={{display : 'flex', alignItems : 'center', gap : '5px', justifyContent : 'flex-end'}}><BsPatchCheckFill color='green' />Order accepted by influencer</div>
                            ) : (
                                <div>
                                    <button onClick={handlerWorkAccept}>Accept</button>
                                    <button onClick={handleWorkReject}>Reject</button>
                                </div>
                            )
                        )}
                    </div>
                  
                </div>
            </div>
           <div className='status-container'>
            <div className='eg'>
                <div>
                    <p>Offer sent</p>
                    <p>Collaboration</p>
                    <p>Approved</p>
                    <p>Completed</p>
                </div>
                </div>
                <div className='status-card'>
                    <FaCheckCircle className='status-icon' size={25}/>
                    <div className='status-bar'><div></div></div>
                    <FaCheckCircle className='status-icon' size={25} />
                    <div className='status-bar'><div></div></div>
                    <FaCheckCircle className='status-icon' size={25} />
                    <div className='status-bar'><div></div></div>
                    <FaCheckCircle className='status-icon' size={25} />
                </div>

                <div className='eg'>
                <div>
                    <p >{getDateFormatted(orderDetails?.createdAt)}</p>
                    <p>{getDateFormatted(orderDetails?.workAccepted?.date)}</p>
                    <p>{getDateFormatted(orderDetails?.workApproval?.date)}</p>
                    <p>{getDateFormatted(orderDetails?.influencerPaymentDetails?.date)}</p>
                </div>
                </div>
           </div>

            {!userDetails?.contentCreator && (
                <div>
                   <h4>Approve influencer work</h4>
                   <button onClick={handleClientApproval}>Approve</button>
                   <button>Reject</button>
              </div>
            )}

            <div className='order-bottom-container'>
                <div className='payment-container-buyer'>
                    <div className='order-summary-top'>
                        <p>Buyer payment details</p>
                        <a href='#'>Invoice</a>
                    </div>
                    <div>
                        <p>Payment Id :</p>
                        <p>{orderDetails?.buyerPaymentDetails?.paymentID}</p>
                    </div>
                    <div>
                        <p>Transaction type :</p>
                        <p>UPI</p>
                    </div>
                    <div>
                        <p>Transaction date :</p>
                        <p>{new Date(orderDetails?.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <div className='payment-container-influencer'>
                    <div className='order-summary-top'>
                        <p>Influencer payment details</p>
                        {userDetails?.contentCreator && <div className='bank'><AiTwotoneBank /> <div className='ping'></div></div>}
                    </div>
                    {orderDetails?.influencerPaymentDetails ? (
                        <div> </div>
                    ) : (
                        <div style={{display : 'flex', flexDirection : 'column',  alignItems : 'center', justifyContent : 'center', height : "150px"}}>
                            <p>No data found</p>
                            <p style={{fontSize : '13px', opacity : 0.7}}>Payment will be sent to influencer onces client approve your work.</p>
                        </div>
                    )}
                </div>
            </div>
        <WorkingStep />
        </div>
    </div>
  )
}

export default OrderDetails