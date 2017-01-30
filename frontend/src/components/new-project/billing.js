const React = require('react');
const ReactRouter = require('react-router');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const constants = require('@ui/shared/constants');
const fns = require('@ui/shared/functions');

const Button = require('@ui/components/button');
const Card = require('@ui/components/payment-card');

const {
  Link
} = ReactRouter;

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

const NewBillingLink = styled(Link)`
  margin-right: ${remcalc(6)} !important;
`; // But why oh why do I need to use !important :'(

const NewProjectBilling = (props) => {
  const {
    cards = [{
      type: 'mastercard',
      number: 'xxxx-xxxx-xxxx-4901'
    }],
    org
  } = props;
  console.log('cards = ', cards);
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
      <Buttons>
        <NewBillingLink to={`/${org.id}/new-project/new-billing`}>
          <Button secondary>
            <FormattedMessage id='billing.new-billing-label' />
          </Button>
        </NewBillingLink>
        <Button primary>
          <FormattedMessage id='billing.use-existing-label' />
        </Button>
      </Buttons>
    </Container>
  );
};

NewProjectBilling.propTypes = {
  cards: React.PropTypes.array,
  org: React.PropTypes.object
};

module.exports = NewProjectBilling;
