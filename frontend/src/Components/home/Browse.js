import React from 'react'
import { Link } from 'react-router-dom'
function Browse() {
    return (
        <div>
            <section class="cta">
                <h2>Excited to discover your next home?</h2>
                <Link to="/explore"><button>Browse Listings</button></Link>
            </section>
        </div>
    )
}

export default Browse
