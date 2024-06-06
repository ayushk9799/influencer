import React, {useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import './accountForClient.css'
import { Link, useNavigate } from "react-router-dom";
import { getOrder } from "../../redux/UserSlice";
import { BACKEND_URL } from "../../assets/Data";
import { useNavigateCustom } from "../../CustomNavigate";

const AccountForClient = () => {
  const { userDetails, orders } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate=useNavigateCustom()
console.log(userDetails)
  const [favourites,setfavourite]=useState([]);
const getFavourites=async()=>
{
    try{
        const response=await fetch(`${BACKEND_URL}/user/favourite/get`,{credentials:"include"});
        const {favourites}=await response.json();
        setfavourite(favourites.favourites)
    }
    catch(error)
    {
        console.log(error)
    }
}
console.log(favourites)
  useEffect(()=>{
getFavourites()
    dispatch(getOrder())
  },[]);
  return (
    <div style={{width : '1080px'}}>
        <div style={{ display: "flex", justifyContent : 'center', margin : '10px 0px' }}>
          <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center'}} >
            <div className="image-div">
                <img
                    src={userDetails?.profilePic}
                    alt="image"
                    style={{ height: "100px", width: "100px" }}
                />
            </div>
            <div style={{margin : '5px 0px'}}>
                <h3 style={{fontSize : '20px'}}>{userDetails?.name}</h3>
            </div>
          </div>
        </div>
        <div className="c-account-container">
            <div>
                <div className="c-account-header">
                    <h4>Collaboration</h4>
                    <Link to={'/user/orders'} >View all</Link>
                </div>
                <div className="c-account-main">
                    {userDetails?.orders?.length ? (
                        orders.map((value, index) => (
                            <div className="c-order-details-element" key={index} onClick={() => {navigate(`/user/orders/${value._id}`, {state : {orderDetails : value}})}}>
                                <div className='order-item-info'>
                                    <div className='order-item-img'>
                                        <img src={userDetails?.contentCreator ? `${value?.buyer?.profilePic}` : `${value?.influencer?.profilePic}`} alt={value?.buyer?.name} />
                                    </div>
                                    <div>
                                        <h4>{userDetails?.contentCreator ? value?.buyer?.name : value?.influencer?.name}</h4>
                                        <p>{value?.orderSummary?.details}</p>
                                    </div>
                                </div>
                                <div style={{display:'flex', alignItems:'center', fontSize:'24px'}}>${value.amount}</div>
                            </div>
                        ))
                    ) : (
                        <div style={{display : 'flex', justifyContent : 'center', alignContent : 'center'}}>
                            <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                                <h3>No Order</h3>
                                <Link to={'/'} className='profile-buttons' style={{paddingInline : '25px', fontWeight : 'bold', letterSpacing : 0.9, height : '30px'}}>Find influencer</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className="c-account-header">
                    <h4>Favourite Influencers</h4>
                    <Link >View all</Link>
                </div>
                <div className="c-account-main">
                        {userDetails?.favourites?.length>0?(favourites.map((favourites,index)=>
                        (
                            <div className="c-order-details-element" key={index} onClick={()=>navigate(`/influencer/${favourites.uniqueID}`,{state:{uniqueID:favourites.uniqueID}})}>
                            <div className='order-item-info'>
                                <div className='order-item-img'>
                                    <img src={favourites.profilePic} alt={favourites.name} />
                                </div>
                                <div>
                                    <h4>{favourites.name}</h4>
                                    <p>{}</p>
                                </div>
                            </div>
                            
                        </div>
                             
                        ))):<><p>No data found</p>
                        <p style={{fontSize : '13px', opacity : 0.7}}>Once you select favourite influencer data will show.</p></>}
                        
                        
                  
                </div>
            </div>
        </div>
    </div>
  );
};

export default AccountForClient;
