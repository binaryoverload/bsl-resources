import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { Form, Button } from "react-bootstrap"

const Required = () => ( <span className="text-danger">*</span> )

const ContactPage = () => (
    <>
      <SEO title="Contact Us" />
      <Layout className="pt-5">
        <h2>Get in touch!</h2>
        <Form method="POST" data-netlify="true" name="contact">
            <Form.Group controlId="name">
                <Form.Label>Name <Required/></Form.Label>
                <Form.Control placeholder="Enter name..."></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email <Required/></Form.Label>
                <Form.Control type="email" placeholder="Enter email..."></Form.Control>
            </Form.Group>
            <Form.Group controlId="contact_type">
                <Form.Label>What would you like to talk to us about? <Required/></Form.Label>
                <Form.Control as="select">
                    <option>I'd like more information!</option>
                    <option>I need some help!</option>
                    <option>I would like a sign adding!</option>
                    <option>I have some feedback!</option>
                    <option>Something else</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" placeholder="What would you like to tell us?" rows="5" style={{resize: "none"}}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Contact us!
            </Button>
        </Form>
      </Layout>
    </>
  )
  
  export default ContactPage