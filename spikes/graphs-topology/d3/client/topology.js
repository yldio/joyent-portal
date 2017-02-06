const React = require('react');
const Styled = require('styled-components');
const TopologyGraph = require('./graph/topology-graph');
const data = require('./data');

const {
  default: styled
} = Styled;

const StyledSvg = styled.svg`
  width: 1024px;
  height: 860px;
`;

const StyledForm = styled.form`
  margin: 20px;
`;

class Topology extends React.Component {

  constructor(props) {
    super(props)
    //nasty
    this.state = {
      data: {
        nodes: [
          ...data.nodes
        ],
        links: [
          ...data.links
        ]
      }
    }
  }

  render() {
    const {
    } = this.props;

    const nodeSize = {
      width: 180,
      height: 156
    };

    const onSubmit = (evt) => {
      evt.preventDefault();
      console.log('submit ', evt.target.service.value);
      console.log('submit ', evt.target.link.value);
      const service = evt.target.service.value;
      const target = evt.target.link.value;
      const data = this.state.data;

      this.setState({
        data: {
            nodes: [
              ...data.nodes,
              {
                id: evt.target.service.value
              }
            ],
            links: [
              ...data.links,
              {
                source: service,
                target: target
              }
            ]
        }
      })
    };

    const options = data.nodes.map((n, index) => (
      <option key={index} value={n.id}>{n.id}</option>
    ));

    return (
      <div>
        <StyledForm onSubmit={onSubmit}>
          <label>New service name</label>
          <input name='service' type='text' placeholder='Service name' />
          <label>Service to link to</label>
          <select name='link'>
            { options }
          </select>
          <input type='submit' value='submit' />
        </StyledForm>
        <TopologyGraph data={this.state.data} nodeSize={nodeSize} />
      </div>
    );
  }
};

module.exports = Topology;
