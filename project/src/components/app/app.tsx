import MainComponent from '../main-component/main-component';

type AppScreenProps = {
  filmCardsCount: number;
  promoFilmCard: {
    name: string,
    genre: string,
    released: number,
  };
}

function App({filmCardsCount, promoFilmCard}: AppScreenProps): JSX.Element {
  return (
    <MainComponent filmCardsCount={filmCardsCount} promoFilmCard={promoFilmCard}/>
  );
}

export default App;
