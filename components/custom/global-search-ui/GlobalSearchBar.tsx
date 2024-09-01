'use client';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { objectCase } from './objectCase';
import SearchHint from './SearchHint';
import { BackDropCard } from './BackDropCard';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { API_RESPONSE_STATUS } from '@/app/api/requestHandler.enum';
import { BaseResponseApi } from '@/app/api/requestHandler.type';

export default function GlobalSearchBar({
  onChange,
}: {
  /**
   * get search string
   * @param value string
   * @returns void
   */
  onChange?: (value: string) => void;
}) {
  const placeholderInput = 'type /? for help.';
  const searchRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [commandFunction, setCommandFunction] = useState<
    | {
        currentCommand: (
          ...arg: unknown[]
        ) => Promise<BaseResponseApi<unknown, string>>;
        payload: any[];
      }
    | undefined
  >(undefined);
  const [placeholderHint, setPlaceholderHint] = useState<
    Set<string> | undefined
  >(undefined);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const strSearch = e.target.value;
    setSearch(strSearch);
    onChange?.(strSearch);
    commandListener(strSearch);
  }

  function commandListener(strSearch: string) {
    if (!strSearch.startsWith('/')) return setPlaceholderHint(new Set());

    const newPlaceholder = new Set<string>();

    function includesBoth(str: string) {
      return str.includes(strSearch) || strSearch.includes(str);
    }

    for (const match of objectCase) {
      if (includesBoth(match.condition) && newPlaceholder.size <= 5) {
        newPlaceholder.add(match.action);

        if (match.fn) {
          const payload = strSearch
            .replace(match.condition, '')
            .trimStart()
            .split(' ');

          setCommandFunction({
            payload,
            currentCommand: match.fn,
          });
        }
      }
    }

    setPlaceholderHint(newPlaceholder);
  }

  async function executeCommand() {
    if (commandFunction && commandFunction.currentCommand) {
      const res = await commandFunction.currentCommand(
        ...commandFunction.payload,
      );

      if (res.code === API_RESPONSE_STATUS.ERROR)
        return toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          variant: 'destructive',
          title: 'SOMETHING WENT WRONG',
          description: res.error,
          duration: 2000,
        });

      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        variant: 'default',
        title: 'REGISTER SUCCESS',
        duration: 2000,
      });
      resetSearch();
    }
  }

  function resetSearch() {
    setSearch(undefined);
    setCommandFunction(undefined);
    setPlaceholderHint(undefined);
  }

  function handleHintClicked(hint: string | undefined) {
    setSearch(hint + ' ');
    searchRef.current?.focus();
  }

  const formik = useFormik({
    initialValues: {
      globalSearch: '',
    },
    onSubmit: () => {
      executeCommand();
    },
  });

  const handleSubmitForm = () => {
    formik.handleSubmit();
  };

  return (
    <BackDropCard>
      <Card
        closeAction
        className="shadow-none border-primary border-2 rounded-3xl min-h-32 h-fit m-auto md:w-2/4 max-w-5xl sm:w-full"
      >
        <CardContent className="flex gap-2 flex-wrap p-3 pb-4 content-start">
          <SearchHint
            placeholder={placeholderHint}
            onClickHint={(hint) => handleHintClicked(hint)}
          />
          <form className="contents" onSubmit={formik.handleSubmit}>
            <Input
              ref={searchRef}
              type="text"
              className={cn(
                'shadow-none w-10/12 border-b-2 flex-grow rounded-3xl border-0 ring-1 ring-primary',
              )}
              placeholder={placeholderInput}
              onChange={handleInputChange}
              value={search || ''}
              tabIndex={1}
            />
          </form>
        </CardContent>
        <CardFooter>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </CardFooter>
      </Card>
    </BackDropCard>
  );
}
