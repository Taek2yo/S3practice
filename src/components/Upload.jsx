import React, { useState } from "react";
import styled from "styled-components";
import AWS from 'aws-sdk';

const Upload = () =>{
    return (
        <Container>
            <img src="" alt=""/>
            <input type={"file"}></input>
        </Container>
    )
}

export default Upload;

const Container = styled.div`
    align-items: center;
    text-align: center;
`