import React, { useEffect, useMemo, useState } from 'react';
import NextIcon from '../icons/NextIcon';
import { Container } from './styled.component';
import { Button } from '@/components/ui/Button';

export default function SearchHint(props: {
  placeholder: Set<string> | undefined;
  onClickHint?: (str: string | undefined) => void;
}) {
  const size = (props.placeholder as Set<string>)?.size;
  const totalHint = useMemo(
    () => Array.from(props.placeholder ?? []),
    [props.placeholder],
  );
  const [indexHint, setIndexHint] = useState(0);
  const [actualRender, setActualRender] = useState<string | undefined>(
    undefined,
  );
  const isFirstTimeRender = size !== undefined;

  function handleNextHint() {
    setIndexHint((prev) => {
      if (prev + 1 > totalHint.length - 1) return 0;
      return ++prev;
    });
    setActualRender(totalHint[indexHint]);
  }

  function handleHintClicked() {
    props.onClickHint?.(actualRender?.split(' ')?.[0]);
  }

  useEffect(() => {
    setIndexHint(0);
    setActualRender(totalHint[0]);
  }, [totalHint]);
  return isFirstTimeRender ? (
    <Container
      className={'bg-primary w-full rounded-xl pl-16'}
      isExpand={size ? true : false}
      textInlineStart={'HINT'}
    >
      <section className="flex justify-between h-full">
        <Button
          onClick={handleHintClicked}
          className="h-full p-2"
          variant={'ghost'}
        >
          <p>{actualRender}</p>
        </Button>
        {size ? (
          <Button
            onClick={handleNextHint}
            className="h-full rounded-full text-white gap-2"
            variant={'ghost'}
            disabled={size < 2}
          >
            <p>{`${indexHint + 1}/${size}`}</p>
            <NextIcon colorFill="white" width="1rem" height="1rem" />
          </Button>
        ) : null}
      </section>
    </Container>
  ) : null;
}
