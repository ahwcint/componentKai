import * as React from 'react';
import { IconClose } from '../custom/icons/IconClose';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export type CardType = React.HTMLAttributes<HTMLDivElement> & {
  closeAction?: boolean;
  label?: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card = React.forwardRef<HTMLDivElement, CardType>(
  (
    { className, closeAction = true, onClose, label, children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        `rounded-xl border bg-card text-card-foreground shadow relative ${closeAction ? 'pt-9' : ''}`,
        className,
      )}
      {...props}
    >
      <CardLabel label={label} open={!!label} />
      <CloseButton onClose={onClose} open={closeAction} />
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

const CloseButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & {
    open: boolean;
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }
>(({ open, onClose }, ref) =>
  open ? (
    <Button
      className="absolute top-0 right-0 rounded-full min-w-fit bg-transparent border-primary shadow-none m-1"
      onClick={onClose}
      ref={ref}
    >
      <IconClose />
    </Button>
  ) : null,
);
CloseButton.displayName = 'CloseButton';

const CardLabel = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    label?: React.ReactNode;
    open: boolean;
  }
>(({ open, label }, ref) =>
  open ? (
    <h6 className="absolute top-0 left-0 bg-transparent px-4 pt-2" ref={ref}>
      {label}
    </h6>
  ) : null,
);
CardLabel.displayName = 'CardLabel';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
