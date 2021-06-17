import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormComment from '../component/FormComment';
import Comments from '../component/Comments';
import ShoppingCart from './ShoppingCart';

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      comments: [],
    };
    this.getProduct = this.getProduct.bind(this);
    this.setCommentarray = this.setCommentarray.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  handleAdd(product) {
    const obj = {
      id: product.id,
      title: product.title,
    };
    const { addItens } = this.props;
    addItens(obj);
  }

  async getProduct() {
    const { match: { params: { id } } } = this.props;
    const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const json = await result.json();
    this.setState({
      product: json,
    });
  }

  setCommentarray(value) {
    const { comments } = this.state;
    this.setState({
      comments: [value, ...comments],
    });
  }


  render() {
    const { product, comments } = this.state;
    const { itensAdded } = this.props;
    return (
      <>
        <div data-testid="product-detail-name">{ product.title }</div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handleAdd(product) }
        >
          Adicionar
        </button>
        <ShoppingCart itensArray={ itensAdded } />
        <FormComment idPrd={ product.id } evBtn={ this.setCommentarray } />
        <Comments idPrd={ product.id } arrayComment={ comments } />
      </>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  itensAdded: PropTypes.arrayOf(PropTypes.object).isRequired,
  addItens: PropTypes.func.isRequired,
};
