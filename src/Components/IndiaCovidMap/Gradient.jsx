import React from 'react';
import PropTypes from 'prop-types';

const Gradient = (props) => (
    <React.Fragment>
        <div> 
            <span>{props.min}</span>            
            <span style={{float:'right'}}>{props.max}</span>
        </div>
        <div style={{ backgroundImage: `linear-gradient(to right, ${[...props.colors]})`, height: '25px', width: '100%', marginTop: '20px' }}></div>
    </React.Fragment>
);

Gradient.propTypes = {
    colors: PropTypes.array.isRequired
};
export default Gradient;