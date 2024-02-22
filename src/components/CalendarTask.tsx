import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ICalendarTask } from '../interfaces/calendar';
import styled from 'styled-components';
import { useCalendar } from '../utils/CalendarContext';

type Props = {
  task: ICalendarTask;
  index: number;
};

const Task = styled.div`
  z-index: 100;
  cursor: pointer;
  background-color: ${(props: any) => props.color};
  color: #ffffff;
  text-transform: capitalize;
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  opacity: 0.7;
`;

const CalendarTask: React.FunctionComponent<Props> = ({ task, index }) => {
  const { setSelectedTask, setModalIsOpen } = useCalendar();
  if (!setSelectedTask || !setModalIsOpen) return null;

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => {
        return (
          <Task
            color={task.label}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => {
              setSelectedTask(task);
              setModalIsOpen(true);
            }}
          >
            {task.title}
          </Task>
        );
      }}
    </Draggable>
  );
};

export default CalendarTask;
