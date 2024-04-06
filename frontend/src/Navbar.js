import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react';
import { HorizontalNav } from './HorizontalNav';

export const Navbar=({details})=>
{
  
     console.log(details)
     
    const [menuButton,setMenuButton]=useState(false);
    const handleChange=()=>
    {
        setMenuButton(!menuButton);
    }
   const navigate=useNavigate();
return <><div id="navbarcontainer">
    <div id="nameandlogo" >Influencer Chat</div>
    <div id="navbardetails">
    <div className='navDetailsClass' onClick={()=>navigate('/pricing')}>Pricing</div>
    <div className='navDetailsClass' onClick={()=>navigate('/how-to-use')}>How to use</div>

    {details?.email ? (<div className='navDetailsClass' onClick={()=>navigate('/myAccount')} id="account">

      <div id="accountDetails">
             A
        </div>
    </div>):(
    <div className='navDetailsClass' onClick={()=>navigate('/login')} id="login">Login</div>
    )}
    {/* <div className='navDetailsClass' id="signup" onClick={()=>navigate('/signup')}>SignUp</div> */}
    </div>
    <div id="menu" onClick={handleChange}>
    <svg
    width='24px' height='24px'
        viewBox="0 0 24 24"
        dangerouslySetInnerHTML={{
          __html:
            '<path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />',
        }}
      />
    </div>    
</div>
<HorizontalNav button={menuButton}/>
</>
}