import React, { useState } from "react";
import styled from "styled-components";
import ko from "./locales/ko";
import en from "./locales/en";
import es from "./locales/es";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import LoadingPage from "./components/LoadingPage";
import ResultPage from "./components/ResultPage";

// 장르 매핑 및 추천 영화
const genreScores = {
  // 한국어
  "행복": "코미디", "슬픔": "드라마", "짜증": "액션", "설렘": "로맨스",
  "스토리": "드라마", "연출": "스릴러", "배우": "로맨스", "음악": "코미디",
  "밝음": "코미디", "어두움": "스릴러", "스릴": "스릴러", "감동": "드라마",
  "짧은": "코미디", "적당한": "드라마", "긴": "스릴러", "상관없음": "로맨스",
  "혼자": "스릴러", "친구와": "코미디", "연인과": "로맨스", "가족과": "드라마",
  "코미디": "코미디", "드라마": "드라마", "액션": "액션", "로맨스": "로맨스",
  "주인공": "드라마", "악당": "스릴러", "조연": "코미디", "동물": "로맨스",
  "영화관": "액션", "집": "드라마", "야외": "코미디", "팝콘": "코미디", "콜라": "액션", "나쵸": "로맨스", "안 먹음": "드라마",
  "감정이입이 잘 되는 장르는?": "드라마", "해피엔딩": "코미디", "반전": "스릴러", "열린 결말": "드라마", "슬픈 결말": "드라마",
  "평점": "드라마", "감독": "스릴러", "배우": "로맨스", "장르": "코미디",
  // 영어
  "Happy": "Comedy", "Sad": "Drama", "Annoyed": "Action", "Excited": "Romance",
  "Story": "Drama", "Direction": "Thriller", "Actors": "Romance", "Music": "Comedy",
  "Bright": "Comedy", "Dark": "Thriller", "Thrilling": "Thriller", "Touching": "Drama",
  "Short": "Comedy", "Moderate": "Drama", "Long": "Thriller", "Doesn't matter": "Romance",
  "Alone": "Thriller", "With friends": "Comedy", "With partner": "Romance", "With family": "Drama",
  "Comedy": "Comedy", "Drama": "Drama", "Action": "Action", "Romance": "Romance",
  "Main": "Drama", "Villain": "Thriller", "Supporting": "Comedy", "Animal": "Romance",
  "Cinema": "Action", "Home": "Drama", "Outdoor": "Comedy", "Popcorn": "Comedy", "Cola": "Action", "Nachos": "Romance", "None": "Drama",
  "Happy": "Comedy", "Twist": "Thriller", "Open": "Drama", "Sad": "Drama",
  "Rating": "Drama", "Director": "Thriller", "Actor": "Romance", "Genre": "Comedy",
  // 스페인어
  "Feliz": "Comedia", "Triste": "Drama", "Molesto": "Acción", "Emocionado": "Romance",
  "Historia": "Drama", "Dirección": "Suspenso", "Actores": "Romance", "Música": "Comedia",
  "Brillante": "Comedia", "Oscuro": "Suspenso", "Emocionante": "Suspenso", "Conmovedor": "Drama",
  "Corta": "Comedia", "Moderada": "Drama", "Larga": "Suspenso", "No importa": "Romance",
  "Solo": "Suspenso", "Con amigos": "Comedia", "Con pareja": "Romance", "Con familia": "Drama",
  "Comedia": "Comedia", "Drama": "Drama", "Acción": "Acción", "Romance": "Romance",
  "Principal": "Drama", "Villano": "Suspenso", "Secundario": "Comedia", "Animal": "Romance",
  "Cine": "Acción", "Casa": "Drama", "Aire libre": "Comedia", "Palomitas": "Comedia", "Refresco": "Acción", "Nachos": "Romance", "Ninguno": "Drama",
  "Romance": "Romance", "Suspenso": "Suspenso", "Comedia": "Comedia", "Drama": "Drama",
  "Feliz": "Comedia", "Con giro": "Suspenso", "Abierto": "Drama", "Triste": "Drama",
  "Calificación": "Drama", "Director": "Suspenso", "Actor": "Romance", "Género": "Comedia"
};

const movieList = {
  // 한국어
  "코미디": ["극한직업", "럭키", "써니", "스물", "정직한 후보"],
  "드라마": ["기생충", "밀양", "시", "도가니", "완득이"],
  "액션": ["베테랑", "아저씨", "부산행", "신세계", "암살"],
  "로맨스": ["건축학개론", "노트북", "이터널 선샤인", "비포 선셋", "어바웃 타임"],
  "스릴러": ["추격자", "살인의 추억", "올드보이", "곡성", "마더"],
  // 영어
  "Comedy": ["The Hangover", "Superbad", "Bridesmaids", "Step Brothers", "21 Jump Street"],
  "Drama": ["The Shawshank Redemption", "Forrest Gump", "Parasite", "A Beautiful Mind", "Whiplash"],
  "Action": ["Mad Max: Fury Road", "John Wick", "Gladiator", "Inception", "The Dark Knight"],
  "Romance": ["The Notebook", "La La Land", "Eternal Sunshine", "Before Sunrise", "About Time"],
  "Thriller": ["Se7en", "Gone Girl", "Prisoners", "Oldboy", "The Girl with the Dragon Tattoo"],
  // 스페인어
  "Comedia": ["No se aceptan devoluciones", "Ocho apellidos vascos", "Perfectos desconocidos", "Toc Toc", "El otro lado de la cama"],
  "Drama": ["El secreto de sus ojos", "Mar adentro", "Roma", "Campeones", "La lengua de las mariposas"],
  "Acción": ["Celda 211", "El Niño", "Torrente", "El cuerpo", "La isla mínima"],
  "Romance": ["Tres metros sobre el cielo", "A tres metros sobre el cielo", "Palmeras en la nieve", "El diario de Noa", "Perdona si te llamo amor"],
  "Suspenso": ["El orfanato", "Tesis", "Los ojos de Julia", "Contratiempo", "El cuerpo"]
};

const pastel = {
  bg: "#f6f5fb",
  card: "#fff7fa",
  accent: "#a5b4fc"
};

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${pastel.bg} 60%, ${pastel.accent} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', 'Montserrat', sans-serif;
  padding: 0 8px;
`;

const Card = styled.div`
  background: ${pastel.card};
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(180,180,200,0.12);
  padding: 32px 20px;
  max-width: 420px;
  width: 100%;
  margin: 16px 0;
  @media (max-width: 480px) {
    padding: 20px 8px;
  }
`;

// 언어 감지
function detectLang() {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("es")) return "es";
  return "en";
}

export default function App() {
  const [step, setStep] = useState("start"); // start | quiz | loading | result | showResultBtn
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [copyMsg, setCopyMsg] = useState("");
  const [lang, setLang] = useState(detectLang());
  const t = { ko, en, es }[lang];

  const questions = t.questions;

  // 시작하기
  const handleStart = () => {
    setStep("quiz");
    setCurrent(0);
    setAnswers([]);
    setCopyMsg("");
  };

  // 답변 선택
  const handleAnswer = (option) => {
    setAnswers([...answers, option]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setStep("showResultBtn");
    }
  };

  // 결과보기 버튼
  const handleShowResult = () => {
    setStep("loading");
    setTimeout(() => setStep("result"), 3000);
  };

  // 장르 계산
  const getGenre = () => {
    const count = {};
    answers.forEach((ans) => {
      const genre = genreScores[ans];
      if (genre) count[genre] = (count[genre] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  };

  // 공유(POST) 기능
  const handleShareResult = () => {
    const genre = getGenre();
    const text = `[${t.testName}]\n${t.yourGenre} ${genre}\n${t.recommend}:\n${(movieList[genre]||[]).join(", ")}`;
    if (navigator.share) {
      navigator.share({ title: t.testName, text, url: window.location.href });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + "\n" + window.location.href)}`);
    }
  };

  // URL 복사
  const handleShareApp = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyMsg(t.copySuccess);
    setTimeout(() => setCopyMsg(""), 2000);
  };

  return (
    <Container>
      <Card>
        {step === "start" && (
          <StartPage t={t} onStart={handleStart} />
        )}
        {step === "quiz" && (
          <QuizPage t={t} questions={questions} current={current} onAnswer={handleAnswer} />
        )}
        {step === "showResultBtn" && (
          <button style={{
            background: "#ffd6e0", color: "#22223b", border: "none", borderRadius: "18px",
            fontSize: "1.1rem", padding: "14px 0", width: "100%", fontWeight: 600, boxShadow: "0 2px 8px #f9a8d440", cursor: "pointer"
          }} onClick={handleShowResult}>{t.showResult}</button>
        )}
        {step === "loading" && (
          <LoadingPage t={t} />
        )}
        {step === "result" && (
          <ResultPage
            t={t}
            genre={getGenre()}
            movies={movieList[getGenre()] || []}
            onShareResult={handleShareResult}
            onShareApp={handleShareApp}
            copyMsg={copyMsg}
          />
        )}
      </Card>
    </Container>
  );
}
