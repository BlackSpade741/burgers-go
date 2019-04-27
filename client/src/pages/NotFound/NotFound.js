import React from 'react'

import './NotFound.css'

const notFound = (props) => {
    return (
        <div className="not-found">
            <div className="not-found-floating-box">
                <h1 style={{ fontSize: "1300%" }}>404</h1>
                <h2>Page Not Found</h2>
                <h1>That's a no from me dawg.</h1>
            </div>
        </div>
    );
} 

export default notFound;