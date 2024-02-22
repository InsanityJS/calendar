import React from 'react';
import { useCalendar } from '../utils/CalendarContext';
import styled from 'styled-components';
import SubTitle from './styledComponents/SubTitle';

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;
const StyledInput = styled.input`
  accent-color: ${(props: any) => props.color};
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-color: transparent;
  opacity: 0.7;
  border-radius: 5px;
  width: 20px;
  height: 20px;
`;
const StyledSpan = styled.span`
  margin-left: 5px;
  text-transform: capitalize;
`;

const FilterTask: React.FunctionComponent = () => {
  const { labels, dispatchCallTask, savedTasks } = useCalendar();

  if (!dispatchCallTask) return null;

  function filter(label: string) {
    if (dispatchCallTask) {
      dispatchCallTask({ type: 'FILTER_TASK', payload: label });
    }
  }

  return (
    <>
      <SubTitle>Filter tasks</SubTitle>
      {labels &&
        labels.map((label, index) => {
          const taskFiltered = savedTasks?.find((task) => task.label === label && task.filtered);

          return (
            <StyledLabel key={index}>
              <StyledInput
                type="checkbox"
                checked={taskFiltered ? true : false}
                color={label}
                onChange={() => {
                  filter(label);
                }}
              ></StyledInput>
              <StyledSpan>{label}</StyledSpan>
            </StyledLabel>
          );
        })}
    </>
  );
};

export default FilterTask;
