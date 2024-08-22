'use client';
import React, { ChangeEvent, useRef, useState } from 'react';
import EnterIcon from '../icons/EnterIcon';
import { objectCase } from './objectCase';
import SearchHint from './SearchHint';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { StatusEnum, TBaseResponse } from '@/app/api/global.type';

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
        currentCommand: (...args: any) => Promise<TBaseResponse<any>>;
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
    console.log('commandFunction', commandFunction);
    if (commandFunction && commandFunction.currentCommand) {
      const res = await commandFunction.currentCommand(
        ...commandFunction.payload,
      );
      const isSuccess = res.status === StatusEnum.SUCCESS;
      const message = res.message.toUpperCase();

      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        variant: isSuccess ? 'default' : 'destructive',
        title: message || 'Invalid Command Input',
        duration: 2000,
      });

      if (isSuccess) resetSearch();
    }
  }

  function resetSearch() {
    setSearch(undefined);
    setCommandFunction(undefined);
    setPlaceholderHint(undefined);
  }

  function handleHintClicked(hint: string | undefined) {
    setSearch(hint);
    searchRef.current?.focus();
  }

  return (
    <Card className="border-none">
      <CardContent className="flex gap-2 flex-wrap" data-placeholder="asdas">
        <SearchHint
          placeholder={placeholderHint}
          onClickHint={(hint) => handleHintClicked(hint)}
        />
        <Input
          ref={searchRef}
          type="text"
          className={cn(
            `font-bold leading-3 -tracking-tighter py-4 px-5 h-8 rounded-full font-mono placeholder:font-light border-ring animate-pulse-sm w-10/12 flex-grow`,
          )}
          placeholder={placeholderInput}
          onChange={handleInputChange}
          value={search || ''}
        />
        <Button
          className="rounded-full font-extrabold min-w-28 flex-grow"
          onClick={executeCommand}
        >
          <EnterIcon colorStroke="white" />
        </Button>
      </CardContent>
    </Card>
  );
}
