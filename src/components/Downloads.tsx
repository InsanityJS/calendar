import React from 'react';
import styled from 'styled-components';
import Flex from './styledComponents/Flex';
import SubTitle from './styledComponents/SubTitle';
import html2canvas from 'html2canvas';
import { useCalendar } from '../utils/CalendarContext';
import { ReactComponent as IconJson } from '../assets/jsonIcon.svg';
import { ReactComponent as IconImage } from '../assets/imageIcon.svg';

const IconButton = styled.div`
  cursor: pointer;
  width: 48px;
  height: 48px;
  margin-top: 10px;
`;

const Downloads: React.FunctionComponent = () => {
  const { savedTasks } = useCalendar();

  const exportJsonTasks = () => {
    const jsonFile = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(savedTasks),
    )}`;

    const link = document.createElement('a');
    link.href = jsonFile;
    link.download = 'tasks.json';

    link.click();
  };

  const downloadImage = () => {
    const calendarGrid: HTMLElement | null = document.querySelector('.calendar');

    html2canvas(calendarGrid as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'calendar.png';
      link.href = imgData;
      link.click();
    });
  };
  return (
    <Flex direction="column">
      <SubTitle>Downloads</SubTitle>
      <Flex justify="space-between">
        <IconButton>
          <IconJson onClick={exportJsonTasks} />
        </IconButton>
        <IconButton>
          <IconImage onClick={downloadImage} />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default Downloads;
