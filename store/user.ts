import { atom } from 'jotai'

export interface User {
  id: number
  name: string
}

export const userAtom = atom<User | null>(null)

export const userNameAtom = atom(
  (get) => get(userAtom)?.name ?? '',
  (get, set, name: string) => {
    const user = get(userAtom)
    if (user) {
      set(userAtom, { ...user, name })
    }
  }
)
