export interface TimerInterface {
  total: number;
  current: number;
  format: () => string;
  intervalId: ReturnType<typeof setInterval> | null;
}

export enum TIMER_STATUS {
  Clean,
  Started,
  Paused,
}
