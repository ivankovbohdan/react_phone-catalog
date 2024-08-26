import { useContext } from 'react';
import { Icon } from '../../../../components/Icon';
import { ProductType } from '../../../../types/ProductType';
import { AppContext } from '../../../../AppContext';

type Props = {
  product: ProductType;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { cartItems, setCartItems, removeItem } = useContext(AppContext);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: 0 } : item,
        ),
      );
    }

    if (!isNaN(parseInt(e.target.value)) || parseInt(e.target.value) > 0) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: parseInt(e.target.value) }
            : item,
        ),
      );
    }
  };

  const handleBlur = () => {
    if (product.quantity === 0) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: 1 } : item,
        ),
      );
    }
  };

  const decreaseQuantity = () => {
    if (product.quantity > 1) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }
  };

  const increaseQuantity = () => {
    setCartItems(
      cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  return (
    <article className="cart-item">
      <div className="cart-item__top">
        <button
          className="cart-item__delete-btn"
          type="button"
          onClick={() => removeItem(product.id, 'cart')}
        >
          <Icon iconName="icon-close" />
        </button>

        <a className="cart-item__img-link" href="#">
          <img
            className="cart-item__img"
            src={product.image}
            alt={product.name}
          />
        </a>

        <span className="cart-item__title">{product.name}</span>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__counter">
          <button
            className="cart-item__counter-btn"
            onClick={decreaseQuantity}
            disabled={product.quantity <= 1}
          >
            <Icon iconName="icon-minus" />
          </button>

          <input
            className="cart-item__counter-value"
            type="text"
            value={product.quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            min={1}
          />

          <button className="cart-item__counter-btn" onClick={increaseQuantity}>
            <Icon iconName="icon-plus" />
          </button>
        </div>

        <span className="cart-item__price">{`$${product.price}`}</span>
      </div>
    </article>
  );
};
