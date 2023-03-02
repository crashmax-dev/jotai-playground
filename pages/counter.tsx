import Link from 'next/link'
import { Anchor, Button, Group, Text } from '@mantine/core'
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { counterAtom } from '@/store/counter'
import type { CounterValueType } from '@/store/counter'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

interface Props {
  counter: CounterValueType
}

export default function CounterRoute(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  useHydrateAtoms(new Map([[counterAtom, props.counter]]))
  const [counter, setCounter] = useAtom(counterAtom)

  return (
    <Group
      position="center"
      p="xl"
    >
      <Text>Value: {counter}</Text>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <Button onClick={() => setCounter(counter - 1)}>Decrement</Button>
      <Anchor
        component={Link}
        href="/"
      >
        Home
      </Anchor>
    </Group>
  )
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {
      counter: randomInt(0, 20)
    }
  }
}
