import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import EmailLink from "../components/EmailLink"
import { Form, Button, Row, Col } from "react-bootstrap"

const Required = () => (<span className="text-danger">*</span>)

const ContactForm = () => (
    <Form method="post" data-netlify="true" data-netlify-recaptcha="true" name="contact">
        <Form.Group controlId="name">
            <Form.Label>Name <Required /></Form.Label>
            <Form.Control required name="name" placeholder="Enter name..."></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
            <Form.Label>Email <Required /></Form.Label>
            <Form.Control required type="email" name="email" placeholder="Enter email..."></Form.Control>
        </Form.Group>
        <Form.Group controlId="contact_type">
            <Form.Label>What would you like to talk to us about? <Required /></Form.Label>
            <Form.Control required name="contact_type" as="select">
                <option>I'd like more information!</option>
                <option>I need some help!</option>
                <option>I would like a sign adding!</option>
                <option>I have some feedback!</option>
                <option>Something else</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="message">
            <Form.Label>Message <Required /></Form.Label>
            <Form.Control required name="message" as="textarea" placeholder="What would you like to tell us?" rows="5" style={{ resize: "none" }} />
        </Form.Group>
        <div data-netlify-recaptcha="true"></div>
        <input type="hidden" name="form-name" value="contact" />
        <Button variant="primary" type="submit">
            Contact us!
        </Button>
    </Form>
)

const ContactPage = () => (
    <>
        <SEO title="Contact Us" />
        <Layout className="pt-5">
            <Row>
                <Col md={{span: 4, offset: 2}}>
                    <h2>Get in touch!</h2>
                    <p>This website is run by the University of Lincoln's British Sign Language Society. We welcome any questions or feedback about this site!</p>
                    <p>You may find out more about this site or the society by visiting our <Link to="/about">about page</Link>.</p>
                    <h4>Individual contact details</h4>
                    <p>Should you need to get into contact with the society's committee directly, please contact one of the emails below:</p>
                    {/* <div>
                        President (William Oldham)<br/>
                        <EmailLink className="text-primary ml-2">19693813@students.lincoln.ac.uk</EmailLink>
                    </div> */}
                    <div>
                        Instructor and Welfare - Lewis Duke<br/>
                        <EmailLink className="ml-2">16647829@students.lincoln.ac.uk</EmailLink>
                    </div>
                </Col>
                <Col md={4}>
                    <ContactForm />
                </Col>
            </Row>
        </Layout>
    </>
)

export default ContactPage