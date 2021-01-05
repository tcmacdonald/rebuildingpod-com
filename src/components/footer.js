import React, { Component } from 'react'
import styles from './footer.module.css'

export default class Footer extends Component {
  render() {
    return (
      <div className={`${styles.footer}`}>
        &copy; Copyright {new Date().getFullYear()} &middot; All rights
        reserved.
      </div>
    )
  }
}
