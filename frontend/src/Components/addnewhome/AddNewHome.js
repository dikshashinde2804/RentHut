import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const CreateListing = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const [isVerified, setIsVerified] = useState(false); // State for conditional rendering
    const [loading, setLoading] = useState(false);
    const authToken = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        title: '',
        houseno: '',
        availablerooms: '',
        facilities: '',
        price: '',
        description: '',
        status: 'Vacant',
        address: '',
        city: '',
        state: '',
        country: '',
    });

    const handleError = (msg) => toast.error(msg, { position: "top-right" });
    const handleSuccess = (msg) => toast.success(msg, { position: "top-right" });

    useEffect(() => {
        // Token check
        console.log("token", authToken);
        const varifyCookie = () => {
            if (!authToken) {
                handleError("Please log in to add new listing");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
                return;
            } else {
                setIsVerified(true); // Token verified
            }
        };
        varifyCookie();
    }, [authToken, navigate]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post('https://renthut-backend.vercel.app/addListing', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.data.success) {
                handleSuccess(response.data.message);
                setTimeout(() => {
                    navigate('/explore');
                }, 1000);
            } else {
                handleError(response.data.message);
            }
        } catch (error) {
            console.error("Error creating listing:", error);
            handleError("An error occurred please try again");
        }
        finally {
            setLoading(false); // Reset loading state after submission
        }
    };

    if (!isVerified) return null; // Conditional render

    return (
        <div className="container mt-5">

            <div className="row mb-3 mt-3 new-row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                    <div className="new-container">
                        <h3 className="new-h3">Create A New Listing</h3>
                        <form encType="multipart/form-data" onSubmit={handleSubmit} >
                            <div className="row mt-4">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="houseno" className="form-label">House/Plot Number</label>
                                        <input
                                            type="text"
                                            name="houseno"
                                            className="form-control"
                                            
                                            value={formData.houseno}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="availablerooms" className="form-label">Available Rooms</label>
                                        <input
                                            type="text"
                                            name="availablerooms"
                                            className="form-control"
                                            value={formData.availablerooms}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="facilities" className="form-label">Facilities</label>
                                        <input
                                            type="text"
                                            name="facilities"
                                            className="form-control"
                                            
                                            value={formData.facilities}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Rent</label>
                                        <input
                                            type="text"
                                            name="price"
                                            className="form-control"
                                            
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Upload Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control"
                                            
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Vacant">Vacant</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control"
                                            
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            className="form-control"
                                            
                                            value={formData.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            className="form-control"
                                            
                                            value={formData.country}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                className="btn btn-dark add-btn mt-3 new-btn"
                                type="submit"
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? "Creating listing..." : "Add Listing"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateListing;
