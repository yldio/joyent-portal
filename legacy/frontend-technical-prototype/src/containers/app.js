import { injectGlobal } from 'styled-components';
import Article from '@components/article';
import Base, { global } from '@ui/components/base';
import BaselineGrid from '@ui/components/baseline-grid';
import { isProduction } from '@utils';
import PerfProfiler from '@perf-profiler';
import React from 'react';

class App extends React.Component {

  componentWillMount() {
    injectGlobal`
      ${global}
    `;
  }

  render() {

    const {
      children
    } = this.props;

    const content =
      !isProduction() && process.env.BASELINE_GRID ?
      (
        <BaselineGrid>
          {children}
        </BaselineGrid>
      ) :
      (
        <Base>
          {children}
        </Base>
      );

    const profiler = !isProduction() ?
      <PerfProfiler /> : null;

    return (
      <div>
        {profiler}
        <Article name='application-content'>
          {content}
        </Article>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node
};

export default App;
