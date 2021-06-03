import { forwardRef, useRef, useImperativeHandle } from 'react';
import Countdown from 'react-countdown';

export const GameTimer = forwardRef(({totalGameTime, player, gameId, gameMode, currentMatch, finishMatchMethod, autoStart}, ref) => {
    const timerApi = useRef();

    useImperativeHandle(ref, () => ({

        pause() {
            timerApi.current.pause();
        },

        start() {
            timerApi.current.start();
        }

    }));

    const countdownRenderer = (props) => {
        // if ( props.total > 10000 ) {
            return <div>{props.minutes}:{props.seconds}</div>
        // } else {
        //     return <div>{props.seconds}:{String(props.milliseconds).slice(0, 2)}</div>
        // }
    };

    function getWinner() {
        if ( player==="player1" )
            return "player2";
        return "player1";
    };

    return (
        <div>
            {(gameMode==="online" || gameMode==="amigo") && <Countdown ref={timerApi} date={Date.now() + totalGameTime} renderer={countdownRenderer} intervalDelay={0} precision={3} autoStart={autoStart}></Countdown>}
            {gameMode==="offline" && <Countdown ref={timerApi} onComplete={() => {finishMatchMethod( {game_id: gameId, match_id: currentMatch['match_id'], match_result: "offline_finish", end_mode: "timeout", winner: currentMatch[getWinner()]} )}} date={Date.now() + totalGameTime} renderer={countdownRenderer} intervalDelay={0} precision={3} autoStart={autoStart}></Countdown>}
        </div>
    );
});
