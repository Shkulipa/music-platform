import React, {FC} from 'react';
import Navbar from "../components/Navbar";
import {Container} from "@material-ui/core";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    children: React.ReactChild | React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({
         children,
         title,
         description,
         keywords
     }) => {

    return (
        <>
            <Head>
                <title>{title || "Music platform"}</title>
                <meta name="description" content={"Music platform" + description}/>
                <meta name="robots" content={"index, follow"}/>
                <meta name="keywords" content={keywords || "Music platform"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar/>
            <Container style={{marginTop: "90px"}}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default MainLayout;
