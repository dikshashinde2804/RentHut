import React from "react";

function HowItWorks() {
    return (
        <section className="features">
            <h2>How RentHut Works</h2>
            <div className="feature-container">
                <div className="feature">
                    <i className="fas fa-search"></i>
                    <h3>Explore Listings</h3>
                    <p>
                        Discover a wide range of homes located in prime areas, ensuring convenience and comfort in your search.
                    </p>
                </div>
                <div className="feature">
                    <i className="fas fa-calendar-check"></i>
                    <h3>Book Your Ideal Home</h3>
                    <p>
                        Once you find the perfect match, secure your booking easily with our trusted and simple payment gateway.
                    </p>
                </div>
                <div className="feature">
                    <i className="fas fa-home"></i>
                    <h3>Move in and Enjoy</h3>
                    <p>
                        After booking, simply move in and enjoy the comfort of your new home, designed to meet all your needs.
                    </p>
                </div>
                <div className="feature">
                    <i className="fas fa-plus-circle"></i>
                    <h3>Create Your Listing</h3>
                    <p>
                        Rent out your property with ease by creating a detailed listing, including high-quality photos and descriptions.
                    </p>
                </div>
                <div className="feature">
                    <i className="fas fa-edit"></i>
                    <h3>Edit Your Listings</h3>
                    <p>
                        Keep your listings up-to-date by editing property details, photos, and availability with just a few clicks.
                    </p>
                </div>
                <div className="feature">
                    <i className="fas fa-trash-alt"></i>
                    <h3>Delete a Listing</h3>
                    <p>
                        If you no longer wish to rent your property, you can remove your listing at any time with no hassle.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
