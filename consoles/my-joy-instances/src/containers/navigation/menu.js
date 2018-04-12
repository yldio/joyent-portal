import { connect } from 'react-redux';
import get from 'lodash.get';

import { Menu } from '@components/navigation';

export default connect((state, { match }) => {
  const instanceId = get(match, 'params.instance');
  const allSections = get(state, 'ui.sections');
  const sections = instanceId ? allSections.instances : [];

  const links = sections.map(({ name, pathname }) => ({
    name,
    pathname: `/instances/${instanceId}/${pathname}`
  }));

  return {
    links
  };
})(Menu);
