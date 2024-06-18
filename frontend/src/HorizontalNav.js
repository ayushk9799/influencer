import "./HorizontalNav.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/UserSlice";
import { useNavigateCustom } from "./CustomNavigate";
import { useRef } from "react";
export const HorizontalNav = ({ button }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigateCustom();
  const dispatch = useDispatch();
  const horizontalRef = useRef(null);
  const handleAccountClick = () => {
    navigate("/myAccount");
    horizontalRef.current.style.display = "none";
  };
  const handleOrdersClick = () => {
    navigate("/user/orders");
    horizontalRef.current.style.display = "none";
  };
  const handleLoginOut = async () => {
    if (isAuthenticated) {
      const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
        credentials: "include",
      });

      if (response.ok) {
        dispatch(logout());
        navigate("/");
      }
    } else {
    }
    navigate("/");
    horizontalRef.current.style.display = "none";
  };
  if (button === true) {
    return (
      <>
        <div id="horizontalcontainer" ref={horizontalRef}>
          <div className="horizontaldetails" onClick={handleAccountClick}>
            Account
          </div>
          <div className="horizontaldetails" onClick={handleOrdersClick}>
            Orders
          </div>
          <div
            className="horizontaldetails"
            id={isAuthenticated ? "logouth" : "loginh"}
            onClick={handleLoginOut}
          >
            {isAuthenticated ? "Log Out" : "Log In"}
          </div>
        </div>
      </>
    );
  }
};
