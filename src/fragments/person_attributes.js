import { graphql } from 'gatsby'

export const PersonAttributes = graphql`
  fragment PersonAttributes on ContentfulPerson {
    name
    slug
    socialAccounts {
      content
    }
    shortBio {
      childMarkdownRemark {
        html
      }
    }
    image {
      fixed(width: 100, height: 100) {
        ...GatsbyContentfulFixed
      }
    }
  }
`
