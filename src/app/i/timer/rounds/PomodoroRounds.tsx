import cn from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { IPomodoroRoundResponse } from '@/types/pomodoro.types';

import styles from './PomodoroRounds.module.scss';

interface IPomodoroRounds {
  rounds: IPomodoroRoundResponse[] | undefined;
  nextRoundHandler: () => void;
  prevRoundHandler: () => void;
  activeRound: IPomodoroRoundResponse | undefined;
}

export function PomodoroRounds({
  rounds,
  nextRoundHandler,
  prevRoundHandler,
  activeRound,
}: IPomodoroRounds) {
  const currentRoundIndex = rounds?.findIndex((round) => round.id === activeRound?.id) ?? -1;
  const isCanPrevRound = currentRoundIndex > 0;
  const isCanNextRound = currentRoundIndex < (rounds?.length ?? 0) - 1;

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!isCanPrevRound}
        onClick={() => isCanPrevRound && prevRoundHandler()}
      >
        <ChevronLeft size={23} />
      </button>
      <div className={styles.roundsContainer}>
        {rounds &&
          rounds.map((round, index) => (
            <div
              key={index}
              className={cn(styles.round, {
                [styles.completed]: round.isCompleted,
                [styles.active]: round.id === activeRound?.id && !round.isCompleted,
              })}
            />
          ))}
      </div>
      <button
        className={styles.button}
        disabled={!isCanNextRound}
        onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
      >
        <ChevronRight size={23} />
      </button>
    </div>
  );
}
