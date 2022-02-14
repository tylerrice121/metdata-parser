import styled from "styled-components";

export const StyledApp = styled.div `
    display: flex;
    flex-direction: column;
    h1{
        margin-top: 50px;
        font-weight: 400;
    }
    .syntaxError{
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        margin: -11px;
        .errorMessage{
            margin: 0;
            font-weight: 300;
            pointer-events: none;
            color: red;
        }
        
    }
    .hide{
        opacity: 0
    }
    .container{
        padding-top: none;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 10px;
        height: 500px;
        form{
            width: 600px;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .text{
                textarea{
                    font-size: 14px;
                    width: 600px;
                    height: 300px;
                }
            }
            button{
                margin-top: 10px;
            }
        }
        .table{
            border: 1px solid #c2c3c5;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start !important;
            align-items: flex-start;
            width: 600px;
            height: 423px;
            :hover{
                border: 1px solid #232324;
            }
        }
    }
`;