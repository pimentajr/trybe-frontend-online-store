import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import '../App.css';

class ProductDetails extends React.Component {
  constructor() {
    super();
    // const details = this.loadCartList();
    // const productArray = Object.values(details);
    this.state = {
      product: [],
      rating: null,
      quantity: 1,
      // quantity: productArray.length,
    };

    this.getProduct = this.getProduct.bind(this);
    this.loadCartList = this.loadCartList.bind(this);
    this.setRating = this.setRating.bind(this);
    this.getSetState = this.getSetState.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  componentDidMount() {
    this.getProduct();
    this.getSetState();
  }

  handleClick() {
    const { product: { title, thumbnail, price, id } } = this.state;
    const previousList = this.loadCartList();
    if (previousList[id]) {
      previousList[id].quantity += 1;
    } else {
      previousList[id] = { title, thumbnail, price, quantity: 1 };
    }
    // previousList.push({ title, thumbnail, price });
    // const productArray = Object.values(details);
    const quantityItem = previousList[id].quantity;
    this.setState({
      quantity: quantityItem,
    });
    localStorage.setItem('cartList', JSON.stringify(previousList));
    // const details = this.loadCartList();
  }

  getSetState() {
    const { quantity } = this.state;
    console.log(`qtd do getSetState ${quantity}`);
    this.setState({
      quantity,
    });
  }

  async getProduct() {
    const { match: { params: { categoryId, id } } } = this.props;
    const productObj = await api.getProductsFromCategoryAndQuery(categoryId, '');
    const product = productObj.results
      .find((prod) => prod.id === id);
    this.setState({ product });
    // daria para fazer um if para verificar se o ID ja existe no localStorage
    // se ja existir pegar as info caso contrario pegar da variavel acima que pega da API
  }

  setRating(event) {
    this.setState({
      rating: event,
    });
  }

  decreaseQuantity() {
    const { product: { id } } = this.state;
    const previousList = this.loadCartList();
    if (previousList[id] && previousList[id].quantity > 1) {
      previousList[id].quantity -= 1;
    }
    // const details = this.loadCartList();
    // const productArray = Object.values(details);
    // this.setState({
    //   quantity: productArray.length,
    // });
    const quantityItem = previousList[id].quantity;
    this.setState({
      quantity: quantityItem,
    });
    localStorage.setItem('cartList', JSON.stringify(previousList));
  }

  loadCartList() {
    let previousList = localStorage.getItem('cartList');
    if (previousList === null) {
      previousList = {};
      return previousList;
    }
    return JSON.parse(previousList);
  }

  render() {
    const { product: { title, thumbnail, price }, quantity } = this.state;
    console.log(`qtd do getSetState ${quantity}`);
    const { rating } = this.state;
    const numberOfStars = 5;
    return (
      <div>
        <header className="header-details-product">
          <Link to="/">
            Página Inicial
          </Link>
          <Link to="/ShoppingCart" data-testid="shopping-cart-button">
            <FaShoppingCart size={ 30 } />
          </Link>
        </header>
        <h3 data-testid="product-detail-name">
          { title }
          { ' - R$ ' }
          { price === undefined ? price : parseFloat(price).toFixed(2).replace('.', ',') }
        </h3>
        <div className="container-image-and-product-details">
          <div className="container-image-details">
            <img className="image-details" src={ thumbnail } alt="product" />
          </div>
          <div className="container-description-details">
            <h4>Especificações técnicas</h4>
            <ul>
              <li>Especificação um</li>
              <li>Especificação dois</li>
              <li>Especificação três</li>
              <li>Especificação quatro</li>
              <li>Especificação cinco</li>
              <li>Especificação seis</li>
            </ul>
          </div>
        </div>
        <h3>
          Quantidade
        </h3>
        <button
          className="decrease-btn"
          type="button"
          onClick={ this.decreaseQuantity }
        >
          -
        </button>
        <span
          className="quantity-product-details"
        >
          { quantity }
        </span>
        <button
          className="increase-btn"
          type="button"
          onClick={ this.handleClick }
        >
          +
        </button>
        <button
          className="add-to-cart-btn-details"
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao carrinho
        </button>
        <h3>Avaliações</h3>
        <form>
          <div className="container-forms">
            <input
              type="email"
              placeholder="Email"
              size="30"
              className="input-email-forms"
              onChange={ this.getEmailAndMessage }
            />
            <div className="container-stars">
              { [...Array(numberOfStars)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label htmlFor={ index } key={ index }>
                    <input
                      id={ index }
                      className="radio-star"
                      type="radio"
                      name="rating"
                      value={ ratingValue }
                      required
                      onClick={ () => this.setRating(ratingValue) }
                    />
                    <FaStar
                      rating={ rating }
                      color={ ratingValue <= rating ? '#ffc107' : '#e4e5e9' }
                      className="star-rating"
                      size={ 30 }
                    />
                  </label>
                );
              }) }
            </div>
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Mensagem(opcional)"
            rows="6"
            cols="60"
          />
          <button
            type="button"
            className="btn-submit-avaliation"
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      categoryId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
