import { connect } from 'react-redux';
import get from 'lodash.get';

import { Menu } from '@components/navigation';

export default connect((state, { match }) => {
  const instanceSlug = get(match, 'params.instance');
  const allSections = get(state, 'ui.sections');
  const sections = instanceSlug ? allSections.instances : [];

  const links = sections.map(({ name, pathname }) => ({
    name,
    pathname: `/${instanceSlug}/${pathname}`
  }));

  return {
    links
  };
})(Menu);
