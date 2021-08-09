import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@material-ui/core";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";

const Create = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState(null);
    const [pictureImg, setPictureImg] = useState(null);
    const [audio, setAudio] = useState(null);
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');


    const imgHandler = e => {
        const reader = new FileReader();
        reader.onload = () => {
            setPictureImg(reader.result);
        };
        reader.readAsDataURL(e);
        setPicture(e);
    }

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    const next = () => {
        if(activeStep !== 2) {
            setActiveStep(prev => prev + 1);
        } else {
            const formData = new FormData();
            formData.append("name", name.value);
            formData.append("text", text.value);
            formData.append("artist", artist.value);
            formData.append("picture", picture);
            formData.append("audio", audio);
            axios.post("http://localhost:5000/tracks", formData).
                then(() => router.push("/tracks"))
                .catch(e => console.log(e))
        }
    }

    return (
        <MainLayout>
           <StepWrapper activeStep={activeStep}>
               {activeStep === 0 &&
                   <Grid container direction={"column"} style={{padding: 20}}>
                       <TextField
                           {...name}
                           style={{marginTop: 10}}
                           label={"Name of track"}
                       />
                       <TextField
                           {...artist}
                           style={{marginTop: 10}}
                           label={"Name of Author"}
                       />
                       <TextField
                           {...text}
                           style={{marginTop: 10}}
                           label={"Text of track"}
                           multiline
                           rows={3}
                       />
                   </Grid>
               }
               {activeStep === 1 &&
                   <>
                       <FileUpload
                           setFile={imgHandler}
                           accept="image/*"
                       >
                           <Button style={{margin: "20px 0"}}>Load Cover</Button>
                       </FileUpload>
                       {picture && <img style={{width: "100%", maxWidth: "100%"}} src={pictureImg} alt="img"/>}
                   </>
               }
               {activeStep === 2 &&
                   <FileUpload
                       setFile={setAudio}
                       accept="audio/*"
                   >
                       <Button>Load Audio</Button>
                   </FileUpload>

               }
           </StepWrapper>
            <Grid container justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;
