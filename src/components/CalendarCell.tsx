import React from 'react';
import { isSameDay, isSameMonth, isToday, format } from 'date-fns';
import { useCalendar } from '../utils/CalendarContext';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import CalendarTask from './CalendarTask';
import CalendarEvent from './CalendarEvent';

type Props = {
  date: Date;
};

const Cell = styled.div`
  border: 1px rgb(229 231 235/1) solid;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
`;
const Date = styled.span`
  padding: 5px;
  &.--today {
    background-color: #dbeef5;
  }
  &.--disabled {
    opacity: 0.5;
    background-color: #e0e0e0;
  }
`;

const CalendarCell: React.FunctionComponent<Props> = ({ date }) => {
  const { holidays, savedTasks, currentMonth, selectedDate, setSelectedDate, setModalIsOpen } =
    useCalendar();

  if (!currentMonth || !setSelectedDate || !setModalIsOpen) return null;

  let classes = '';

  if (selectedDate && isSameDay(date, selectedDate)) {
    classes += ' --selected';
  }

  if (isToday(date)) {
    classes += ' --today';
  }

  if (!isSameMonth(date, currentMonth)) {
    classes += ' --disabled';
  }

  function formatToStr(date: Date) {
    const toNum = +format(date, 'dMy');
    return toNum.toString();
  }

  return (
    <Droppable droppableId={date.toISOString()} key={date.toISOString()}>
      {(provided) => (
        <Cell
          onClick={() => {
            setModalIsOpen(true);
            setSelectedDate(date);
          }}
          key={formatToStr(date)}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Date className={classes}>{format(date, 'd')}</Date>
          {holidays &&
            holidays
              .filter((holiday) => isSameDay(date, holiday.date))
              .map((holiday) => <CalendarEvent holiday={holiday} />)}
          {provided.placeholder}
          {savedTasks &&
            savedTasks
              .filter((task) => isSameDay(date, task.day))
              .filter((task) => task.filtered)
              .map((task, index) => <CalendarTask key={task.id} task={task} index={index} />)}
        </Cell>
      )}
    </Droppable>
  );
};

export default CalendarCell;
