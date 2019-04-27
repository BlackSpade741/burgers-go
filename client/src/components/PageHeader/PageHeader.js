import React from 'react';

import './PageHeader.css';

const pageHeader = (props) => {
    return (
        <div className="page-header">
            <h3> {props.children} </h3>
        </div>
    );
}

export default pageHeader;