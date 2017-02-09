const React = require('react');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const constants = require('@ui/shared/constants');
const fns = require('@ui/shared/functions');

const Button = require('@ui/components/button');
const Card = require('@ui/components/payment-card');

const {
  FormattedMessage
} = ReactIntl;

const {
  default: styled
} = Styled;

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  PaymentCard,
  PaymentCardDetail,
  PaymentCardDetails,
  PaymentCardView
} = Card;

const Container = styled.div`
  padding: ${remcalc(96)} ${remcalc(40)};
`;

const Title = styled.h2`
  margin: 0 0 ${remcalc(18)} 0;
  font-size: ${remcalc(36)};
  color: ${colors.brandSecondaryColor};
`;

const Description = styled.p`
  margin-bottom: ${remcalc(24)}
  font-size: ${remcalc(16)};
  color: ${colors.brandSecondaryColor};
  max-width: ${remcalc(380)};
`;

const Buttons = styled.div`
  display: flex;
  flex-flow: row;
`;

const LeftButton = styled(Button)`
  margin-right: ${remcalc(6)};
`;

const NewProjectBilling = (props) => {
  const {
    cards = [{
      type: 'mastercard',
      number: 'xxxx-xxxx-xxxx-4901'
    }],
    handleSubmit,
    onSubmit,
    onNewBilling,
  } = props;

  const _onNewBilling = (evt) => {
    evt.preventDefault();
    onNewBilling();
  };

  const cardList = cards.map((card, index) => (
    <PaymentCardView key={index}>
      <PaymentCard size='large' type={card.type} />
      <PaymentCardDetails>
        <PaymentCardDetail>
          <FormattedMessage id={`payment-cards.${card.type}`} />
        </PaymentCardDetail>
        <PaymentCardDetail>{card.number}</PaymentCardDetail>
      </PaymentCardDetails>
    </PaymentCardView>
  ));

  return (
    <Container>
      <Title>
        <FormattedMessage id='billing.title' />
      </Title>
      <Description>
        <FormattedMessage id='billing.description' />
      </Description>
      { cardList }
      <form onSubmit={handleSubmit(onSubmit)}>
        <Buttons>
          <LeftButton onClick={_onNewBilling} secondary>
            <FormattedMessage id='billing.new-billing-label' />
          </LeftButton>
          <Button primary type='submit'>
            <FormattedMessage id='billing.use-existing-label' />
          </Button>
        </Buttons>
      </form>
    </Container>
  );
};

NewProjectBilling.propTypes = {
  cards: React.PropTypes.array,
  handleSubmit: React.PropTypes.func.isRequired,
  onNewBilling: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

module.exports = NewProjectBilling;
