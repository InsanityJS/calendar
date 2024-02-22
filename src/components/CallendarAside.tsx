import React from 'react';
import styled from 'styled-components';

import FilterTask from './FilterTask';
import Downloads from './Downloads';

const WrapperAside = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
  border-right: 1px rgb(229 231 235/1) solid;
  min-width: 200px;
`;

const CallendarAside: React.FunctionComponent = () => {
  return (
    <WrapperAside>
      <FilterTask />
      <Downloads />
    </WrapperAside>
  );
};

export default CallendarAside;
