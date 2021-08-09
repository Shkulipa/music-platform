import React, {FC} from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from "@material-ui/core";

interface StepWrapperProps {
    activeStep: number;
}

const steps = ["Info About the Track", "Load Track Cover", "Load Track"]

const StepWrapper: FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                         <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: "70px 0", height: 270}}>
                <Card style={{width: 600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;
