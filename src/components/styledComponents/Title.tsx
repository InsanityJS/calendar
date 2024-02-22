import styled from 'styled-components';

const StyledTitle = styled.h1`
  color: #0c2d57;
  font-weight: 600;
  font-family: Roboto;
`;
const Title = (props: any) => {
  return <StyledTitle {...props} />;
};

export default Title;
