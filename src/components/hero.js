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
            logo: file(relativePath: { eq: "images/logo-gray.png" }) {
              childImageSharp {
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed_tracedSVG
                }
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
              fluid={
                this.props.post
                  ? this.props.post.heroImage.fluid
                  : staticData.heroImage.childImageSharp.fluid
              }
            />
            <div className={styles.heroDetails}>
              <Link to="/">
                <Img
                  fixed={staticData.logo.childImageSharp.fixed}
                  objectFit="cover"
                  objectPosition="50% 50%"
                  alt=""
                />
              </Link>
              <h1 className={styles.h1}>
                <Link to="/">Rebuilding Podcast w/ Missy &amp; Crimson</Link>
              </h1>
            </div>
          </div>
        )}
      />
    )
  }
}
