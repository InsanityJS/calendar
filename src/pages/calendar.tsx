import styled from 'styled-components';
import CalendarCells from '../components/CalendarCells';
import CalendarDays from '../components/CalendarDays';
import CalendarHeader from '../components/CalendarHeader';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useCalendar } from '../utils/CalendarContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 20px;
`;

const Calendar: React.FunctionComponent = () => {
  const { savedTasks, dispatchCallTask } = useCalendar();

  if (!dispatchCallTask) return null;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (destination && source && draggableId) {
      const findTask = savedTasks?.find((task) => task.id === +draggableId);

      const payload = { ...findTask, day: destination.droppableId };

      if (dispatchCallTask) {
        dispatchCallTask({ type: 'UPDATE_TASK', payload: payload });
      }
    }
  };

  return (
    <Wrapper className="calendar">
      <Header />
      <CalendarHeader />
      <CalendarDays />
      <DragDropContext onDragEnd={onDragEnd}>
        <CalendarCells />
      </DragDropContext>

      <TaskModal />
    </Wrapper>
  );
};

export default Calendar;
