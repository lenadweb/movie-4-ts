import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import HorizontalSlides from '../../utils/HorizontalSlides/HorizontalSlides';
import { selectPrequels, selectSimilar } from '../../../redux/reducers/MoviesSlice';
import H from '../../utils/H/H';
import Section from '../../utils/Section/Section';
import { useGetPrequelsQuery, useGetSimilarMoviesQuery } from '../../../api/KpApi';
import Display from '../../utils/Display/Display';
import Margin from '../../utils/Margin/Margin';
import MovieCompactItem from '../MovieCompactItem/MovieCompactItem';

const Prequels:FC<{movieId: string}> = ({ movieId }) => {
    useGetPrequelsQuery(movieId);
    console.log(movieId);
    const prequels = useSelector(selectPrequels);

    const slides = prequels && prequels
        ?.filter((item:any) => item?.nameRu)
        .sort((a, b) => (a.filmId > b.filmId ? 1 : -1))
        .map((item:any, index: number) => (
            <MovieCompactItem
                delay={index * 30}
                key={item.filmId}
                id={item.filmId}
                name={item.nameRu}
                poster={item.posterUrlPreview}
            />
        ));

    return (
        <Display show={!!prequels?.length}>
            <Section style={{ marginTop: '24px' }}>
                <Margin margin="0 0 16px 0">
                    <H size="m">Сиквелы и приквелы</H>
                </Margin>
                <HorizontalSlides items={slides} countOnPage={6} />
            </Section>
        </Display>
    );
};

export default Prequels;
