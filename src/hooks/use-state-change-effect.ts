import { useRef, type DependencyList, type EffectCallback } from 'react';
import { useIsomorphicLayoutEffect } from '@krutoo/utils/react';

/**
 * Same as useIsomorphicLayoutEffect but ignores initial call.
 */
export function useStateChangeEffect(callback: EffectCallback, deps: DependencyList) {
  const firstCheckRef = useRef(true);

  useIsomorphicLayoutEffect(() => {
    if (firstCheckRef.current) {
      firstCheckRef.current = false;
      return;
    }

    return callback();
  }, deps);
}
