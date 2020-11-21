import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './hero.module.css'

export default class Hero extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query HeroQuery {
            site {
              siteMetadata {
                title
              }
            }
            heroImage: file(
              relativePath: {
                eq: "images/cincinnati-in-1812-2000-population-ohio-3.jpg"
              }
            ) {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={(staticData) => (
          <div className={styles.hero}>
            <Img
              className={styles.heroImage}
              alt={staticData.name}
              fluid={this.props.post ? this.props.post.heroImage.fluid : staticData.heroImage.childImageSharp.fluid}
            />
            <div className={styles.heroDetails}>
              <h3 className={styles.heroHeadline}>
                <Link to="/">{staticData.site.siteMetadata.title}</Link>
              </h3>
            </div>
          </div>
        )}
      />
    )
  }
}
