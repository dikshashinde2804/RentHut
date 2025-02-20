import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function SeeYourListing() {
    const [allListings, setAllListings] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');
    const handleError = (msg) => toast.error(msg, { position: "top-right" });

    useEffect(() => {
        // Check if the user is logged in by verifying the cookie
        if (authToken) {
            const id = localStorage.getItem('user_id'); // Get the user ID from localStorage
            console.log("see your listing", id)
            const fetchListing = async () => {
                try {
                    const res = await axios.get(`https://renthut-backend.vercel.app/seeListing/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                        }
                    });

                    if (res.data.status) {
                        console.log(res.data.allListings)
                        setAllListings(res.data.allListings);
                    } else {
                        console.log("No listings found for this user");
                    }
                } catch (error) {
                    console.error("Error fetching listings:", error);
                } finally {
                    setLoading(false); // Stop loading indicator after fetching
                }
            };

            fetchListing(); // Call the async function to fetch listings
        } else {
            handleError("Please log in to see your listings.");
            navigate('/login'); // Redirect to login page if not logged in
        }
    }, [authToken, navigate]); // Re-run effect if token changes

    return (
        <div className="explore-container">
            <ToastContainer />
            <h2 className="mt- mb-2" style={{ textAlign: "center" }}>Your Listings</h2>
            <div className="explore-listing">
                {loading ? ( // Show loading indicator while data is being fetched
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading, please wait...</p>
                    </div>
                ) : allListings.length > 0 ? (
                    allListings.map((data, idx) => (
                        <Link to={`/listings/${data._id}`} className="listing-link" key={idx}>
                            <div className="card listing-card">
                                <img src={data.image.url || ""} className="card-img-top" alt="listing_image" style={{ height: "20rem" }} />
                                <div className="card-img-overlay"></div>
                                <div className="card-body">
                                    <p className="card-text">
                                        <b>{data.title}</b> <br />
                                        &#8377; {data.price} / month
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No listings found. Please create a listing.</p>
                )}
            </div>
        </div>
    );
}

export default SeeYourListing;
