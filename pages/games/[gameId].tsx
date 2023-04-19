import type { NextPage } from 'next';
import * as React from 'react';
import { useRouter } from 'next/router';
import Bets from '../../components/Bets';

const ViewGamePage: NextPage = () => {
  const [gameId, setGameId] = React.useState<string | undefined>();
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      setGameId(router.query.gameId?.toString());
    }
  }, [router.isReady, router.query]);

  return <div>{!!gameId && <Bets betId={parseInt(gameId)} />}</div>;
};

export default ViewGamePage;
