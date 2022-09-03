
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head'
import Image from 'next/image'
import Layout from "../common/layouts/Layout";
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout backgroundImageUrl={"https://i.imgur.com/SDLzr35.jpg"}>
      <div className="d-flex justify-content-center align-items-center vw-100 vh-50">
      <div className="card ">
        <h5 className="card-header">搬遷公告</h5>
        <div className="card-body">
          <h5 className="card-title">網址已遷移到以下網址</h5>
          <a className="card-text">https://datalab-drinks.vercel.app/</a>
          <br/><br/>
          <a href="https://datalab-drinks.vercel.app/" className="btn btn-primary">前往</a>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})