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

const CommitteeCard = ({ children }) => {
    return (
        <div className="border rounded p-2 m-1 text-center" style={{"max-width": "350px"}}>
            {children}
        </div>
    )
}

const ContactPage = () => (
    <>
        <SEO title="Contact Us" />
        <Layout className="pt-5">
            <Row>
                <Col md={{span: 6}}>
                    <h2>Get in touch!</h2>
                    <p>This website is run by the University of Lincoln's British Sign Language Society. We welcome any questions or feedback about this site!</p>
                    <p>You may find out more about this site or the society by visiting our <Link to="/about">about page</Link>.</p>
                    <p>For any generic queries or to contact the whole committee, please use our Lincoln SU email: <EmailLink>bsl@lincolnsu.com</EmailLink></p>
                    <h4>Individual contact details</h4>
                    <p>Should you need to get into contact with the society's committee directly, please contact one of the emails below:</p>
                    <p className="alert alert-warning" role="alert">Please only use these emails if you have a specific concern that must remain confidential or a query that is only relevant for that person.</p>
                    <CommitteeCard>
                        William Oldham &middot; President<br/>
                        <EmailLink>19693813@students.lincoln.ac.uk</EmailLink>
                    </CommitteeCard>
                    <CommitteeCard>
                        Charlotte Eeckelers &middot; Vice President<br/>
                        <EmailLink>mzyce5@nottingham.ac.uk</EmailLink>
                    </CommitteeCard>
                    <CommitteeCard>
                        Lewis Duke &middot; Instructor and Interim Welfare<br/>
                        <EmailLink>16647829@students.lincoln.ac.uk</EmailLink>
                    </CommitteeCard>
                </Col>
                <Col md={4} className="mt-md-0 mt-4 d-flex flex-column justify-content-center">
                    <h4 className="d-block d-md-none">Contact form</h4>
                    <ContactForm />
                </Col>
            </Row>
        </Layout>
    </>
)

export default ContactPage