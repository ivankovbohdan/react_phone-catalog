import { NavLink } from 'react-router-dom';
import './Nav.scss';
import classNames from 'classnames';
import { Icon } from '../Icon';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__link', { 'nav__link--active': isActive });

const getBtnClass = ({ isActive }: { isActive: boolean }) =>
  classNames(`nav__buttons-btn`, {
    'nav__buttons-btn--active': isActive,
  });

type Props = {
  className?: string;
};

export const Nav: React.FC<Props> = ({ className }) => (
  <nav className={`nav ${className}`}>
    <ul className="nav__list">
      <li className="nav__item">
        <NavLink to="/" className={getLinkClass}>
          home
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/phones" className={getLinkClass}>
          Phones
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/tablets" className={getLinkClass}>
          tablets
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/accessories" className={getLinkClass}>
          accessories
        </NavLink>
      </li>
    </ul>

    <ul className="nav__buttons">
      <li className="nav__buttons-item">
        <NavLink className={getBtnClass} to="/favorites">
          <span className="sr-only">Open favorites</span>
          <Icon iconName="icon-heart" />
        </NavLink>
      </li>
      <li className="nav__buttons-item">
        <NavLink className={getBtnClass} to="/cart">
          <span className="sr-only">Open cart</span>
          <Icon iconName="icon-cart" />
        </NavLink>
      </li>
    </ul>
  </nav>
);
