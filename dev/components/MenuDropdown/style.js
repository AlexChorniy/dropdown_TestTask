import styled from "styled-components";

export const Menu = styled.div`
    margin-left: 20px;
`;

export const Title = styled.div`
    background-color: ${({ bgColor }) => bgColor || '#5F9EA0'};
    width: 30%;
    min-height: 25px;
    padding: 7px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-top: 5px;    
`;