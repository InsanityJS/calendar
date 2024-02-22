import React from 'react';
import { ICalendarHoliday } from '../interfaces/calendar';
import styled from 'styled-components';

type Props = {
  holiday: ICalendarHoliday;
};

const Holiday = styled.div`
  font-size: 17px;
  font-wight: 500;
  padding: 5px;
  font-style: italic;
`;

const CalendarEvent: React.FunctionComponent<Props> = ({ holiday }) => (
  <Holiday>{holiday.name}</Holiday>
);

export default CalendarEvent;
