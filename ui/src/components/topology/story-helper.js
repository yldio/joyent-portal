const React = require('react');
const Styled = require('styled-components');
const composers = require('../../shared/composers');
const Input = require('../form/input');
const Select = require('../form/select');
const Topology = require('./');
const data = require('./data');

const {
  default: styled
} = Styled;

const {
  Baseline
} = composers;

const {
  TopologyGraph
} = Topology;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 5px;
`;

class StoryHelper extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: data
    };
  }

  render() {

    const data = this.state.data;

    const linkOptions = (nodes) => {
      return nodes.map((node, index) => (
        <option key={node.id} value={node.id}>{node.id}</option>
      ));
    };

    const onAddService = (evt) => {
      evt.preventDefault();

      const service = evt.target.service.value;
      const target = evt.target.target.value;
      const source = evt.target.source.value;

      const links = [];
      if(target) {
        links.push({
          target: target,
          source: service
        });
      }

      if(source) {
        links.push({
          target: service,
          source: source
        });
      }

      if(links.length) {
        const data = this.state.data;
        this.setState({
          data: {
            nodes: [
              ...data.nodes,
              {
                ...data.nodes[0],
                id: service
              }
            ],
            links: [
              ...data.links,
              ...links
            ]
          }
        });
      }
    };

    return (
      <div>
        <StyledForm onSubmit={onAddService}>
          <Input name='service' placeholder='Service name' />
          <Select name='target'>
            <option value=''>Select a service to link to (optional)</option>
            {linkOptions(data.nodes)}
          </Select>
          <Select name='source'>
            <option value=''>Select a service to link from (optional)</option>
            {linkOptions(data.nodes)}
          </Select>
          <Input name='Add service' type='submit' />
        </StyledForm>
        <TopologyGraph data={data} />
      </div>
    );
  }
}

module.exports = Baseline(
  StoryHelper
);
