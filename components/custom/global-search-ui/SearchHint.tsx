import React, {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { IconNext } from '../icons/IconNext';
import { Container } from './styled.component';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// export default function SearchHint(props: {
//   placeholder: Set<string> | undefined;
//   onClickHint?: (str: string | undefined) => void;
// }) {
//   const size = (props.placeholder as Set<string>)?.size;
//   const totalHint = useMemo(
//     () => Array.from(props.placeholder ?? []),
//     [props.placeholder],
//   );
//   const [indexHint, setIndexHint] = useState(0);
//   const [actualRender, setActualRender] = useState<string | undefined>(
//     undefined,
//   );

//   function handleNextHint() {
//     setIndexHint((prev) => {
//       if (prev + 1 > totalHint.length - 1) return 0;
//       return ++prev;
//     });
//     setActualRender(totalHint[indexHint]);
//   }

//   function handleHintClicked() {
//     props.onClickHint?.(actualRender?.split(' ')?.[0]);
//   }

//   useEffect(() => {
//     setIndexHint(0);
//     setActualRender(totalHint[0]);
//   }, [totalHint]);
//   return (
//     <div
//       className={cn(
//         `transition-[height] ${!!size ? 'h-6' : 'h-0'} overflow-visible w-full`,
//       )}
//     >
//       <Container
//         className={cn('bg-primary w-full rounded-xl pl-16 h-6')}
//         isExpand={size ? true : false}
//         textInlineStart={'HINT'}
//       >
//         <section className="flex justify-between h-full">
//           <Button
//             onClick={handleHintClicked}
//             className="h-full p-2 focus-visible:bg-primary-foreground"
//             variant={'ghost'}
//             tabIndex={actualRender ? 2 : -1}
//           >
//             <p>{actualRender}</p>
//           </Button>
//           {size ? (
//             <Button
//               onClick={handleNextHint}
//               className="h-full rounded-full text-white gap-2"
//               variant={'ghost'}
//               disabled={size < 2}
//               tabIndex={-1}
//             >
//               <p>{`${indexHint + 1}/${size}`}</p>
//               <IconNext />
//             </Button>
//           ) : null}
//         </section>
//       </Container>
//     </div>
//   );
// }

export type SearchHintRefProps = {
  getHint: () => void;
};

function SearchHint(props: {
  placeholder: Set<string> | undefined;
  onClickHint?: (str: string | undefined) => void;
  ref?: Ref<SearchHintRefProps>;
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

  const isExpand = props.placeholder === undefined ? props.placeholder : !!size;

  useImperativeHandle(props.ref, () => ({
    getHint: handleHintClicked,
  }));

  function handleNextHint() {
    setIndexHint((prev) => {
      if (prev + 1 > totalHint.length - 1) return 0;
      return ++prev;
    });
    setActualRender(totalHint[indexHint]);
  }

  function handleHintClicked() {
    if (actualRender?.split(' ')[0])
      props.onClickHint?.(actualRender.split(' ')[0]);
  }

  useEffect(() => {
    setIndexHint(0);
    setActualRender(totalHint[0]);
  }, [totalHint]);

  return (
    <div
      className={cn(
        `transition-[height] ${!!size ? 'h-6' : 'h-0'} overflow-visible w-full`,
      )}
    >
      <Container
        className={cn('bg-primary w-full rounded-xl pl-16 h-6')}
        isExpand={isExpand}
        textInlineStart={'HINT'}
      >
        <section className="flex justify-between h-full">
          <Button
            onClick={handleHintClicked}
            className="h-full p-2 focus-visible:bg-primary-foreground"
            variant={'ghost'}
            tabIndex={actualRender ? 2 : -1}
          >
            <p>{actualRender}</p>
          </Button>
          {size ? (
            <Button
              onClick={handleNextHint}
              className="h-full rounded-full text-white gap-2"
              variant={'ghost'}
              disabled={size < 2}
              tabIndex={-1}
            >
              <p>{`${indexHint + 1}/${size}`}</p>
              <IconNext />
            </Button>
          ) : null}
        </section>
      </Container>
    </div>
  );
}

export default SearchHint;
