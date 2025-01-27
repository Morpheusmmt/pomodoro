import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

import bellStart from '../sounds/src_sounds_bell-start.mp3';
import bellFinish from '../sounds/src_sounds_bell-finish.mp3';
import { secondsToTime } from '../utils/seconds-to-time';

const audioStartWorking = new Audio(bellFinish);
const audioStopWorking = new Audio(bellStart);

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles).fill(true));

    const [completedCyles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    // Atualiza o tempo principal quando os props mudam
    useEffect(() => {
        setMainTime(props.pomodoroTime);
    }, [props.pomodoroTime]);

    useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');

        if (mainTime <= 0) {
            if (working && cyclesQtdManager.length > 0) {
                configureRest(false);
                setCyclesQtdManager((prev) => prev.slice(0, -1));
            } else if (working && cyclesQtdManager.length <= 0) {
                configureRest(true);
                setCyclesQtdManager(new Array(props.cycles).fill(true));
                setCompletedCycles(completedCyles + 1);
            }

            if (working) {
                setNumberOfPomodoros(numberOfPomodoros + 1);
                setFullWorkingTime(fullWorkingTime + props.pomodoroTime);
            }

            if (resting) configureWork();
        }
    }, [working, resting, mainTime, cyclesQtdManager]);

    useInterval(() => {
        if (timeCounting) {
            setMainTime((prev) => prev - 1);
        }
    }, 1000);

    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);
        audioStartWorking.play();
    };

    const configureRest = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);

        if (long) {
            setMainTime(props.longRestTime);
        } else {
            setMainTime(props.shortRestTime);
        }

        audioStopWorking.play();
    };

    return (
        <div className="pomodoro">
            <h2>Você está: {working ? 'Ativo' : 'Descansando'}</h2>
            <Timer mainTime={mainTime} />
            <div className="controls">
                <Button text="Ativo" onClick={configureWork} />
                <Button text="Descansando" onClick={() => configureRest(false)} />
                <Button
                    className={!working && !resting ? 'hidden' : ''}
                    text={timeCounting ? 'Pause' : 'Play'}
                    onClick={() => setTimeCounting(!timeCounting)}
                />
            </div>

            <div className="details">
                <p>Ciclos Concluídos: {completedCyles}</p>
                <p>Tempo trabalhado: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros concluídos: {numberOfPomodoros}</p>
            </div>
        </div>
    );
}
