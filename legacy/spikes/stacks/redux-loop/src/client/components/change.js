const React = require('react');

module.exports = ({
  price,
  currency,
  product,
  id
}) => {
  return (
    <p>
      {product.artist}: {product.title} - {product.currencr}{product.price} > {currency}{price}
    </p>
  );
};
