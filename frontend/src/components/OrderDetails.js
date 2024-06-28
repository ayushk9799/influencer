import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import "./orderDetails.css";
import { FaCheckCircle } from "react-icons/fa";
import { AiTwotoneBank } from "react-icons/ai";
import { IoIosCloseCircle, IoMdClose } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BACKEND_URL, getDateFormatted, s3Domain } from "../assets/Data";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, Box, Button } from "@mui/material";
import { updateUserDetails } from "../redux/UserSlice";
import WorkingStep from "./subcomponents/WorkingStep";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 3,
};

const OrderDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  const [orderDetails, setOrderDetails] = useState(
    location?.state?.orderDetails
  );
  const [second, setSecond] = useState(1); // time for showing animation
  const [loading, setLoading] = useState(false);
  const { orderID } = useParams();
  const alertRef = useRef();
  const alertMessage = useRef();
  const [openModal1, setopenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [bankDetailsModalOpen, setBankDetailsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");
  const [approveAgain, setApproveAgain] = useState(false);
  const [bankDetails, setBankDetails] = useState(
    userDetails?.bankDetails || { account: "", ifsc: "", name: "" }
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const {orderDetails} = location.state;

  const fetchOrderDetails = async () => {
    const response = await fetch(`${BACKEND_URL}/api/user/orders/${orderID}`, {
      credentials: "include",
    });
    const { order } = await response.json();
    if (response.status === 200) {
      setOrderDetails(order);
    } else {
      navigate("/user/orders", { replace: true });
    }
    return;
  };

  // get order data - direct refresh situation
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  // order status bar animation
  useEffect(() => {
    const iconsElement = document.querySelectorAll(".status-icon");
    const statusBar = document.querySelectorAll(".status-bar > div");
    if (orderDetails && orderDetails.orderStatus[0]) {
      if (orderDetails.orderStatus[0] === "success") {
        iconsElement[0].style.color = "#1877F2";
      } else if (orderDetails.orderStatus[0] === "failed") {
        iconsElement[0].style.color = "red";
        return;
      } else {
        return;
      }
    }
    const timer = setInterval(() => {
      if (orderDetails.orderStatus[second] === "success") {
        iconsElement[second].style.color = "#1877F2";
        statusBar[second - 1].style.width = "100px";
        statusBar[second - 1].style.backgroundColor = "#1877F2";
        setSecond((pre) => pre + 1);
      } else if (orderDetails.orderStatus[second] === "failed") {
        iconsElement[second].style.color = "red";
        statusBar[second - 1].style.width = "100px";
        statusBar[second - 1].style.backgroundColor = "red";
        clearInterval(timer);
        return;
      } else {
        let time;
        if (second === 1) {
          time = orderDetails?.createdAt;
        } else if (second === 2) {
          time = orderDetails?.workAccepted?.date;
        } else if (second === 3) {
          time = orderDetails?.workApproval?.date;
        } else {
          clearInterval(timer);
          return;
        }
        const currentTime = new Date();
        const givenTime = new Date(time);
        const timeDifference = Math.abs((currentTime - givenTime) / 36e5); // Difference in hours
        let value = Math.abs(100 * (timeDifference / 48)); // add hours for status bar
        if (value > 90) {
          value = 90;
        }
        statusBar[second - 1].style.width = `${value}px`;
        clearInterval(timer);
        return;
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [second, orderDetails]);

  // send event of client and influencer to server
  const handleOrderEvents = async (actionType) => {
    if (!selectedOption) {
      alert("Must select atleast one option");
      return;
    }
    if (selectedOption === "rejected") {
      // message is required-> show alert
      const wordsCount = message
        .split(" ")
        .filter((word) => word !== "").length;
      if (wordsCount < 5) {
        alert("must add message atleast 5 words");
        return;
      }
    }
    setLoading(true);
    const options = {
      status: selectedOption,
      message,
      actionFor: actionType ? "client" : "influencer",
    };
    const respose = await fetch(
      `${BACKEND_URL}/api/user/order/order-events/${orderID}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      }
    );
    const data = await respose.json();
    setOrderDetails({ ...orderDetails, ...data });
    setLoading(false);
    setOpenModal2(false);
    setopenModal1(false);
    if (actionType !== 0) {
      if (selectedOption === "accepted") {
        alertMessage.current.textContent = `You have successfully Approved influencer work`;
      } else {
        alertMessage.current.textContent = "You have Rejected work approval";
      }
    } else {
      if (selectedOption === "accepted") {
        alertMessage.current.textContent = `Accepted collaboration offer of ${orderDetails?.buyer.name}`;
      } else {
        alertMessage.current.textContent = `Rejected collaboration offer of ${orderDetails?.buyer.name}`;
      }
    }

    alertRef.current.style.display = "block";
  };

  // add bank details handler
  const handleBankDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${BACKEND_URL}/api/addData/bank-details`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bankDetails),
      });
      dispatch(updateUserDetails({ bankDetails }));
      alertMessage.current.textContent = "Bank details added successfully";
      alertRef.current.style.display = "block";
      setApproveAgain(false);
      setBankDetailsModalOpen(false);
    } catch (err) {}
  };

  // manage all event of influencer acceptence of work
  const modalSubComponent1 = () => {
    if (orderDetails?.workAccepted?.status === "pending") {
      if (userDetails.contentCreator) {
        return (
          <div>
            <div className="checkbox">
              <div>
                <input
                  type="radio"
                  name="acceptReject"
                  value="accepted"
                  checked={selectedOption === "accepted"}
                  onChange={handleOptionChange}
                />
                Accept
              </div>
              <div>
                <input
                  type="radio"
                  name="acceptReject"
                  value="rejected"
                  checked={selectedOption === "rejected"}
                  onChange={handleOptionChange}
                />
                Reject
              </div>
            </div>
            <span>Message:</span>
            <textarea
              value={message}
              rows={5}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: "100%" }}
              placeholder="Please write message of atleast 5 words"
            />
            <Button
              size="small"
              variant="contained"
              onClick={() => handleOrderEvents(0)}
            >
              submit
            </Button>
          </div>
        );
      } else {
        return (
          <div className="sub-component-1">
            <p>
              Influencer has not accepted the offer yet. Please wait for 48h. If
              they do not accept the offer, EazzyCollab will refund your money.
            </p>
          </div>
        );
      }
    } else if (orderDetails?.workAccepted?.status === "success") {
      if (userDetails.contentCreator) {
        return (
          <div className="sub-component-1">
            <p>You have successfully accepted offer for collaboration.</p>
          </div>
        );
      } else {
        return (
          <div className="sub-component-1">
            <p>
              Influencer has successfully accepted your collaboration offer.
            </p>
            <Link>Chat with influencer</Link>
          </div>
        );
      }
    } else if (orderDetails?.workAccepted?.status === "failed") {
      return (
        <div className="sub-component-1">
          <p>
            Influencer has rejected collaboration offer for following reason.
          </p>
          {/* below text are not showing good-improvement required */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdOutlineArrowForwardIos size={12} />
            <p>{orderDetails?.workAccepted?.message}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Unable to load data.</p>
          <Button variant="outlined">Reload</Button>
        </div>
      );
    }
  };

  // manage all scenario of client approval
  const modalSubComponent2 = () => {
    if (orderDetails?.workApproval?.status === "pending") {
      if (userDetails.contentCreator) {
        if (orderDetails?.orderStatus[1] === "pending") {
          return (
            <div className="sub-component-1">
              <p>
                Client has not approved your work yet <br /> Please wait for
                approval.
              </p>
              <Button variant="outlined">Chat with Client</Button>
            </div>
          );
        } else {
          return (
            <div className="sub-component-1">
              <p>
                Once you accept collaboration offer and complete the work,
                Client can approve your work.
              </p>
            </div>
          );
        }
      } else {
        if (orderDetails?.orderStatus[1] === "success") {
          return (
            <div>
              <div className="checkbox">
                <div>
                  <input
                    type="radio"
                    name="acceptReject"
                    value="accepted"
                    checked={selectedOption === "accepted"}
                    onChange={handleOptionChange}
                  />
                  Approve
                </div>
                <div>
                  <input
                    type="radio"
                    name="acceptReject"
                    value="rejected"
                    checked={selectedOption === "rejected"}
                    onChange={handleOptionChange}
                  />
                  Reject
                </div>
              </div>
              <span>Message:</span>
              <textarea
                value={message}
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "100%" }}
                placeholder="Reason for Rejection"
              />
              <Button variant="contained" onClick={() => handleOrderEvents(1)}>
                submit
              </Button>
            </div>
          );
        } else {
          return (
            <div className="sub-component-1">
              <p>
                Please wait for influencer confirmation of collaboration offer.
              </p>
            </div>
          );
        }
      }
    } else if (orderDetails?.workApproval?.status === "success") {
      if (userDetails.contentCreator) {
        return (
          <div className="sub-component-1">
            <p>
              Client has successfully <b>approved</b> your work.
              <br />
              Please wait for some time EazzyCollab will initiate payment.
            </p>
          </div>
        );
      } else {
        return (
          <div className="sub-component-1">
            <p>
              You have successfully <b>approved</b> his work. So, EazzyCollab is
              initiating payment to the influencer.
            </p>
          </div>
        );
      }
    } else if (orderDetails?.workApproval?.status === "failed") {
      if (userDetails.contentCreator) {
        return (
          <div className="sub-component-1">
            <p>Client has rejected your work for following reason.</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdOutlineArrowForwardIos size={12} />
              <p>{orderDetails?.workApproval?.message}</p>
            </div>
          </div>
        );
      } else {
        if (approveAgain) {
          return (
            <div>
              <div className="checkbox">
                <div>
                  <input
                    type="radio"
                    name="acceptReject"
                    value="accepted"
                    checked={selectedOption === "accepted"}
                    onChange={handleOptionChange}
                  />
                  Approve
                </div>
                <div>
                  <input
                    type="radio"
                    name="acceptReject"
                    value="rejected"
                    checked={selectedOption === "rejected"}
                    onChange={handleOptionChange}
                  />
                  Reject
                </div>
              </div>
              <span>Message:</span>
              <textarea
                value={message}
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "100%" }}
                placeholder="Reason for Rejection"
              />
              <Button variant="contained" onClick={() => handleOrderEvents(1)}>
                submit
              </Button>
            </div>
          );
        } else {
          return (
            <div className="sub-component-1">
              <p>You have rejected influencer work for following reason.</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdOutlineArrowForwardIos size={12} />
                <p>{orderDetails?.workApproval?.message}</p>
              </div>
              <button onClick={() => setApproveAgain(true)}>
                Approve again
              </button>
            </div>
          );
        }
      }
    } else {
      return (
        <div>
          <p>Unable to load data.</p>
          <Button variant="outlined">Reload</Button>
        </div>
      );
    }
  };

  return (
    <div className="order-container">
      <Modal
        open={openModal1}
        onClose={() => {
          setopenModal1(false);
          setApproveAgain(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className="modal-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0px",
              }}
            >
              <h2 id="child-modal-title">Collaboration offer</h2>
              <IoMdClose
                size={25}
                onClick={() => setopenModal1(false)}
                className="modal-close-button"
              />
            </div>
            <p id="child-modal-description">
              {userDetails?.contentCreator
                ? `${orderDetails?.buyer?.name} has sent offer for collaboration to you.`
                : `you have sent offer of collaboration to ${orderDetails?.influencer?.name}.`}
            </p>
            {modalSubComponent1()}
          </div>
        </Box>
      </Modal>
      <Modal
        open={openModal2}
        onClose={() => {
          setOpenModal2(false);
          setApproveAgain(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className="modal-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0px",
              }}
            >
              <h2 id="child-modal-title">Work Approval</h2>
              <IoMdClose
                size={25}
                onClick={() => setOpenModal2(false)}
                className="modal-close-button"
              />
            </div>
            <p id="child-modal-description">
              {/* Once influencer will complete the work. Client approves his work,
              so that EazzyCollab can initiate payment to influencer. */}
              Payment will be initiated once the approval of work is done from
              client side.
            </p>
            {modalSubComponent2()}
          </div>
        </Box>
      </Modal>
      <Modal
        open={bankDetailsModalOpen}
        onClose={() => {
          setBankDetailsModalOpen(false);
          setApproveAgain(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className="modal-container">
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <h2 id="child-modal-title">Add bank details</h2>
              {userDetails?.bankDetails && (
                <FiEdit
                  onClick={() => setApproveAgain((pre) => !pre)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <p id="child-modal-description">
              Add your bank account details for receiving payments from
              EazzyCollab.
            </p>
            {userDetails?.bankDetails && !approveAgain ? (
              <div className="bank-details">
                <div>
                  <p>Account Holder Name:</p>
                  <p>{userDetails.bankDetails?.name}</p>
                </div>
                <div>
                  <p>Account Number:</p>
                  <p>{userDetails.bankDetails?.account}</p>
                </div>
                <div>
                  <p>IFSC code:</p>
                  <p>{userDetails.bankDetails?.ifsc}</p>
                </div>
              </div>
            ) : (
              <form
                className="bank-details-form"
                onSubmit={(e) => handleBankDetailsSubmit(e)}
              >
                <div className="input-group">
                  <label htmlFor="accountNumber">Account Number:</label>
                  <input
                    value={bankDetails.account}
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    required
                    onChange={(e) => {
                      setBankDetails({
                        ...bankDetails,
                        account: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="ifscCode">IFSC Code:</label>
                  <input
                    style={{ textTransform: "uppercase" }}
                    value={bankDetails.ifsc}
                    type="text"
                    id="ifscCode"
                    name="ifscCode"
                    required
                    onChange={(e) => {
                      setBankDetails({ ...bankDetails, ifsc: e.target.value });
                    }}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="accountHolderName">
                    Account Holder Name:
                  </label>
                  <input
                    style={{ textTransform: "uppercase" }}
                    value={bankDetails.name}
                    type="text"
                    id="accountHolderName"
                    name="accountHolderName"
                    required
                    onChange={(e) => {
                      setBankDetails({ ...bankDetails, name: e.target.value });
                    }}
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            )}
          </div>
        </Box>
      </Modal>
      <div
        className="alert-success"
        onAnimationEnd={() => (alertRef.current.style.display = "none")}
        ref={alertRef}
      >
        <Alert severity={selectedOption === "rejected" ? "warning" : "success"}>
          <p ref={alertMessage}></p>
        </Alert>
      </div>
      <div className="order-main">
        <h4>Order Details</h4>
        <div className="order-top-container">
          <div className="profile-xyz">
            <div className="order-item-info">
              <Link to={`#`} target="_blank" className="order-item-img">
                <img
                  src={
                    userDetails?.contentCreator
                      ? `${orderDetails?.buyer?.profilePic}`
                      : `${orderDetails?.influencer?.profilePic}`
                  }
                  alt={orderDetails?.buyer?.name}
                />
              </Link>
              <div>
                <h4>
                  {userDetails.contentCreator
                    ? orderDetails?.buyer?.name
                    : orderDetails?.influencer?.name}
                </h4>
                <p>{orderDetails?.orderSummary?.details}</p>
              </div>
            </div>
            <div className="button-container-orders">
              <div
                className="profile-buttons"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/chat/${orderDetails?.influencer?.uniqueID}`, {
                    state: {
                      account: userDetails?.contentCreator
                        ? orderDetails?.buyer?._id
                        : orderDetails?.influencer?._id,
                    },
                  });
                }}
              >
                {userDetails?.contentCreator
                  ? "Chat with client"
                  : "Chat with influencer"}
              </div>
              <Link to={"#"} className="profile-buttons">
                Get support
              </Link>
            </div>
          </div>
          <div className="order-summary">
            <div className="order-summary-top">
              <div>
                <p>ORDER PLACED</p>
                <p>{new Date(orderDetails?.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p>TOTAL AMOUNT</p>
                <p>${orderDetails?.amount}</p>
              </div>
            </div>
            <div className="order-summary-bottom">
              <div>
                <p>Social media handle : </p>
                <p style={{ textTransform: "capitalize" }}>
                  {orderDetails?.orderSummary?.accountType}
                </p>
              </div>
              <div>
                <p>Summary : </p>
                <p>{orderDetails?.orderSummary?.details}</p>
              </div>
              <div>
                <p>Offer details : </p>
                <p>{orderDetails?.orderSummary?.summary}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="status-container">
          <h4>Order status</h4>
          <div className="eg">
            <div>
              <p>Offer sent</p>
              <p>Collaboration</p>
              <p>Approved</p>
              <p>Completed</p>
            </div>
          </div>
          <div className="status-card">
            <FaCheckCircle className="status-icon" size={25} />
            <div className="status-bar">
              <div></div>
            </div>
            {orderDetails?.workAccepted?.status === "rejected" ? (
              <IoIosCloseCircle
                className="status-icon"
                size={25}
                onClick={() => setopenModal1(true)}
              />
            ) : (
              <FaCheckCircle
                className="status-icon"
                size={25}
                onClick={() => setopenModal1(true)}
              />
            )}
            <div className="status-bar">
              <div></div>
            </div>
            {orderDetails?.workApproval?.status === "rejected" ? (
              <IoIosCloseCircle
                className="status-icon"
                size={25}
                onClick={() => setOpenModal2(true)}
              />
            ) : (
              <FaCheckCircle
                className="status-icon"
                size={25}
                onClick={() => setOpenModal2(true)}
              />
            )}

            <div className="status-bar">
              <div></div>
            </div>
            <FaCheckCircle className="status-icon" size={25} />
          </div>

          <div className="eg">
            <div>
              <p>{getDateFormatted(orderDetails?.createdAt)}</p>
              <p>{getDateFormatted(orderDetails?.workAccepted?.date)}</p>
              <p>{getDateFormatted(orderDetails?.workApproval?.date)}</p>
              <p>
                {getDateFormatted(orderDetails?.influencerPaymentDetails?.date)}
              </p>
            </div>
          </div>
        </div>

        <div className="order-bottom-container">
          <div className="payment-container-buyer">
            <div className="order-summary-top">
              <p>
                {userDetails?.contentCreator ? "Client" : "Your"} payment
                details
              </p>
            </div>
            <div className="payment-element-buyer">
              <div>
                <p>Payment Status :</p>
                <p style={{ textTransform: "capitalize" }}>
                  {orderDetails?.buyerPaymentStatus}
                </p>
              </div>
              <div>
                <p>Payment Id :</p>
                <p>{orderDetails?.buyerPaymentDetails?.paymentID}</p>
              </div>
              <div>
                <p>Transaction type :</p>
                <p>UPI</p>
              </div>
              <div>
                <p>Transaction date :</p>
                <p>{new Date(orderDetails?.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="payment-container-influencer">
            <div className="order-summary-top">
              <p>Influencer payment details</p>
              {userDetails?.contentCreator && (
                <button
                  onClick={() => setBankDetailsModalOpen(true)}
                  className="bank"
                >
                  <AiTwotoneBank />
                </button>
              )}
            </div>
            {orderDetails?.influencerPaymentDetails ? (
              <div> </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "150px",
                  padding: "5px 20px",
                }}
              >
                <p>No data found</p>
                <p
                  style={{
                    fontSize: "13px",
                    opacity: 0.7,
                    textAlign: "center",
                  }}
                >
                  Payment will be sent to influencer once client approve your
                  work.
                </p>
              </div>
            )}
          </div>
        </div>
        <WorkingStep />
      </div>
    </div>
  );
};

export default OrderDetails;
