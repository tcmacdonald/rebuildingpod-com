import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import PersonAttributes from '../fragments/person_attributes'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Footer from '../components/footer'
import Person from '../components/person'
import styles from './blog-post.module.css'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'

class BlogPostTemplate extends React.Component {
  author(post) {
    return (
      <div>
        <h2 className="section-headline">Author</h2>
        <Person {...post.author} />
      </div>
    )
  }
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <Hero post={post} />
        <div className="wrapper">
          <Container>
            <Row>
              <Col sm={4}>
                <p>
                  <Img fluid={post.heroImage.fluid} />
                </p>
                <Hidden xs sm>
                  {this.author(post)}
                </Hidden>
              </Col>
              <Col>
                <h1 className="section-headline">{post.title}</h1>
                <p className={styles.date}>{post.publishDate}</p>
                <div
                  className={styles.lead}
                  dangerouslySetInnerHTML={{
                    __html: post.description.childMarkdownRemark.html,
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.body.childMarkdownRemark.html,
                  }}
                />
                <Visible xs sm>
                  {this.author(post)}
                </Visible>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      author {
        ...PersonAttributes
      }
    }
  }
`
