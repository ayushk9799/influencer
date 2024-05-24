import {useNavigate,useLocation} from 'react-router-dom';
export const useNavigateCustom=()=>
{
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithCheck = (path,state) => {
    if (location.pathname !== path) {
      navigate(path,state);
    } else {
      // console.log('You are already on this route');
    }
  };

  return navigateWithCheck;
}

