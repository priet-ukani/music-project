/**
 * Mobile Optimization Utilities
 * Custom hooks and utilities for enhanced mobile experience
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Detect if device is mobile
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

// Touch gesture detection
interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useSwipeGesture(handlers: SwipeHandlers, threshold: number = 50) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const minSwipeDistance = threshold;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;

    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (distanceX > minSwipeDistance && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
      }
      if (distanceX < -minSwipeDistance && handlers.onSwipeRight) {
        handlers.onSwipeRight();
      }
    } else {
      if (distanceY > minSwipeDistance && handlers.onSwipeUp) {
        handlers.onSwipeUp();
      }
      if (distanceY < -minSwipeDistance && handlers.onSwipeDown) {
        handlers.onSwipeDown();
      }
    }
  }, [handlers, minSwipeDistance]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

// Prevent body scroll when modal is open (mobile)
export function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (lock) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [lock]);
}

// Detect touch device
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  return isTouch;
}

// Haptic feedback for touch devices
export function useHapticFeedback() {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  return {
    light: () => vibrate(10),
    medium: () => vibrate(20),
    heavy: () => vibrate(30),
    success: () => vibrate([10, 50, 10]),
    error: () => vibrate([20, 100, 20]),
  };
}

// Pull-to-refresh functionality
interface PullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  resistance = 2.5,
}: PullToRefreshOptions) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (startY.current === 0) return;

    currentY.current = e.touches[0].clientY;
    const distance = currentY.current - startY.current;

    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance / resistance, threshold * 1.5));
      if (distance > threshold * resistance) {
        e.preventDefault();
      }
    }
  }, [threshold, resistance]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > threshold && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    startY.current = 0;
    currentY.current = 0;
  }, [pullDistance, threshold, isRefreshing, onRefresh]);

  return {
    pullDistance,
    isRefreshing,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}

// Orientation detection
export type Orientation = 'portrait' | 'landscape';

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
}

// Safe area insets (for notched devices)
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateSafeArea = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      setSafeArea({
        top: parseInt(computedStyle.getPropertyValue('--sat') || '0'),
        right: parseInt(computedStyle.getPropertyValue('--sar') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0'),
        left: parseInt(computedStyle.getPropertyValue('--sal') || '0'),
      });
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  return safeArea;
}

// Network status detection (for offline support)
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Long press detection
export function useLongPress(
  onLongPress: () => void,
  onClick?: () => void,
  { delay = 500 } = {}
) {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<number | undefined>(undefined);
  const target = useRef<EventTarget | undefined>(undefined);

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if ('touches' in event) {
        target.current = event.touches[0].target;
      } else {
        target.current = event.target;
      }

      timeout.current = window.setTimeout(() => {
        onLongPress();
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay]
  );

  const clear = useCallback(
    (_event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      if (timeout.current) clearTimeout(timeout.current);
      if (shouldTriggerClick && !longPressTriggered && onClick) {
        onClick();
      }
      setLongPressTriggered(false);
    },
    [onClick, longPressTriggered]
  );

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: clear,
  };
}
