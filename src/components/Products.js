import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Button from './Button';

export default class Products extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div>
        <div id="conteiner-product" data-testid="product">
          <h2 data-testid="shopping-cart-product-name">{title}</h2>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
        </div>
        {/* <Button product={ product } id={ id } /> */}
      </div>
    );
  }
}

Products.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
};

Products.defaultProps = {
  title: '',
  thumbnail: '',
  price: 0,
};
