import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@material-ui/core";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState(serverTrack);
    const router = useRouter();

    const username = useInput("");
    const text = useInput("");

    const addComment = async () => {
        try {
            const response = await axios.post("http://localhost:5000/tracks/comment", {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <MainLayout
            title={"Music - " + track.name + " - " + track.artist}
            keywords={"Music, artist: " + track.name + ", " + track.artist}
        >
            <Button
                onClick={() => router.push('/tracks')}
                variant={"outlined"}
                style={{fontSize: 32}}
            >To List</Button>
            <Grid container style={{margin: "20px 0"}} alignItems="center">
                <img src={"http://localhost:5000/" + track.picture} width="200px" height="200px" alt={track.name}  style={{marginRight: "20px"}}/>
                <div>
                    <h1>Name of Track: {track.name}</h1>
                    <h1>Artist: {track.artist}</h1>
                    <h1>Listened: {track.listens}</h1>
                </div>
            </Grid>
            <h1>Words of track</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField
                    label="Your name..."
                    fullWidth
                    {...username}
                />

                <TextField
                    label="Your comment..."
                    fullWidth
                    multiline
                    rows={4}
                    style={{marginTop: "10px"}}
                    {...text}
                />

                <Button
                    onClick={addComment}
                    variant={"outlined"}
                    style={{fontSize: 24, marginTop: "10px"}}
                >Send</Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div>
                        <div>Author: {comment.username}</div>
                        <div>Comment: {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get("http://localhost:5000/tracks/" + params.id);
    return {
        props: {
            serverTrack: response.data
        }
    }
}
