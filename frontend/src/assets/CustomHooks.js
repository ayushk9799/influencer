import { useNavigate, useLocation } from 'react-router-dom';

export function useCustomNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path, options = {}) => {
    if (location.pathname === path) {
      navigate(path, { ...options, replace: true });
    } else {
      navigate(path, options);
    }
  };

  return navigateTo;
}


