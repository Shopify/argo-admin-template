import {useEffect, useMemo, useState} from 'react';
import {
  Layout,
  LayoutHandler,
  LayoutInput,
} from '@shopify/app-extensions-renderer';
import {retain} from '@shopify/remote-ui-core';

import useResizeObserver from './useResizeObserver';

const SIZE_CLASS_BREAK_POINT = 480;

export default function useLayoutInput(): [
  ReturnType<typeof useResizeObserver>[0],
  LayoutInput | undefined,
] {
  const [ref, entry] = useResizeObserver();
  const [layout, setLayout] = useState<Layout>();
  const [initialData, setInitialData] = useState<Layout>();
  const [layoutHandler, setLayoutHandler] = useState<LayoutHandler>();

  useEffect(() => {
    if (!entry) {
      return;
    }
    const newLayout: Layout = {
      horizontal:
        entry.contentRect.width > SIZE_CLASS_BREAK_POINT
          ? 'regular'
          : 'compact',
    };
    if (!initialData) {
      setInitialData(newLayout);
    }
    if (JSON.stringify(newLayout) !== JSON.stringify(layout)) {
      setLayout(newLayout);
    }
  }, [entry]);

  useEffect(() => {
    if (!layout || !layoutHandler) {
      return;
    }
    layoutHandler.onLayoutChange(layout);
  }, [layout, layoutHandler]);

  return useMemo(() => {
    const layoutInput: LayoutInput | undefined = initialData
      ? {
          layout: {
            initialData: initialData,
            setHandler: (newHandler) => {
              retain(newHandler);
              setLayoutHandler(newHandler);
            },
          },
        }
      : undefined;
    return [ref, layoutInput];
  }, [ref, initialData]);
}
