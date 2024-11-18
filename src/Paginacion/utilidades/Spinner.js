import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const Spinner = ({ type = "spin", color = "#000", height = '10%', width = '10%', contentReady = false }) => {
  return (
    <>
      {!contentReady && <ReactLoading type={type} color={color} height={height} width={width} />}
    </>
  );
};

// PropTypes validation
Spinner.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  contentReady: PropTypes.bool
};

export default Spinner;
