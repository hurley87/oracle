import type { NextPage } from 'next';
import * as React from 'react';
import { useRouter } from 'next/router';
import Bets from '../../components/NHL/Bets';
import Teams from '../../components/NHL/Teams';
import Game from '../../components/NHL/Game';

const ViewGamePage: NextPage = () => {
  const [gameId, setGameId] = React.useState<string | undefined>();
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      setGameId(router.query.gameId?.toString());
    }
  }, [router.isReady, router.query]);

  console.log(gameId)

  return <div><Teams />{!!gameId && (<><Game gameId={parseInt(gameId)} /> <br /> <Bets betId={parseInt(gameId)} /></>)}</div>;
};

export default ViewGamePage;
