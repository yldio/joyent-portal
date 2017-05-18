import { Component } from 'react';
import Layout from '../components/layout';
// import Editor from '../components/editor';
import NoSSR from 'react-no-ssr';
import styled from 'styled-components';
import JSONViewer from 'simple-json-form-viewer';
import forceArray from 'force-array';

const tags = {
  hash: 'docker:label:com.docker.compose.config-hash',
  project: 'docker:label:com.docker.compose.project',
  service: 'docker:label:com.docker.compose.service'
};

const Panel = styled.div`
  width: 50%;
  float: ${props => props['float']};
  margin: 0 -10px 0 -10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
`;

// <code>{JSON.stringify(this.state.scale, null, 2)}</code>
// <code>{JSON.stringify(this.state.provision, null, 2)}</code>
// const ProvisionResult = (res) => {
//   const services = Object.keys(res).map((name) => {
//     return (
//       <ul>
//         <li>
//           {name}
//           <ul>
//
//           </ul>
//         </li>
//       </ul>
//     );
//   });
// };

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      manifest: `
hello:
  image: hello-world:latest
world:
  image: consul:latest
`.trim(),
      name: 'compose-demo'
    };

    this.handleProvision = this.handleProvision.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handleManifestChange = this.handleManifestChange.bind(this);
    this.poll = this.poll.bind(this);
  }

  componentDidMount() {
    this.poll();
  }

  async poll() {
    const res = await fetch('/api/status', {
      method: 'GET'
    });

    const containers = await res.json();

    const status = Object.values(containers)
      .filter(
        container =>
          container.tags[tags.hash] &&
          container.tags[tags.project] === this.state.name
      )
      .reduce((sum, container) => {
        const name = container.tags[tags.service];
        const prevInstances = forceArray(sum[name]);

        return Object.assign(sum, {
          [name]: prevInstances.concat([
            {
              name: container.name,
              state: container.state
            }
          ])
        });
      }, {});

    console.log(status);

    this.setState({
      status
    });

    setTimeout(() => this.poll(), 16);
  }

  async handleProvision() {
    const body = JSON.stringify({
      manifest: this.state.manifest,
      name: this.state.name
    });

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Content-Length': body.length.toString()
    });

    const res = await fetch('/api/provision', {
      method: 'POST',
      headers: headers,
      body: body
    });

    this.setState({
      provision: await res.json()
    });
  }

  async handleScale() {}

  handleManifestChange(ev) {
    this.setState({
      manifest: ev.target.value
    });
  }

  render() {
    return (
      <Layout title="Docker Compose Demo">
        <Panel float="left">
          <Textarea
            value={this.state.manifest}
            onChange={this.handleManifestChange}
          />
          <button onClick={this.handleProvision}>Provision</button>
          <button onClick={this.handleScale}>Scale</button>
          <NoSSR>
            <JSONViewer data={this.state.provision} />
          </NoSSR>
        </Panel>
        <Panel float="right">
          <NoSSR>
            <JSONViewer data={this.state.status} />
          </NoSSR>
        </Panel>
      </Layout>
    );
  }
}
