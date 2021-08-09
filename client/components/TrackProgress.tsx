import React, {FC} from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void;
}

const TrackProgress: FC<TrackProgressProps> =
    ({
         left, right, onChange
    }) => {

        return (
            <div style={{display: "flex"}}>
                <input
                    type="range"
                    min={0}
                    max={right}
                    value={left}
                    onChange={onChange}
                />
                <div style={{width: "75px"}}>
                    <div>{left} / {right}</div>
                </div>
            </div>
        );
    };

export default TrackProgress;
