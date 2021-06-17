import React, { Component } from 'react';

export default class ItemProduct extends Component {
  render() {
    const { thumbnail, title, price, id } = this.props.item;
    return (
      <div data-testid="product" className="content" key={id}>
        <img src={thumbnail} alt="product thumbnail" />
        <h3>{title}</h3>
        <h6>
          R$
          {parseFloat(price, 10).toFixed(2)}
        </h6>
        <button className="btn btn-success" data-testid="product-add-to-cart">Add to Cart!</button>
      </div>
    );
  }
}
