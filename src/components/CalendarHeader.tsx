import React from 'react';
import { format } from 'date-fns';
import { useCalendar } from '../utils/CalendarContext';
import styled from 'styled-components';
import Flex from './styledComponents/Flex';

const Wrapper = styled.div`
  display: flex;
  margin: 20px;
  align-items: center;
  column-gap: 40px;
`;

const Arrow = styled.div`
  cursor: pointer;
  font-size: 22px;
`;
const Month = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const CalendarHeader: React.FunctionComponent = () => {
  const { currentMonth, setCurrentMonth, nextMonth, prevMonth } = useCalendar();

  if (!currentMonth || !setCurrentMonth) return null;

  return (
    <Wrapper>
      <Flex column="20px">
        <Arrow onClick={prevMonth}>&lt;</Arrow>
        <Arrow onClick={nextMonth}>&gt;</Arrow>
      </Flex>
      <Month onClick={() => setCurrentMonth(new Date())}>{format(currentMonth, 'MMMM yyyy')}</Month>
    </Wrapper>
  );
};

export default CalendarHeader;
