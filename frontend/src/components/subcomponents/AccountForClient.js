import React from "react";
import { useSelector } from "react-redux";
import './accountForClient.css'
import { Link } from "react-router-dom";

const AccountForClient = () => {
  const { userDetails } = useSelector((state) => state.user);
  const { name, profilePic, orders } = userDetails;
  return (
    <div style={{width : '1080px'}}>
        <div style={{ display: "flex", justifyContent : 'center', margin : '10px 0px' }}>
          <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center'}} >
            <div className="image-div">
                <img
                src={profilePic}
                alt="image"
                style={{ height: "100px", width: "100px" }}
                />
            </div>
            <div>
                <h3 style={{fontSize : '20px'}}>{name}</h3>
            </div>
          </div>
        </div>
        <div className="c-account-container">
            <div>
                <div className="c-account-header">
                    <h4>Orders</h4>
                    <Link to={'/user/orders'} >all orders</Link>
                </div>
                <div className="c-account-main">abc</div>
            </div>
            <div>
                <div className="c-account-header">
                    <h4>Transactions</h4>
                    <Link >All Transactions</Link>
                </div>
                <div className="c-account-main">
                    {orders?.length ? (
                        <div>
                        </div>
                    ) : (
                        <div style={{display : 'flex', justifyContent : 'center', alignContent : 'center', height : '100%',}}>
                            <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                                <h3>No Order</h3>
                                <Link to={'/'} className='profile-buttons' style={{paddingInline : '25px', fontWeight : 'bold', letterSpacing : 0.9, height : '30px'}} variant='contained'>Find influencer</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AccountForClient;
