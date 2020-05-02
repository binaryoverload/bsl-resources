import React, { useMemo, useState } from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Row, Col, Card, Button, Collapse, OverlayTrigger, Popover, Nav, Badge } from "react-bootstrap"
import { Empty, Result } from "antd"
import "antd/es/empty/style/index.css"
import "antd/es/result/style/index.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

function useQuerySigns(data, location) {
    let params = new URLSearchParams(location.search.slice(1));
    return useMemo(() => {
        for (let grouping of data.allGrouping.nodes) {
            if (params.has(grouping.name) && params.get(grouping.name)) {
                const groupings = params.get(grouping.name).split(",")
                const matchingGroupings = grouping.data.filter(grouping => groupings.includes(grouping.name))

                return {
                    grouping_name: grouping.name,
                    groupings: matchingGroupings.map(category => { return { name: category.name, display_name: category.display_name } }),
                    signs: matchingGroupings.flatMap(category => category.signs)
                                            .map(signName => data.allSign.nodes.find(sign => sign.sign === signName) || signName)
                }
            }
        }
        return {
            grouping_name: "all_signs",
            signs: data.allGrouping.nodes
                .flatMap(category => category.data.flatMap(data => data.signs))
                .map(signName => data.allSign.nodes.find(sign => sign.sign === signName) || signName)
        }
    }, [params, data])
}

const Video = ({ video }) => {
    if (video) {
        return <video src={video} autoPlay loop className="w-100"></video>
    }
    return null
}

const HintOverlay = ({ hint }) => {
    if (hint) {
        return (
            <OverlayTrigger
                trigger={["hover", "click"]}
                placement="right"
                overlay={
                    <Popover>
                        <Popover.Content>
                            {hint}
                        </Popover.Content>
                    </Popover>
                }>
                <FontAwesomeIcon className="text-muted" icon={faQuestionCircle} />
            </OverlayTrigger>
        )
    } else {
        return null
    }
}

const VideoCollapse = ({ video_url, videoOpen, setVideoOpen }) => {
    if (video_url) {
        return (
            <>
                <Button
                    onClick={() => setVideoOpen(!videoOpen)}
                    size="sm"
                    variant={videoOpen ? "danger" : "success"}
                    aria-controls="video-collapse"
                    aria-expanded={videoOpen}>
                    {(videoOpen ? "Close" : "Show") + " Video"}
                </Button>
                <Collapse in={videoOpen} className="m-3">
                    <div id="video-collapse">
                        <Video video={video_url} />
                    </div>
                </Collapse>
            </>
        )
    } else {
        return (
            <Button size="sm" variant="secondary" disabled={true}>No video available</Button>
        )
    }
}

const SignNotes = ({ sign }) => {
    if (sign.notes) {
        return (<p className="text-muted">{sign.notes}</p>)
    } else {
        return null
    }
}

const SignContent = ({ data, sign, videoOpen, setVideoOpen }) => {
    if (sign) {
        return (
            <>
                <div className="h4 class-title">{sign.display_name} <HintOverlay hint={sign.hint} /></div>
                <SignNotes sign={sign} />
                <VideoCollapse videoOpen={videoOpen} setVideoOpen={setVideoOpen} video_url={sign.video_url} />
            </>
        )
    } else {
        return <Empty description="No sign is available! This is most likely an error 😥" />
    }
}

const SignGroupings = ({ groupingData }) => {
    if (groupingData.grouping_name !== "all_signs") {
        return (
            <>
                {
                    groupingData.groupings.map(grouping => (
                        <>
                            <Badge variant="light"><a title={`Practice ${grouping.display_name.trim()}`} target="_blank" rel="noopener" href={`/practice?${groupingData.grouping_name}=${grouping.name}`}>{grouping.display_name}</a></Badge>{' '}
                        </>
                    ))
                }
            </>
        )
    } else {
        return <Badge variant="light">All Signs</Badge>
    }
}

const PracticePage = ({ data, location }) => {

    const groupingData = useQuerySigns(data, location)

    const [sign, setSign] = useState(groupingData.signs[0])
    const randomSign = () => {
        const filteredSigns = groupingData.signs.filter(s => groupingData.signs.length === 1 || s.id !== sign?.id);
        return filteredSigns[Math.floor(Math.random() * filteredSigns.length)]
    }
    const [videoOpen, setVideoOpen] = useState(false)

    if (groupingData.signs.length === 0) {
        return (
            <>
                <Layout>
                    <Result status="404" title="Could not find any signs..." />
                </Layout>
            </>
        )
    }

    return (
        <>
            <SEO title="Practice" />
            <Layout className="pt-3">
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <Card className="text-center" border={sign ? "" : "danger"}>
                            <Card.Header>
                                <Nav className="flex-column flex-sm-row px-2 flex-nowrap">
                                    <Nav.Item className="mr-auto align-self-center text-left">
                                        <h6 className="my-2">Practice</h6>
                                        <p className="text-muted">Click the <strong>New sign <FontAwesomeIcon icon={faSync} /></strong> button to get a random new sign from: <SignGroupings groupingData={groupingData}/></p>
                                    </Nav.Item>
                                    <Nav.Item className="text-right align-self-center flex-shrink-0">
                                        <Button onClick={() => {
                                            setVideoOpen(false)
                                            setSign(randomSign())
                                        }}>New sign <FontAwesomeIcon icon={faSync} /></Button>
                                    </Nav.Item>
                                </Nav>
                                
                            </Card.Header>
                            <Card.Body aria-live="assertive">
                                <SignContent data={data} sign={sign} videoOpen={videoOpen} setVideoOpen={setVideoOpen} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Layout>
        </>
    )

}

export const query = graphql`
    query Signs {
        allSign {
            nodes {
              id
              sign
              notes
              hint
              display_name
            }
        }
        allGrouping {
            nodes {
              data {
                name
                display_name
                signs
              }
              name
              display_name
            }
        } 
    }
  
`

export default PracticePage