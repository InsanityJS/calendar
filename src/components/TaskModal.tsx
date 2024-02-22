import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconClose } from '../assets/closeIcon.svg';
import { ReactComponent as IconDelete } from '../assets/deleteIcon.svg';
import Flex from './styledComponents/Flex';
import { format } from 'date-fns';
import { useCalendar } from '../utils/CalendarContext';
import { ICalendarTask } from '../interfaces/calendar';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  transtion: opacity 0.3s;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const ModalContent = styled.div`
  position: relative;
  margin: 20px;
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 40px 20px 20px 20px;
  transform: translateY(-50px);
  transition: opacity 0.3s, transform 0.3s;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
`;

const IconButton = styled.div`
  width: 24px;
  height: 24px;
  background-color: transparent;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  &:focus {
    outline: none;
  }
`;

const StyledSpan = styled.span`
  display: inline-block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.itemProp};
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 3px;
  font-size: 20px;
  color: #ffffff;
  background-color: #2563eb;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: rgba(37, 99, 235, 0.7);
  }
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const labels = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const TaskModal: React.FunctionComponent = () => {
  const {
    dispatchCallTask,
    modalIsOpen,
    setModalIsOpen,
    selectedDate,
    selectedTask,
    setSelectedTask,
  } = useCalendar();
  const [title, setTitle] = useState<string>(selectedTask ? selectedTask?.title : '');
  const [description, setDescription] = useState<string>(
    selectedTask ? selectedTask.description : '',
  );
  const [selectedLabel, setSelectedLabel] = useState<string>(labels[0]);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setSelectedLabel(selectedTask.label);
    }
  }, [selectedTask]);

  if (!dispatchCallTask || !setModalIsOpen || !selectedDate || !setSelectedTask) return null;

  const clickAway = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLDivElement).classList.contains('modal-wrapper')) {
      clearState();
    }
  };
  function clearState() {
    if (setSelectedTask && setModalIsOpen) {
      setTitle('');
      setDescription('');
      setSelectedLabel(labels[0]);
      setSelectedTask(null);
      setModalIsOpen(false);
    }
  }
  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    const callendarTask: ICalendarTask = {
      id: selectedTask ? selectedTask.id : Number(Date.now()),
      day: selectedDate as Date,
      title: title,
      description: description,
      label: selectedLabel,
      filtered: true,
    };
    if (dispatchCallTask) {
      if (selectedTask) {
        dispatchCallTask({ type: 'UPDATE_TASK', payload: callendarTask });
        clearState();
      } else {
        dispatchCallTask({ type: 'ADD_TASK', payload: callendarTask });
        clearState();
      }
    }
  }

  function handleDeleteTask(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    if (dispatchCallTask && selectedTask) {
      dispatchCallTask({ type: 'DELETE_TASK', payload: selectedTask });
      clearState();
    }
  }

  return (
    <>
      {modalIsOpen && (
        <Modal>
          <ModalWrapper className="modal-wrapper" onClick={clickAway}>
            <ModalContent>
              <StyledHeader>
                <IconButton onClick={(e) => handleDeleteTask(e)}>
                  <IconDelete />
                </IconButton>
                <IconButton onClick={() => setModalIsOpen(false)}>
                  <IconClose />
                </IconButton>
              </StyledHeader>

              <Flex direction="column" row={'15px'}>
                <StyledInput
                  type="text"
                  name="title"
                  placeholder="Add Title *"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
                <StyledInput
                  type="text"
                  name="description"
                  placeholder="Add a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p>{format(selectedTask ? selectedTask.day : selectedDate, 'iiii, MMMM dd')}</p>
                <Flex column={'10px'}>
                  {labels.map((label, i) => (
                    <StyledSpan
                      key={i}
                      color={label}
                      itemProp={selectedLabel === label ? '0.5' : '1'}
                      onClick={() => setSelectedLabel(label)}
                    ></StyledSpan>
                  ))}
                </Flex>
                <StyledButton onClick={handleSubmit}>Save</StyledButton>
              </Flex>
            </ModalContent>
          </ModalWrapper>
        </Modal>
      )}
    </>
  );
};

export default TaskModal;
