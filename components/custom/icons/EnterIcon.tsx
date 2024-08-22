import React from 'react';
import IconSVG from './IconSVG';

export default function EnterIcon(props: Partial<TIcon>) {
  const fileName = 'enter.svg';
  const path = '/icons/' + fileName;
  return <IconSVG {...props} src={path} />;
}
