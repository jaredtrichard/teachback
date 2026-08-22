/** Tangerine flame streak counter — the daily-habit hook. */
export interface StreakBadgeProps {
  /** Consecutive study days */
  count: number;
  /** Grayed when today's session isn't done yet */
  active?: boolean;
  style?: React.CSSProperties;
}
export declare function StreakBadge(props: StreakBadgeProps): JSX.Element;
