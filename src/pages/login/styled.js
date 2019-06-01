import styled from "styled-components";

import Bg from "../../static/login_bg.jpg";

export const LoginWrapper = styled.div`
    height: 100vh;
    .left-wrapper{
        height: 100%;
        background-image: url("${Bg}");
        background-size: contain;
        background-repeat: no-repeat;
        float: left;
    }
    .welcome{
        width: 300px;
        margin: 40vh ;
    }
    .right-wrapper{
        position: fixed;
        top: 20vh;
        right: 5vw;
        .ant-form{
        margin-top: 50px;
            input{
                width: 250px;
            }
        }
    }
     .right-wrapper .ant-card-body{
        text-align: center;
    }
    .input-box{
        border: none;
        background: none;
        border-bottom: 2px solid #B6B8B7;
        border-radius: 0;
    }
    .input-box:focus{
        border-bottom: 2px solid #208bd2;
    }
`;