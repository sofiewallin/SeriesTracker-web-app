import React from 'react';

import SeriesList from './SeriesList';

const WatchNext = ({ token, userId }) => {
    return (
        <>
            <SeriesList 
                title='Series you want to watch next' 
                watchingStatus='watch-next' 
                token={token} 
                userId={userId} 
            />
        </>
    );
}

export default WatchNext;