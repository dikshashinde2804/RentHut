import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state added
    const [isOpen, setIsOpen] = useState(false);
    const username = localStorage.getItem('username');

    const handleSuccess = (msg) => {
        setTimeout(() => {
            toast.success(msg, {
                autoClose: 1000,
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }, 0); // Delay to allow DOM to settle
    };
    useEffect(() => {
        return () => {
            toast.dismiss(); // Clear all toasts on unmount
        };
    }, []);


    const handleLogout = async () => {
        setIsOpen(false);
        setLoading(true); // Set loading to true when logout is initiated
        try {
            const response = await axios.get("https://renthut-backend.vercel.app/logout",
                { withCredentials: true });
            setLoading(false); // Set loading to false once response is received
            const { success, message } = response.data;
            console.log(response.data)
            if (success) {
                localStorage.removeItem('username');
                localStorage.removeItem('user_id');
                localStorage.removeItem('token');
                handleSuccess("User logged out successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
                return;
            }
        } catch (error) {
            setLoading(false); // Set loading to false if error occurs
            console.error("Logout failed:", error);
        }
    };
    // chatgpt


    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const closeNavbar = () => {
        setIsOpen(false); // Close the navbar
    };

    const handleOutsideClick = (event) => {
        // Check if the click is outside the navbar or toggler
        if (
            !event.target.closest('.navbar-collapse') && // Navbar menu
            !event.target.closest('.navbar-toggler') // Toggler button
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener when navbar is open
        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        // Cleanup the event listener
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);
    // chatgpt

    return (
        <div>
            <ToastContainer position="top-right" autoClose={1000} limit={1} />
            <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top ">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand ms-3">
                        <h3 className="logo"> RENTHUT</h3>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleNavbar}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link nav-content" to="/explore" onClick={closeNavbar}>Discover</Link>
                            <Link className="nav-link nav-content" to="/addNewHome" onClick={closeNavbar}>Add New Home</Link>
                            <Link className="nav-link nav-content me-4 " to="/about" onClick={closeNavbar}>About Us</Link>

                            {username && username !== 'undefined' ? (
                                <div className="nav-item dropdown">
                                    <button
                                        className="btn dropdown-toggle join-btn"
                                        type="button"
                                        id="userDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {username.toUpperCase()}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                        <li>
                                            <Link className="dropdown-item" to={"/seeyourlisting"} onClick={closeNavbar} >
                                                <i className="fa-solid fa-bed me-2"></i> See Your Listings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/seeyourbooking" onClick={closeNavbar}>
                                                <i className="fas fa-key me-2"></i> See Your Bookings
                                            </Link>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}  >
                                                <i className="fas fa-sign-out-alt me-2"></i> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <>
                                    <Link className="nav-link signup-btn" to="/signup" onClick={closeNavbar} >Sign up</Link>
                                    <Link className="nav-link login-btn" to="/login" onClick={closeNavbar}>Log in</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Loading Spinner */}
            {loading && (
                <div className="loading-overlay text-center mt-4 ">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Please Wait...</p>
                </div>
            )}

        </div>
    );
}

export default Navbar;
