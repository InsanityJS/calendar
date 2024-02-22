import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Calendar from './pages/calendar';
import { styled, createGlobalStyle } from 'styled-components';
import { ApiCalls } from './services/api';
import CallendarAside from './components/CallendarAside';
import { CalendarProvider } from './utils/CalendarContext';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

function App() {
  const fetching = useRef(true);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const result = await ApiCalls.GetWorldwideHolidays();
        console.log(result);
        setHolidays(result);
      } catch (error) {
        console.error(error);
      }
    };

    if (fetching.current) {
      fetching.current = false;
      fetchHolidays();
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <CalendarProvider holidays={holidays} weekStartsOn={1}>
          <CallendarAside />
          <Calendar />
        </CalendarProvider>
      </Wrapper>
    </>
  );
}

export default App;
