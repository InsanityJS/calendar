import styled from 'styled-components';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${(props: any) => props.direction || 'row'};
  align-items: ${(props: any) => props.align || 'stretch'};
  justify-content: ${(props: any) => props.justify || 'stretch'};
  flex-wrap: ${(props: any) => props.wrap || 'nowrap'};
  margin: ${(props: any) => props.margin || '0'};
  row-gap: ${(props: any) => props.row || '0'};
  column-gap: ${(props: any) => props.column || '0'};
`;
const Flex = (props: any) => {
  return <StyledFlex {...props} />;
};

export default Flex;
