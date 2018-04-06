import { connect } from 'react-redux';
import get from 'lodash.get';

import { Menu } from '@components/navigation';

export default connect((state, { match }) => {
  const resourceId = get(match, 'params.resource');
  const allSections = get(state, 'ui.sections');
  const sections = resourceId ? allSections.resources : [];

  const links = sections.map(({ name, pathname }) => ({
    name,
    pathname: `/console/${resourceId}/${pathname}`
  }));

  return {
    links
  };
})(Menu);
