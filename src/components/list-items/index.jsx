import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Collapse } from 'reactstrap';


const CollapsibleList = ({ items, depth = 0, onItemClicked }) => {
  
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (index) => {
    if (items[index] && (items[index]?.items.length === 0)) {
      onItemClicked(items[index]);
    } else {
      setOpenIndex(openIndex === index ? -1 : index);
    }
  };

  const renderItems = (items) => {

    return items.map((item, index) => {
      if (typeof item === 'string') {
        return (
          <li key={index} onClick={() => onItemClicked(item)}>
            {item}
          </li>
        );
      } else if (Array.isArray(item)) {
        return (
          <CollapsibleList
            items={item}
            depth={depth + 1}
            key={index}
            onItemClicked={onItemClicked}
          />
        );
      }
      return null;
    });
  };

  const paddingLeft = depth * 4;

  return (
    <div>
      <ul className="list-unstyled" style={{ paddingLeft: `${paddingLeft}1rem` }}>
        {items.map((item, index) => (
          <div key={index} style={{ cursor: 'pointer' }}>
            <li>
              <span className='nav-item' onClick={() => toggle(index)}>
                <Icon icon="octicon:play-16" width="24" height="24" />
                {' '}
                {item.name}
              </span>
            </li>
            <Collapse isOpen={openIndex === index}>
              <ul className="list-unstyled">
                {renderItems(item.items)}
              </ul>
            </Collapse>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CollapsibleList;
