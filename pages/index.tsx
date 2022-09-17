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
        <link rel="icon" href="http://localhost:3000/favicon.ico" />
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
        </div>
      </main>
    </div>
  )
}

export default Home;