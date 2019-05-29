import React from 'react'
import styled from 'styled-components';
import RecommendedCard from '../RecommendedCard/RecommendedCard';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`;
// TODO USE MEMOIZATION OR PURE COMPONENT TO AVOID MULTIPLE RE-RENDERS
const RecommendedDisplay = ({recommended}) => {
    console.log('re-rendering')
    return (
        <Container>
            {recommended.map(recommendedSong => {
                return(
                    <RecommendedCard
                        track={recommendedSong}
                    />
                )
            })}
        </Container>
    )
}

export default RecommendedDisplay