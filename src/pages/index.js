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
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'

class RootIndex extends React.Component {
  people(people) {
    return people
      .map((edge) => edge.node)
      .map((node, i) => <Person key={`person${i}`} showBio={true} {...node} />)
  }

  aboutUs() {
    return (
      <section class="well">
        <h2 className="section-headline">{this.props.data.aboutBlock.title}</h2>
        {documentToReactComponents(this.props.data.aboutBlock.markdown.json)}
      </section>
    )
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const people = get(this, 'props.data.allContentfulPerson.edges')
    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Hero />
        <div className="wrapper">
          <Container>
            <Row gutterWidth={30}>
              <Col sm={7}>
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *"
                  frameborder="0"
                  height="450"
                  style={{
                    width: '100%',
                    maxWidth: '660px',
                    overflow: 'hidden',
                    background: 'transparent',
                    marginBottom: '2rem',
                  }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src="https://embed.podcasts.apple.com/us/podcast/rebuilding-pod/id1550206876"
                ></iframe>

                <Visible xs sm>
                  {this.aboutUs()}
                </Visible>
                <ul className={[styles.articleList].join(' ')}>
                  {posts.map(({ node }) => {
                    return (
                      <li key={node.slug}>
                        <ArticlePreview article={node} />
                      </li>
                    )
                  })}
                </ul>
              </Col>
              <Col sm={5}>
                <Hidden xs sm>
                  {this.aboutUs()}
                </Hidden>
                <section>
                  <h2 className="section-headline">Hosts</h2>
                  <div className={styles.peopleWrapper}>
                    {this.people(people)}
                  </div>
                </section>
              </Col>
            </Row>
          </Container>
        </div>

        <Footer />
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
    aboutBlock: contentfulContentBlock(slug: { eq: "about-us" }) {
      title
      markdown: childContentfulContentBlockBodyRichTextNode {
        json
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
            fluid(maxWidth: 700) {
              ...GatsbyContentfulFluid
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
