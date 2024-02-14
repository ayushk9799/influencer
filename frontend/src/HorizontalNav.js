
import './HorizontalNav.css'
export const HorizontalNav=({button})=>
{
//   let  className=(button)?'slide-left':'slide-right';
    if(button===true)
    {
    return <>
            <div id="horizontalcontainer" >
                    <div className='horizontaldetails'>Account</div> 
                    <div className='horizontaldetails'>Pricing</div> 
                    <div className='horizontaldetails'>How To Use</div> 
                    <div className='horizontaldetails'>Login</div> 
                    <div className='horizontaldetails'>SignUp</div> 
                   
            </div>
    </>
    }
}