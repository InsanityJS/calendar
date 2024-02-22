import React, { useContext, useEffect, useReducer, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarWeekStartsOn, ICalendarHoliday, ICalendarTask } from '../interfaces/calendar';

type CalendarContextType = {
  holidays: ICalendarHoliday[];
  weekStartsOn: CalendarWeekStartsOn;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  prevMonth: () => void;
  nextMonth: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  dispatchCallTask: ({ type, payload }: any) => void;
  savedTasks: ICalendarTask[];
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  selectedTask: ICalendarTask;
  setSelectedTask: ({}: any) => void;
  labels: string[];
  setLabels: ([]: string[]) => void;
};

const CalendarContext = React.createContext<Partial<CalendarContextType>>({});

export const useCalendar = () => useContext(CalendarContext);

type CalendarProviderProps = {
  children: React.ReactNode;
  holidays: ICalendarHoliday[];
  weekStartsOn: CalendarWeekStartsOn;
};
function savedTasksReducer(state: ICalendarTask[], { type, payload }: any) {
  switch (type) {
    case 'ADD_TASK':
      return [...state, payload];
    case 'UPDATE_TASK':
      return state.map((t) => (t.id === payload.id ? payload : t));
    case 'DELETE_TASK':
      return state.filter((t) => t.id !== payload.id);
    case 'FILTER_TASK':
      return state.map((t) => (t.label === payload ? { ...t, filtered: !t.filtered } : t));
    default:
      return state;
  }
}

function initTasks() {
  const storageTasks = localStorage.getItem('savedTasks');
  const parsedTasks = storageTasks ? JSON.parse(storageTasks) : [];

  return parsedTasks;
}
export const CalendarProvider: React.FunctionComponent<CalendarProviderProps> = ({
  children,
  holidays,
  weekStartsOn,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchText, setSearchText] = useState<string | undefined>();
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ICalendarTask>();
  const [labels, setLabels] = useState<string[]>([]);
  const [savedTasks, dispatchCallTask] = useReducer(savedTasksReducer, [], initTasks);

  useEffect(() => {
    localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
  }, [savedTasks]);

  useEffect(() => {
    setLabels(() => {
      return [...new Set(savedTasks.map((t) => t.label))];
    });
  }, [savedTasks]);

  return (
    <CalendarContext.Provider
      value={{
        holidays,
        weekStartsOn,
        currentMonth,
        setCurrentMonth,
        selectedDate,
        setSelectedDate,
        prevMonth,
        nextMonth,
        searchText,
        setSearchText,
        dispatchCallTask,
        savedTasks,
        modalIsOpen,
        setModalIsOpen,
        selectedTask,
        setSelectedTask,
        setLabels,
        labels,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
