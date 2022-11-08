import React, { useState } from "react";
import styled from "styled-components";
import AWS from 'aws-sdk';

const Upload = () =>{
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID
    const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    const region = "ap-northeast-2";
    const bucket = "taek-s3test-bucket"

    AWS.config.update({
        accessKeyId : ACCESS_KEY,
        secretAccessKey : SECRET_ACCESS_KEY
    })
    
    const myBucket = new AWS.S3({
        params : { Bucket: bucket },
        region : region,
    })

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        if(file.type !== 'image/jpeg' || fileExt !=='jpg'){
          alert('jpg 파일만 Upload 가능합니다.');
          return;
        }
        setProgress(0);
        setSelectedFile(e.target.files[0]);
      }

    const uploadFile = (file) => {
        const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: bucket,
          Key: "upload/" + file.name
        };
        
        myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              setSelectedFile(null);
            }, 3000)
          })
          .send((err) => {
            if (err) console.log(err)
          })
      }
    return (
        <Container>
            <h1>File Upload to S3 Practice</h1>
            <div>
                {showAlert ? 
                    <div>업로드 진행률 : {progress}%</div>
                    : 
                    <div>파일을 선택해 주세요</div>
                }
            </div>
            <input type="file" onChange={handleFileInput}/>
            {selectedFile?(
              <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
            ) : null }
        </Container>
    )
}

export default Upload;

const Container = styled.div`
    align-items: center;
    text-align: center;
`