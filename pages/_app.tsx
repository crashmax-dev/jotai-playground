import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <details>
          <summary>pageProps</summary>
          <pre>{JSON.stringify(pageProps, null, 2)}</pre>
        </details>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}
