import { connect } from 'react-redux';
import paramCase from 'param-case';
import titleCase from 'title-case';
import isString from 'lodash.isstring';
import get from 'lodash.get';

import { Menu } from '@components/navigation';

export default connect((state, { match }) => {
  const instanceSlug = get(match, 'params.instance');
  const allSections = get(state, 'ui.sections');
  const sections = instanceSlug ? allSections.instances : [];

  const links = sections
    .map(
      section =>
        !isString(section)
          ? section
          : {
              pathname: paramCase(section),
              name: titleCase(section)
            }
    )
    .map(({ name, pathname }) => ({
      name,
      pathname: `/instances/${instanceSlug}/${pathname}`
    }));

  return {
    links
  };
})(Menu);
