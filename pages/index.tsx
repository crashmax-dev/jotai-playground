import Link from 'next/link'
import { Anchor, Group, Input, Text } from '@mantine/core'
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { userAtom, userNameAtom } from '@/store/user'
import type { User } from '@/store/user'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

interface Props {
  user: User
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  useHydrateAtoms(props.user ? new Map([[userAtom, props.user]]) : [])
  const [user] = useAtom(userAtom)
  const [userName, setUserName] = useAtom(userNameAtom)

  return (
    <Group
      position="center"
      p="xl"
    >
      {user ? (
        <>
          <details>
            <summary>userAtom</summary>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </details>
          <Text>{userName}</Text>
          <Input
            defaultValue={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <Anchor
            component={Link}
            href="/counter"
          >
            Counter
          </Anchor>
        </>
      ) : (
        <Text>User not found</Text>
      )}
    </Group>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const userId = ctx.query.id ?? 1
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}
  `
  )
  const user = response.ok ? await response.json() : null

  return {
    props: {
      user
    }
  }
}
