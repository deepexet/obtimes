import React from 'react';

const SecondToHour = ({seconds}) => {

    var hours = Math.floor(seconds / 3600);
    var remainingSeconds = seconds % 3600;
    var minutes = Math.floor(remainingSeconds / 60);
    return (
        <div>
            {hours + ':' + minutes}
        </div>
    );
};

export default SecondToHour;
