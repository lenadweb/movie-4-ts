import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HorizontalSlides from '../../utils/HorizontalSlides/HorizontalSlides';
import { selectSimilar } from '../../../redux/reducers/MoviesSlice';
import H from '../../utils/H/H';
import Section from '../../utils/Section/Section';
import { useGetSimilarMoviesQuery } from '../../../api/KpApi';
import Display from '../../utils/Display/Display';
import Margin from '../../utils/Margin/Margin';
import MovieCompactItem from '../MovieCompactItem/MovieCompactItem';

const SimilarFilms:FC<{movieId: string}> = ({ movieId }) => {
    useGetSimilarMoviesQuery(movieId);
    const similarFilms = useSelector(selectSimilar);

    const slides = similarFilms && similarFilms?.filter((item:any) => item?.nameRu).map((item:any, index: number) => (
        <MovieCompactItem
            delay={index * 30}
            key={item.filmId}
            id={item.filmId}
            name={item.nameRu}
            poster={item.posterUrlPreview}
        />
    ));

    return (
        <Display show={!!similarFilms?.length}>
            <Section style={{ marginTop: '24px' }}>
                <Margin margin="0 0 16px 0">
                    <H size="m">Похожие фильмы</H>
                </Margin>
                <HorizontalSlides items={slides} countOnPage={6} />
            </Section>
        </Display>
    );
};

export default SimilarFilms;
