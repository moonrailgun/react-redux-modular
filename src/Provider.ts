import { createElement, FC } from 'react';
import { modelContext } from './context';

interface ProviderProps {
  store: any;
}
export const ModelProvider: FC<ProviderProps> = (props) => {
  const Provider = modelContext.Provider;

  return createElement(
    Provider,
    {
      value: props.store,
    },
    props.children
  );
};
