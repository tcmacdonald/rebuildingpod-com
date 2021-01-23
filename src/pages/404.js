import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import SEO from '../components/seo'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Footer from '../components/footer'

const NotFoundPage = (data) => (
  <Layout>
    <SEO title={get(this, 'data.site.siteMetadata.title')} />
    <Hero />
    <div className="wrapper" style={{ textAlign: 'center' }}>
      <h1>Well That's Awkward</h1>
      <p>The page you're looking for cannot be found.</p>
      <br />
      <br />
      <Footer />
    </div>
  </Layout>
)

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
