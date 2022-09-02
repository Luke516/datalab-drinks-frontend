
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head'
import Image from 'next/image'
import Layout from "../common/layouts/Layout";
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    // TODO <div className={styles.container}>
    // </div>
    <Layout backgroundImageUrl={"https://i.imgur.com/SDLzr35.jpg"}>
      HOME
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})