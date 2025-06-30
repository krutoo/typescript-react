import { useRef, type CSSProperties, type ReactNode } from 'react';
import { useExactClick } from '@krutoo/utils/react';
import { useTransitionStatus, useStateChangeEffect } from '#hooks';
import classNames from 'classnames';
import styles from './modal.m.css';

export interface BackdropStyle extends CSSProperties {
  '--modal-transition-duration'?: string;
}

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  children?: ReactNode;
  onOpened?: VoidFunction;
  onClose?: VoidFunction;
  onClosed?: VoidFunction;
  transitionDuration?: number;
}

/**
 * Simple modal window.
 */
export function Modal({
  children,
  open = true,
  defaultOpen = false,
  transitionDuration = 250,
  onOpened,
  onClose,
  onClosed,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  const status = useTransitionStatus({
    open,
    defaultOpen,
    duration: transitionDuration,
  });

  const backdropClickProps = useExactClick(onClose);

  useStateChangeEffect(() => {
    if (status === 'closed') {
      onClosed?.();
    }
    if (status === 'open') {
      onOpened?.();
    }
  }, [status]);

  const backdropStyle: BackdropStyle = {
    '--modal-transition-duration': `${transitionDuration}ms`,
  };

  const backdropClassName = classNames(
    //
    styles.backdrop,
    styles[`backdrop-${status}`],
  );

  const modalClassName = classNames(
    //
    styles.modal,
    styles[`modal-${status}`],
  );

  if (status === 'closed') {
    return null;
  }

  return (
    <div className={backdropClassName} style={backdropStyle} {...backdropClickProps}>
      <div ref={ref} className={modalClassName}>
        {children}
      </div>
    </div>
  );
}
