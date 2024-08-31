import { CSSProperties } from 'react';
import styled from '@emotion/styled';

export const Container = styled.div<
  CSSProperties & { isExpand: boolean; textInlineStart: string }
>((props) => ({
  position: 'relative',
  color: 'goldenrod',
  animation: `${props.isExpand ? 'expandInline' : 'collapeInline'} 0.3s ease forwards`,
  whiteSpace: 'nowrap',
  opacity: '1',
  '&::before': {
    content: "''",
    position: 'absolute',
    top: '0',
    left: '0',
    width: '3.6rem',
    height: 'inherit',
    borderRight: '5px solid transparent',
    paddingInlineStart: '0.5rem',
    paddingInlineEnd: '0.35rem',
    transform: 'skew(-20deg)',
    color: 'gold',
  },
  '&::after': {
    content: `'${props.textInlineStart}'`,
    position: 'absolute',
    textAlign: 'center',
    top: '0',
    left: '0',
    width: '3.6rem',
    height: 'inherit',
    paddingInlineStart: '0.5rem',
    paddingInlineEnd: '0.35rem',
    color: 'gold',
  },
  '@keyframes expandInline': {
    from: {
      width: '30%',
      opacity: '0',
    },
    to: {
      width: '100%',
      opacity: '1',
    },
  },
  '@keyframes collapeInline': {
    from: {
      width: '100%',
      opacity: '1',
    },
    to: {
      width: '30%',
      opacity: '0',
    },
  },
}));
