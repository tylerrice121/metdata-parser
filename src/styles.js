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
        flex-direction: column;
        align-items: center;
        width: 500px;
        margin: -11px;
        @media screen and (max-width: 750px) {

            width: 200px;
        }
        a{
            font-weight: 300;
            text-decoration: none;
            margin-top: 10px;
            :hover{
                text-decoration: underline;
            }
        }
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
        flex-wrap: wrap;
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
            @media screen and (max-width: 1200px) {
                margin: 100px;
            }
            @media screen and (max-width: 750px) {
                margin: 80px;
                width: 500px;
            }
            @media screen and (max-width: 450px) {
                margin: 80px;
                width: 350px;
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
            @media screen and (max-width: 1200px) {
                margin-bottom: 20px;
            }
            @media screen and (max-width: 750px) {
                margin: 10px;
                width: 500px;
            }
            @media screen and (max-width: 750px) {
                margin: 10px;
                width: 350px;
            }
            .simpleTable{
                display: flex;
                flex-direction: column;
                .tableHead{
                    border: none;
                    .tableRow{
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        border-bottom: 1px solid rgba(224, 224, 224, 1);
                        align-items: center;
                        .arrows{
                            width: 10px;
                            text-align: center;
                            padding: 0;
                            padding-top: 5px;
                            color: #858688;
                            border: none;
                            margin-right: 85px;
                            :hover{
                                cursor: pointer;
                            }
                        }
                        .hide{
                            display: none;
                        }
                        .title{
                            width: 50px;
                            border: none;
                        }
                        .value{
                            padding-right: 5px;
                        }
                        .id{
                            width: 50px;
                        }
                    }
                }
                .idRow{
                    width: 50px;
                    @media screen and (max-width: 750px) {
                        padding-right: 50px;
                    }
                    @media screen and (max-width: 450px) {
                        width: 50px;
                        padding-right: 20px;
                    }
                }
            }
        }
    }
`;