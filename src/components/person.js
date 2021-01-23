import React, { Component } from 'react'
import { SocialIcon } from 'react-social-icons'
import Img from 'gatsby-image'
import styles from './person.module.scss'

export default class Person extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.personImage}>
          <Img fixed={this.props.image.fixed} />
        </div>
        <div className={styles.details}>
          <h2>{this.props.name}</h2>
          {this.props.showBio && (
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.shortBio.childMarkdownRemark.html,
              }}
            ></div>
          )}
          {this.props.socialAccounts &&
            this.props.socialAccounts.map((node, i) => (
              <SocialIcon
                key={`social${i}`}
                url={node.content}
                style={{ height: 25, width: 25, marginRight: 8 }}
              />
            ))}
        </div>
      </div>
    )
  }
}
