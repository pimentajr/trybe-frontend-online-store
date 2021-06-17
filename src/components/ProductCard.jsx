import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { product: { title, price, thumbnail, id }, addCart } = this.props;
    return (
      <div data-testid="product">
        <h4>{title}</h4>
        <p>{`R$ ${price}`}</p>
        <img src={ thumbnail } alt={ title } />
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ addCart }
          value={ id }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  addCart: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};
