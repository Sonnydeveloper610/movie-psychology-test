import React from "react";
import styled from "styled-components";
import { FaCrown, FaFilm } from "react-icons/fa";

const MagazineCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff7fa;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(180,180,200,0.18);
  padding: 40px 24px 32px 24px;
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
`;

const Balloon = styled.div`
  background: #fff3f8;
  color: #6247aa;
  font-size: 1.05rem;
  font-weight: 500;
  border-radius: 18px 18px 18px 4px;
  padding: 12px 18px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px #f9a8d420;
  display: inline-block;
`;

const GenreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
`;

const GenreName = styled.span`
  font-size: 2.3rem;
  font-weight: 800;
  color: #6247aa;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #f9a8d4 50%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Divider = styled.div`
  width: 60%;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg,#f9a8d4,#a5b4fc);
  margin: 18px 0 24px 0;
`;

const MovieListTitle = styled.div`
  font-size: 1.15rem;
  color: #6247aa;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 1px;
`;

const MovieList = styled.ul`
  padding: 0;
  margin: 0 0 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MovieItem = styled.li`
  background: #f6e9fa;
  color: #6247aa;
  font-size: 1.13rem;
  font-weight: 600;
  border-radius: 18px;
  padding: 8px 22px;
  min-width: 160px;
  text-align: center;
  box-shadow: 0 1px 8px #f9a8d420;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShareRow = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 28px;
  justify-content: center;
`;

const Button = styled.button`
  background: #ffd6e0;
  color: #6247aa;
  border: none;
  border-radius: 18px;
  font-size: 1.1rem;
  padding: 14px 0;
  width: 140px;
  font-weight: 700;
  box-shadow: 0 2px 8px #f9a8d430;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover { background: #f9a8d4; color: #fff; }
`;

const CopyMsg = styled.div`
  color: #a5b4fc;
  text-align: center;
  margin-top: 12px;
  font-size: 0.97rem;
`;

export default function ResultPage({ t, genre, movies, onShareResult, onShareApp, copyMsg }) {
  return (
    <MagazineCard>
      <Balloon>
        <FaCrown style={{color:"#f9a8d4", marginRight:6, verticalAlign:"middle"}} />
        {t.yourGenre}
      </Balloon>
      <GenreRow>
        <GenreName>{genre}</GenreName>
      </GenreRow>
      <Divider />
      <MovieListTitle>
        <FaFilm style={{marginRight:7, color:"#a5b4fc", verticalAlign:"middle"}} />
        {t.recommend}
      </MovieListTitle>
      <MovieList>
        {movies.map((m, i) => (
          <MovieItem key={i}>
            <span style={{fontSize:"1.2em", color:"#f9a8d4"}}>{i+1}.</span> {m}
          </MovieItem>
        ))}
      </MovieList>
      <ShareRow>
        <Button onClick={onShareResult}>{t.shareResult}</Button>
        <Button onClick={onShareApp}>{t.shareApp}</Button>
      </ShareRow>
      {copyMsg && <CopyMsg>{copyMsg}</CopyMsg>}
    </MagazineCard>
  );
}
