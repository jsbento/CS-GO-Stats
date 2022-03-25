import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CS:GO Statistics Tracker</title>
        <meta name="description" content="Track your CS game stats with one click!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="font-bold text-center text-6xl">
          Welcome to the CS:GO statistics tracker!
        </h1>

        <p className={styles.description}>
          Track your performance in CS:GO using data visualizations and tips!
        </p>

        <div className={styles.grid}>
          <a href="/statistics" className={styles.card}>
            <h2>Statistics &rarr;</h2>
            <p>Fetch your most recent statistics and view statistics history.</p>
          </a>

          <a href="/visualizations" className={styles.card}>
            <h2>Visualize &rarr;</h2>
            <p>Visualize your statistics and track growth with graphs and other visualizations.</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home;