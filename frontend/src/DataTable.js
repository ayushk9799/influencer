
import MockData from './MOCK_DATA.json';
import {Column} from './Column.js';
import {useTable,useBlockLayout} from 'react-table';
import { useMemo } from 'react';
import './DataTable.css';
import { useNavigate } from 'react-router-dom';
export const DataTable=()=>
{
    const navigate=useNavigate();
    const data=useMemo(()=>MockData,[MockData]);

   const handleInfluncerChat=({user_id})=>
   {
    console.log(user_id)
     navigate(`/influencer/${user_id}`)
   }
    return<>
   
    
   <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>UserID/Name</th>
            <th>Followers</th>
            <th>Posts</th>
            <th>Field</th>
            <th>gender</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={()=>handleInfluncerChat(item)}>
              <td>{item.user_id}</td>
              <td>{item.followers}</td>
              <td>{item.posts}</td>
              { <td >
                <div className='array'>
                {(item.field)?.map((feature,index)=>(
                  <div className='arrayelements'key={index} >{feature}</div>
                ))}
                </div>
            
                </td> }
              <td>{item.gender}</td>
             
            
             
              { <td >
                <div className='array'>
                {(item.languages)?.map((feature,index)=>(
                  <div className='arrayelements' >{feature}</div>
                ))}
                </div>
            
                </td> }
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
}