import { forwardRef, useRef, useImperativeHandle } from 'react';
import Countdown from 'react-countdown';

export const GameTimer = forwardRef(({totalGameTime, player, gameId, currentMatch, finishMatchMethod, autoStart}, ref) => {
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
        if ( props.total > 10000 ) {
            return <div>{props.minutes}:{props.seconds}</div>
        } else {
            return <div>{props.seconds}:{String(props.milliseconds).slice(0, 2)}</div>
        }
    };

    return (
        <div>
            <Countdown ref={timerApi} date={Date.now() + totalGameTime} renderer={countdownRenderer} intervalDelay={10} precision={3} autoStart={autoStart}></Countdown>
        </div>
    );
});
