import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {noop, cancellable} from '../utils/componentHelpers';

export default class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      image: {
        url: null,
        width: null,
        height: null
      }
    };

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.loader = null;
  }

  static propTypes = {
    image: PropTypes.object,
    style: PropTypes.object,
    imgStyle: PropTypes.object,
    onLoad: PropTypes.func,
    circle: PropTypes.bool,
    showPlaceholder: PropTypes.bool,
    size: PropTypes.string
  };

  static defaultProps = {
    image: {},
    style: {},
    imgStyle: {},
    onLoad: noop,
    circle: false,
    showPlaceholder: false,
    size: null
  };

  componentDidMount() {
    // Const {image} = this.props;
    // const sizes = image.localFile && image.localFile.childImageSharp ? image.localFile.childImageSharp.sizes : null;
    // const resolutions = image.localFile && image.localFile.childImageSharp ? image.localFile.childImageSharp.resolutions : null;

    // if (!sizes && !resolutions) {
    // 	this.loader = cancellable(this.preloadImage(this.props.image.url));
    // 	this.loader.then(this.handleImageLoad);
    // }
    const {image: wpImage, size} = this.props;
    let image = {};

    if (!wpImage) {
      return;
    }

    if (size && wpImage && wpImage.mediaDetails && wpImage.mediaDetails.sizes && wpImage.mediaDetails.sizes[size]) {
      image = {
        url: wpImage.mediaDetails.sizes[size].url,
        width: wpImage.mediaDetails.sizes[size].width,
        height: wpImage.mediaDetails.sizes[size].height
      };
    } else {
      image = {
        url: wpImage.url,
        width: wpImage.mediaDetails.width,
        height: wpImage.mediaDetails.height
      };
    }

    this.setState({image});

    this.loader = cancellable(this.preloadImage(image.url));
    this.loader.then(this.handleImageLoad);
  }

  componentWillUnmount() {
    if (this.loader) {
      this.loader.cancel();
    }
  }

  preloadImage(src) {
    return new Promise((resolve, reject) => {
      this.img = new window.Image();
      this.img.onload = () => {
        if (!this.img) {
          return reject();
        }

        resolve();
      };

      this.img.onerror = () => resolve();
      this.img.src = src;

      if (this.img.complete) {
        return resolve();
      }
    });
  }

  handleImageLoad() {
    this.setState({loaded: true});
    this.props.onLoad();
  }

  render() {
    const {circle} = this.props;
    const {loaded, image} = this.state;

    if (!image || !image.url) {
      return null;
    }

    // Const sizes = image.localFile && image.localFile.childImageSharp ? image.localFile.childImageSharp.sizes : null;
    // const resolutions = image.localFile && image.localFile.childImageSharp ? image.localFile.childImageSharp.resolutions : null;

    // const props = {...this.props};

    // if (sizes) {
    // 	return <Img {...props} sizes={sizes}/>;
    // }

    // if (resolutions) {
    // 	return <Img {...props} resolutions={resolutions}/>;
    // }

    const ratio = (image.height * 100) / image.width;

    return (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          ...this.props.style
        }}
      >
        <div
          style={{
            width: '100%',
            paddingBottom: `${ratio}%`
          }}
        />
        {this.props.showPlaceholder ? (
          <div
            style={{
              backgroundColor: '#C3C3C3',
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              transition: 'opacity 0.5s',
              opacity: loaded ? 0 : 0.2,
              borderRadius: circle ? '50%' : 0
            }}
          />
        ) : null}
        <img
          src={image.url}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: loaded ? 1 : 0,
            visibility: loaded ? 'visible' : 'hidden',
            transition: 'opacity 0.15s',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            ...this.props.imgStyle
          }}
        />
      </div>
    );
  }
}
