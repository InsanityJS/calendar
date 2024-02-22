import React from 'react';
import { startOfWeek, format, addDays } from 'date-fns';
import { useCalendar } from '../utils/CalendarContext';
import Flex from './styledComponents/Flex';
import styled from 'styled-components';

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  padding: 0.5% 1%;
  background-color: #eaeaea;
`;

const CalendarDays: React.FunctionComponent = () => {
  const { currentMonth, weekStartsOn } = useCalendar();

  if (!currentMonth) return null;

  const weekStart = startOfWeek(currentMonth, {
    weekStartsOn,
  });
  const days = [];

  for (let i = 0; i < 7; i++) {
    days.push(<Days key={i}>{format(addDays(weekStart, i), 'EEEE')}</Days>);
  }

  return (
    <Flex align="center" justify="center">
      {days}
    </Flex>
  );
};

export default CalendarDays;
