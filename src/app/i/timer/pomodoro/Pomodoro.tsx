'use client';

import { Loader, Pause, Play, RefreshCcw } from 'lucide-react';
import styles from './Pomodoro.module.scss';

import { Button } from '@/components/ui/buttons/Button';

import { useCreateSession } from '../hooks/useCreateSession';
import { useDeleteSession } from '../hooks/useDeleteSession';
import { useTimer } from '../hooks/useTimer';
import { useTimerActions } from '../hooks/useTimerActions';
import { useTodaySession } from '../hooks/useTodaySession';
import { PomodoroRounds } from '../rounds/PomodoroRounds';
import { formatTime } from '../format-timer';

export function Pomodoro() {
  const timerState = useTimer();
  const { isLoading, sessionsResponse, workInterval } = useTodaySession(timerState);

  const rounds = sessionsResponse?.data.rounds;
  const actions = useTimerActions({ ...timerState, rounds });

  const { isPending, mutate } = useCreateSession();
  const { deleteSession, isDeletePending } = useDeleteSession(() =>
    timerState.setSecondsLeft(workInterval * 60),
  );

  return (
    <div className={styles.container}>
      {!isLoading && <div className={styles.timer}>{formatTime(timerState.secondsLeft)}</div>}
      {isLoading ? (
        <Loader />
      ) : sessionsResponse?.data ? (
        <>
          <PomodoroRounds
            rounds={rounds}
            nextRoundHandler={actions.nextRoundHandler}
            prevRoundHandler={actions.prevRoundHandler}
            activeRound={timerState.activeRound}
          />
          <button
            className={styles.controlButton}
            onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
            disabled={actions.isUpdateRoundPending}
          >
            {timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
          </button>
          <button
            onClick={() => {
              timerState.setIsRunning(false);
              deleteSession(sessionsResponse.data.id);
            }}
            className={styles.resetButton}
            disabled={isDeletePending}
          >
            <RefreshCcw size={19} />
          </button>
        </>
      ) : (
        <Button onClick={() => mutate()} className={styles.createButton} disabled={isPending}>
          Create session
        </Button>
      )}
    </div>
  );
}
