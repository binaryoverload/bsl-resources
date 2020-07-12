/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"


import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignLanguage } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children, className }) => {
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
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand href="/"><FontAwesomeIcon icon={faSignLanguage} /> {data.site.siteMetadata.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/selection">Sign Selection</Nav.Link>
            <NavDropdown title="Info" id="basic-nav-dropdown">
              <NavDropdown.Item href="/about">About the society</NavDropdown.Item>
              <NavDropdown.Item href="/contact">Contact us</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <main>
        <Container className={`${className}`}>
          {children}
        </Container>
      </main>


      <footer className="my-4">
        <Container className="border-top pt-4">
          <p>&copy; {new Date().getFullYear()} {data.site.siteMetadata.author}</p>
          <a href="https://github.com/binaryoverload/bsl-resources">
            <FontAwesomeIcon className="text-dark" icon={faGithub} /> See this project on GitHub
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
