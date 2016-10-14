const ReactRouter = require('react-router');
const React = require('react');

const {
  Link
} = ReactRouter;

module.exports = ({
  changes = [],
  pathname,
  onClick
}) => {
  const _onClick = (id) => {
    return () => {
      onClick(id);
    };
  };

  const lis = changes.map(({
    price,
    currency,
    product,
    id
  }) => {
    return (
      <li key={id}>
        <Link to={`${pathname}/${id}`}>
          {product.artist}: {product.title} - {product.currencr}{product.price} > {currency}{price}
        </Link>
      </li>
    );
  });

  return (
    <ul>
      {lis}
    </ul>
  );
};
