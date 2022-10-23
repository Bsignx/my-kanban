import { createContext, PropsWithChildren, useContext } from 'react';

import { Board } from '../types/domain';

type KanbanContextType = {
  boards?: Board[];
};

export const KanbanContext = createContext<KanbanContextType>(
  {} as KanbanContextType
);

type KanbanContextProviderProps = PropsWithChildren<{
  boards?: Board[];
}>;

export const KanbanContextProvider = ({
  children,
  boards,
}: KanbanContextProviderProps) => {
  return (
    <KanbanContext.Provider value={{ boards }}>
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);

  if (context === undefined) {
    throw new Error('useKanban must be used within a KanbanContextProvider');
  }

  return context;
};
