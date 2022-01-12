import React from 'react';

import SeriesList from './SeriesList';

const HaveWatched = ({ token, userId }) => {
    return (
        <>
            <SeriesList 
                title='Series you have watched' 
                watchingStatus='have-watched' 
                token={token} 
                userId={userId} 
            />
        </>
    );
}

export default HaveWatched;