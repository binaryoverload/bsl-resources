/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"


import { Container, Navbar } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/"><FontAwesomeIcon icon={faSignLanguage}/> {data.site.siteMetadata.title}</Navbar.Brand>
      </Navbar>

      <main>
        <Container className="pt-5">
          { children }
        </Container>
      </main>


    <footer className="my-4">
      <Container className="border-top pt-4">
      <p>&copy; {new Date().getFullYear()}. {data.site.siteMetadata.author}</p>
      <a href="https://github.com/binaryoverload/bsl-resources">
        See this project on GitHub <FontAwesomeIcon className="text-dark" icon={faGithub}/>
      </a>
      </Container>
    </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
