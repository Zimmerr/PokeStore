import styled from 'styled-components';

const OutlineButton = styled.button `
  padding: 1rem;
  font-size: 1.3em;
  border: none;
  border: 1px solid ${props => props.theme.buttonColor};
  background: white;
  color: ${props => props.theme.buttonColor};
  cursor: pointer;
  margin:0;
  outline:none;

  &:hover {
    color: white;
    background: ${props => props.theme.buttonColor};
    transition: all 0.3s;
  }
`;

export default OutlineButton;