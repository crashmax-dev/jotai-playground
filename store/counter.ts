import { atom } from 'jotai'

export type CounterValueType = number

export const counterAtom = atom<CounterValueType>(0)
