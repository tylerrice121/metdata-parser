import styled from "styled-components";

export const StyledApp = styled.div `
    display: flex;
    flex-direction: column;
    div{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 10px;
        form{
            width: 500px;
            height: 500px;
            display: flex;
            flex-direction: column;
            textarea{
                width: 500px;
                height: 500px;
            }
        }
        .table{
            display: flex;
            flex-direction: column;
            justify-content: flex-start !important;
            align-items: flex-start;
            width: 600px;
            height: 500px;
        }
    }
`;