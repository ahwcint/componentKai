import React from 'react';
import { ReactSVG } from 'react-svg';

function IconSVG(props: Partial<TIcon> & { src: string }) {
  const {
    width = '25px',
    height = '25px',
    colorStroke = '#000000',
    colorFill = '#000000',
    src,
  } = props;
  return (
    <ReactSVG
      src={src}
      beforeInjection={(svg) => {
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('stroke', colorStroke);
        svg.setAttribute('fill', colorFill);
        svg
          .querySelectorAll('path')
          .forEach((path) => path.setAttribute('stroke', colorStroke));
      }}
      width={25}
      height={25}
      style={{ width, height }}
    />
  );
}

export default IconSVG;
