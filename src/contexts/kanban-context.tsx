import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { Board, Status, Task } from '../types/domain';
import { trpc } from '../utils/trpc';

type KanbanContextType = {
  boards?: Board[];
  activeBoard: Board | null;
  updateActiveBoard: (board: Board) => void;
  tasksByStatus: Record<string, Task[]>;
  statusesByBoardIdData: Status[];
  isLoadingStatusesByBoardIdData: boolean;
};

export const KanbanContext = createContext<KanbanContextType>(
  {} as KanbanContextType
);

type KanbanContextProviderProps = PropsWithChildren;

export const KanbanContextProvider = ({
  children,
}: KanbanContextProviderProps) => {
  const { data: boardsData } = trpc.kanban.getBoards.useQuery();

  const [activeBoard, setActiveBoard] = useState<Board | null>(null);

  const isValidBoard = activeBoard?.id !== null;

  const commonQueryParams = {
    boardId: activeBoard?.id ?? 0,
  };

  const commonQueryOptions = {
    enabled: isValidBoard,
  };

  const { data: tasksByBoardIdData = [] } =
    trpc.kanban.getTasksByBoardId.useQuery(
      commonQueryParams,
      commonQueryOptions
    );

  const {
    data: statusesByBoardIdData = [],
    isLoading: isLoadingStatusesByBoardIdData,
  } = trpc.kanban.getStatusesByBoardId.useQuery(
    commonQueryParams,
    commonQueryOptions
  );

  const tasksByStatus = statusesByBoardIdData.reduce(
    (acc, status) => ({
      ...acc,
      [status.title]: tasksByBoardIdData.filter(
        (task) => task.status === status.title
      ),
    }),
    {}
  );

  return (
    <KanbanContext.Provider
      value={{
        boards: boardsData,
        activeBoard,
        tasksByStatus,
        updateActiveBoard: setActiveBoard,
        statusesByBoardIdData,
        isLoadingStatusesByBoardIdData,
      }}
    >
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
