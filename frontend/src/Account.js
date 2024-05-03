import React ,{useEffect}from 'react'
import {useSelector} from 'react-redux'
export const Account = () => {
const {userDetails}=useSelector(state=>state.user)

  return (
    <>
      <div>
        my account
      </div>
    </>
  )
}
