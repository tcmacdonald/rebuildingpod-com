import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import PersonAttributes from '../fragments/person_attributes'
import Hero from '../components/hero'
import Person from '../components/person'
import Footer from '../components/footer'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import styles from './index.module.scss'

class RootIndex extends React.Component {
  people(people) {
    return people
      .map((edge) => edge.node)
      .map((node, i) => <Person key={`person${i}`} {...node} />)
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const people = get(this, 'props.data.allContentfulPerson.edges')
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero />
          <div className={styles.cols}>
            <div>
              <h2 className="section-headline">About Us</h2>
              <p>
                Rebuilding is a topical podcast focused on Kentucky politics and
                maintaining sanity amid COVID-19.
              </p>
              <br />
              <h2 className="section-headline">Hosts</h2>
              <div className={styles.peopleWrapper}>{this.people(people)}</div>
            </div>
            <div>
              <h2 className="section-headline">Recent posts</h2>
              <ul className="article-list">
                {posts.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson {
      edges {
        node {
          ...PersonAttributes
        }
      }
    }
  }
`
