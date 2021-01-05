import React from 'react';
import PropTypes from 'prop-types';

import Image from './image';
import CSS from '../css/modules/djThumbnail.module.scss';

const DJThumbnail = ({image, height, width, hasBg}) => {
  const imgStyle = {
    height,
    width,
    right: 0,
    margin: '0 auto'
  };

  let wrapStyle = {
    height,
    width
  };

  if (hasBg) {
    wrapStyle = {
      height: height + 21,
      width: width + 44
    };
  }

  return (
    <div className={hasBg ? CSS.thumbnail : CSS.thumbnailNoBg} style={wrapStyle}>
      {image ? <Image circle image={image} imgStyle={imgStyle} size="medium" /> : null}
    </div>
  );
};

DJThumbnail.propTypes = {
  hasBg: PropTypes.bool,
  image: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

DJThumbnail.defaultProps = {
  hasBg: true,
  height: 250,
  width: 250
};

export default DJThumbnail;
