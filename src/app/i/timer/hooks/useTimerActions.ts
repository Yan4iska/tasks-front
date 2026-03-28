import type { IPomodoroRoundResponse } from '@/types/pomodoro.types';

import type { ITimerState } from '../timer.types';

import { useLoadSettings } from './useLoadSettings';
import { useUpdateRound } from './useUpdateRound';

type TypeUseTimerActions = ITimerState & {
  rounds: IPomodoroRoundResponse[] | undefined;
};

export function useTimerActions({
  activeRound,
  setIsRunning,
  secondsLeft,
  setSecondsLeft,
  rounds,
  setActiveRound,
}: TypeUseTimerActions) {
  const { workInterval } = useLoadSettings();
  const { isUpdateRoundPending, updateRound } = useUpdateRound();

  const pauseHandler = () => {
    setIsRunning(false);
    if (!activeRound?.id) return;

    updateRound({
      id: activeRound?.id,
      data: {
        totalSeconds: secondsLeft,
        isCompleted: Math.floor(secondsLeft / 60) >= workInterval,
      },
    });
  };

  const playHandler = () => {
    setIsRunning(true);
  };

  const nextRoundHandler = () => {
    if (!activeRound?.id || !rounds) return;

    const currentIndex = rounds.findIndex((r) => r.id === activeRound.id);
    if (currentIndex === -1 || currentIndex >= rounds.length - 1) return;

    // Завершаем текущий раунд
    updateRound({
      id: activeRound.id,
      data: {
        isCompleted: true,
        totalSeconds: workInterval * 60,
      },
    });

    // Активируем следующий раунд
    const nextRound = rounds[currentIndex + 1];
    setActiveRound(nextRound);

    // Сбрасываем таймер
    setSecondsLeft(nextRound.totalSeconds || workInterval * 60);
  };

  const prevRoundHandler = () => {
    if (!rounds || !activeRound) return;

    const currentIndex = rounds.findIndex((r) => r.id === activeRound.id);
    if (currentIndex <= 0) return;

    // Находим предыдущий завершенный раунд
    const prevCompletedRound = rounds
      .slice(0, currentIndex)
      .reverse()
      .find((r) => r.isCompleted);

    if (!prevCompletedRound) return;

    // Сбрасываем статус предыдущего раунда
    updateRound({
      id: prevCompletedRound.id,
      data: {
        isCompleted: false,
        totalSeconds: workInterval * 60,
      },
    });

    // Активируем предыдущий раунд
    setActiveRound(prevCompletedRound);
    setSecondsLeft(prevCompletedRound.totalSeconds || workInterval * 60);
  };

  return {
    isUpdateRoundPending,
    pauseHandler,
    playHandler,
    nextRoundHandler,
    prevRoundHandler,
  };
}
