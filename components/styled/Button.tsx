import styled from 'styled-components'

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid ${({theme})=>theme.primary};
    color: ${({theme})=>theme.primary};
    margin: 0 1em;
    padding: 0.25em 1em;
`;

export default Button;