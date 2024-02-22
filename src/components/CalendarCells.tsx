import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import CalendarCell from './CalendarCell';
import { useCalendar } from '../utils/CalendarContext';
import styled from 'styled-components';

const Grid = styled.div`
  flex: 1 1;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
`;

const CalendarCells: React.FunctionComponent = () => {
  const { weekStartsOn, currentMonth } = useCalendar();

  if (!currentMonth) return null;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const dateStart = startOfWeek(monthStart, {
    weekStartsOn: weekStartsOn,
  });
  const dateEnd = endOfWeek(monthEnd, {
    weekStartsOn: weekStartsOn,
  });
  const dates = [];

  let date = dateStart;

  while (date <= dateEnd) {
    dates.push(<CalendarCell key={format(date, 'T')} date={date} />);

    date = addDays(date, 1);
  }

  return <Grid>{dates}</Grid>;
};

export default CalendarCells;
