/**
 * - `ready`: waiting for the trainer to throw the pokeball
 * - `catching`: the catch request is in flight
 * - `throwing`: the pokeball has been thrown and the catch animation is running
 * - `caught`: the catch animation has ended
 */
export type BattlePhase = 'ready' | 'catching' | 'throwing' | 'caught';
