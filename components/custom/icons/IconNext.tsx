import React from 'react';
import { addIcon, Icon } from '@iconify/react';

export function IconNext() {
  addIcon('icon', {
    body: `<svg fill="#000000" viewBox="0 0 24 24" id="next" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M18.6,11.2l-12-9A1,1,0,0,0,5,3V21a1,1,0,0,0,.55.89,1,1,0,0,0,1-.09l12-9a1,1,0,0,0,0-1.6Z" style="fill: #ffffff;"></path></g></svg>`,
  });
  return <Icon icon={'icon'} width={'16px'} height={'16px'} />;
}
