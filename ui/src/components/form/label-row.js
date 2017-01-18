const Column = require('../column');
const React = require('react');
const Row = require('../row');

const LabelRow = (props) => {
  const labels = React.Children.map(props.children, (children) => (
    <Column md={6} xs={12}>
      {children}
    </Column>
  ));

  return (
    <Row>
      {labels}
    </Row>
  );
};

LabelRow.propTypes = {
  children: React.PropTypes.node
};

module.exports = LabelRow;
