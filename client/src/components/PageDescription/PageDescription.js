import React from 'react';

import "./PageDescription.css"

const pageDescription = (props) => {
    return (
        <div className="page-description">
            { props.children }
        </div>
    );
}

export default pageDescription