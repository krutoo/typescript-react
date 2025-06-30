import { useMemo, useState } from 'react';
import { useIdentityRef, useIsomorphicLayoutEffect, zeroDeps } from '@krutoo/utils/react';
import { TimerPool } from '../utils/timer-pool.ts';

export type TransitionStatus =
  | 'pre-opening'
  | 'opening'
  | 'open'
  | 'pre-closing'
  | 'closing'
  | 'closed';

export interface UseTransitionStatusOptions {
  open: boolean;
  defaultOpen?: boolean;
  duration?: number;
}

export function useTransitionStatus({
  open,
  defaultOpen = open,
  duration,
}: UseTransitionStatusOptions): TransitionStatus {
  const [status, setStatus] = useState<TransitionStatus>(() => (defaultOpen ? 'open' : 'closed'));
  const statusRef = useIdentityRef(status);
  const durationRef = useIdentityRef(duration);
  const timers = useMemo(TimerPool.create, zeroDeps);

  useIsomorphicLayoutEffect(() => {
    const actualStatus = statusRef.current;

    if (open && actualStatus !== 'open') {
      timers.clearAll();
      setStatus('pre-opening');
    }

    if (!open && actualStatus !== 'closed') {
      timers.clearAll();
      setStatus('pre-closing');
    }
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    if (status === 'pre-opening') {
      timers.requestAnimationFrame(() => setStatus('opening'));
    }

    if (status === 'opening') {
      timers.setTimeout(() => setStatus('open'), durationRef.current);
    }

    if (status === 'pre-closing') {
      timers.requestAnimationFrame(() => setStatus('closing'));
    }

    if (status === 'closing') {
      timers.setTimeout(() => setStatus('closed'), durationRef.current);
    }
  }, [status]);

  return status;
}
