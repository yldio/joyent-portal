import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';

const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 36px 0;
`;

const Link = styled.a`
  color: #3b46cc;
  font-size: 15px;
  line-height: 24px;
  text-decoration: none;
`;

const previousAndNextSections = data => {
  const items = data.items;
  const link = data.link;
  const sectionNames = items.map(item => item.name);
  const index =
    data.link === '/' ? 0 : items.findIndex(item => item.name === link);
  let ret = { prevSection: null, nextSection: null };

  if (index > -1) {
    ret = {
      prevSection: index !== 0 ? sectionNames[index - 1] : null,
      nextSection:
        index < sectionNames.length - 1 ? sectionNames[index + 1] : null
    };

    return ret;
  }

  items.map(section => {
    if (section.components.length > 0 && section.components[0].slug) {
      section.components.map(subSection => {
        if (subSection.slug === link.toLowerCase()) {
          ret = previousAndNextSections({ items, link: section.name });
        }
        return subSection;
      });
    }
    return section;
  });

  return ret;
};

export default props => {
  const selectedIndex = previousAndNextSections({
    items: props.items,
    link: props.link
  });

  if (!props.items.length) {
    return null;
  }

  return (
    <BottomNav>
      <div>
        {selectedIndex.prevSection && (
          <Link href={`/#!/${selectedIndex.prevSection}`}>
            &larr; {selectedIndex.prevSection}
          </Link>
        )}
      </div>
      <div>
        {selectedIndex.nextSection && (
          <Link href={`/#!/${selectedIndex.nextSection}`}>
            {selectedIndex.nextSection} &rarr;
          </Link>
        )}
      </div>
    </BottomNav>
  );
};
