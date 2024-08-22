import React from 'react';
import IconSVG from './IconSVG';

export default function NextIcon(props: Partial<TIcon>) {
  const fileName = 'next.svg';
  const path = '/icons/' + fileName;
  return <IconSVG {...props} src={path} />;
}
