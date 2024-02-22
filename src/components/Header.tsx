import React from 'react';
import styled from 'styled-components';
import Title from './styledComponents/Title';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Header: React.FunctionComponent = () => {
  return (
    <HeaderWrapper>
      <Title>Calendar</Title>
    </HeaderWrapper>
  );
};

export default Header;
