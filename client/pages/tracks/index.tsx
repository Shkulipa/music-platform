import React, {useState} from 'react';
import {useRouter} from "next/router";

import {Grid, Card, Button, Box, TextField} from "@material-ui/core";

import MainLayout from "../../layouts/MainLayout";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks, searchTrack} from "../../store/action-creators/tracks";
import {useDispatch} from "react-redux";

const Index = () => {
    const router = useRouter();
    const {tracks, error} = useTypedSelector(state => state.tracks);
    const [query, setQuery] = useState<string>();
    const dispatch = useDispatch() as NextThunkDispatch;
    const [timer, setTimer] = useState(null);


    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if(timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTrack(e.target.value));
            }, 500)
        )
    }

    if(error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout>
            <Grid container justifyContent='center'>
                <Card style={{width: '900px'}}>
                    <Box p={1}>
                        <Grid container justifyContent='space-between'>
                            <h1>List Tracks</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Load</Button>
                        </Grid>
                        <TextField
                            fullWidth
                            value={query}
                            onChange={search}
                        />
                        <TrackList tracks={tracks} />
                    </Box>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;


export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
})
