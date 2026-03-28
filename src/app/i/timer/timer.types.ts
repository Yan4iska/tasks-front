import { IPomodoroRoundResponse } from '@/types/pomodoro.types';

export interface ITimerState {
  secondsLeft: number;
  setSecondsLeft: (seconds: number) => void;
  activeRound: IPomodoroRoundResponse | undefined;
  setActiveRound: (round: IPomodoroRoundResponse | undefined) => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}
