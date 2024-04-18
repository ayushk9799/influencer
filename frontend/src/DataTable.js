
import { useEffect, useState} from 'react';
import './DataTable.css';
import { useNavigate } from 'react-router-dom';
export const DataTable=()=>
{
    const navigate=useNavigate();
    //const data=useMemo(()=>MockData,[MockData]);
    const [data,setData]=useState([]);

    
useEffect(()=>
{
  
     fetch('http://localhost:3000/getInfluencers/featured/platform/instagram')
     .then(res=>{
      return res.json();
     })
     .then(data=>{
      console.log(data.data)
      setData(data.data)
     })
},[])
   const handleInfluncerChat=(accountID)=>
   {
    console.log(accountID)
     navigate(`/influencer/${accountID}`,{state:{account:accountID}})
   }
    return<>
   
    
   <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>AccountID</th>
            <th>Followers</th>
            <th>Posts</th>
            <th>Fields</th>
            {/* <th>gender</th> */}
            <th>Social Media</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={()=>handleInfluncerChat(item.associatedAccounts.accountID)}>
              <td>{item.associatedAccounts?.accountID}</td>
              <td>{item.associatedAccounts?.followers}</td>
              <td>{item.associatedAccounts?.posts}</td>
              { <td >
                <div className='array'>
                {(item.field)?.map((feature,index)=>(
                  <div className='arrayelements'key={index} >{feature}</div>
                ))}
                </div>
            
                </td> }
              {/* <td>{item.gender}</td> */}
             
            
             
              {/* { <td >
                <div className='array'>
                {(item.languages)?.map((feature,index)=>(
                  <div className='arrayelements' >{feature}</div>
                ))}
                </div>
            
                </td> } */}

                <td>{item.associatedAccounts?.socialMedia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
}