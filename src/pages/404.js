import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Result } from "antd"

import "antd/es/result/style/index.css"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <Result
      status="404"
      title="Not Found!"
      subTitle="This page doesn't exist... the sadness."
      />
  </Layout>
)

export default NotFoundPage
