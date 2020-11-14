import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default ({ data }) => (
  <StaticQuery
    query={graphql`
    query HeroQuery {
      site {
        siteMetadata {
          title
        }
      }
      heroImage: file(relativePath: { eq: "images/cincinnati-in-1812-2000-population-ohio-3.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `}
    render={data => (
      <div className={styles.hero}>
        <Img
          className={styles.heroImage}
          alt={data.name}
          fluid={data.heroImage.childImageSharp.fluid}
        />
        <div className={styles.heroDetails}>
          <h3 className={styles.heroHeadline}>{data.site.siteMetadata.title}</h3>
        </div>
      </div>
    )}
  />

)

