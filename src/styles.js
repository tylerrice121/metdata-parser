import styled from "styled-components";

export const StyledApp = styled.div `
    display: flex;
    flex-direction: column;
    h1{
        margin-bottom: -10px !important;
        font-weight: 400;
    }
    h3{
        margin-bottom: -20px !important;
        font-weight: 400;
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