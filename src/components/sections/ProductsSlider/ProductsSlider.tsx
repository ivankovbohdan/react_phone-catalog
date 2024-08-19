import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ProductType } from '../../../types/ProductType';
import { Icon } from '../../Icon';
import { Product } from '../../Product';
import './ProductsSlider.scss';

type Props = {
  className?: string;
  title: string;
  products: ProductType[];
};

export const ProductsSlider: React.FC<Props> = ({
  className = '',
  title,
  products,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [startX, setStartX] = useState<number | null>(null);
  // const [isDragging, setIsDragging] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);

  const listRef = useRef<HTMLUListElement | null>(null);

  const calculateItemWidth = () => {
    if (listRef.current) {
      const firstItem = listRef.current.querySelector('li');

      if (firstItem) {
        setItemWidth(firstItem.clientWidth + 16);
      }
    }
  };

  useLayoutEffect(() => {
    calculateItemWidth();
    window.addEventListener('resize', calculateItemWidth);

    return () => {
      window.removeEventListener('resize', calculateItemWidth);
    };
  }, [products.length]);

  const step = 1;
  // const gap = 16;
  const animationDuration = 1000;

  const prev = useCallback(() => {
    if (currentIndex > 1) {
      setCurrentIndex(prevIndex => prevIndex - step);
    }
  }, [currentIndex]);

  const next = useCallback(() => {
    setCurrentIndex(
      currentIndex + step >= products.length - 1
        ? products.length - 1
        : currentIndex + step,
    );
  }, [currentIndex, products.length]);

  const translateX =
    currentIndex === products.length - 1
      ? (products.length - 1) * itemWidth - (window.innerWidth - itemWidth - 32)
      : currentIndex * itemWidth;

  // const handleTouchStart = (e: React.TouchEvent) => {
  //   setStartX(e.touches[0].clientX);
  //   setIsDragging(true);
  // };

  // const handleTouchMove = (e: React.TouchEvent) => {
  //   if (!isDragging || startX === null) {
  //     return;
  //   }

  //   const deltaX = e.touches[0].clientX - startX;

  //   if (deltaX > 50 && currentIndex !== 1) {
  //     prev();
  //     setIsDragging(false);
  //   } else if (deltaX < -50 && currentIndex < products.length - step) {
  //     next();
  //     setIsDragging(false);
  //   }
  // };

  // const handleTouchEnd = () => {
  //   setIsDragging(false);
  //   setStartX(null);
  // };

  return (
    <section
      className={`products-slider section ${className}`.trim()}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
      <div className="container">
        <div className="products-slider__top">
          <h2 className="products-slider__title title">{title}</h2>

          <div className="products-slider__buttons">
            <button
              className="products-slider__button"
              type="button"
              disabled={currentIndex === 0}
              onClick={prev}
            >
              <Icon iconName="icon-arrow-left" />
            </button>
            <button
              className="products-slider__button"
              type="button"
              disabled={currentIndex + step >= products.length}
              onClick={next}
            >
              <Icon iconName="icon-arrow-right" />
            </button>
          </div>
        </div>

        <div className="products-slider__wrapper">
          <ul
            ref={listRef}
            className="products-slider__list"
            style={{
              transform: `translateX(-${translateX}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {products.map(product => (
              <li className="products-slider__item" key={product.id}>
                <Product product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
