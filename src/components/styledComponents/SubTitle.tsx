import styled from 'styled-components';

const StyledSubTitle = styled.h2`
  color: #6b7280;
  font-weight: 500;
  font-family: Roboto;
`;
const SubTitle = (props: any) => {
  return <StyledSubTitle {...props} />;
};

export default SubTitle;
