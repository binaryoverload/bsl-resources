import React, { useMemo, useState } from "react"
import Layout from "../components/layout"

import { Row, Col, Card, Button, Collapse, OverlayTrigger, Popover, Nav } from "react-bootstrap"
import { Empty, Result } from "antd"
import "antd/es/empty/style/index.css"
import "antd/es/result/style/index.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { titleCase } from "../utils/title-case"

function useQuerySigns(data, location) {
    let params = new URLSearchParams(location.search.slice(1));
    return useMemo(() => {
        if (params.has("category") && params.get("category")) {
            const categories = params.get("category").split(",")
            return data.allCategory.nodes
                .filter(category => categories.includes(category.name))
                .flatMap(category => category.signs)
        }
        if (params.has("week") && params.get("week")) {
            const weeks = params.get("week").split(",")
            return data.allWeek.nodes
                .filter(week => weeks.includes(week.name))
                .flatMap(week => week.signs)
        }
        return data.allCategory.nodes.flatMap(category => category.signs)
    }, [params, data])
}

const Video = ({ video }) => {
    if (video) {
        return <video src={video} autoPlay loop className="w-100"></video>
    } else {
        return <Empty
            description={<span className="text-body">No video is available for this sign yet!</span>}
            image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
}

const HintOverlay = ({ hint }) => {
    if (hint) {
        return (
            <OverlayTrigger
                trigger={["hover", "click"]}
                placement="top"
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

const VideoCollapse = ({ video_url, videoOpen, setVideoOpen }) => (
    <>
        <Button
            onClick={() => setVideoOpen(!videoOpen)}
            size="sm"
            disabled={video_url ? false : true}
            variant={video_url ? (videoOpen ? "danger" : "success") : "secondary"}
            aria-controls="video-collapse"
            aria-expanded={videoOpen}>
            {video_url ? ((videoOpen ? "Close" : "Show") + " Video") : "No video available"}
        </Button>
        <Collapse in={videoOpen} className="m-3">
            <div id="video-collapse">
                <Video video={video_url} />
            </div>
        </Collapse>
    </>
)

const SignContent = ({ sign, videoOpen, setVideoOpen }) => {
    if (sign) {
        return (
            <>
                <div className="h4 class-title">{titleCase(sign.sign)} <HintOverlay hint={sign.hint} /></div>
                <VideoCollapse videoOpen={videoOpen} setVideoOpen={setVideoOpen} video_url={sign.video_url} />
            </>
        )
    } else {
        return <Empty description="No sign is available! This is most likely an error 😥"/>
    }
}

const PracticePage = ({ data, location }) => {

    let signs = useQuerySigns(data, location)

    const [sign, setSign] = useState(signs[0])
    const randomSign = () => {
        const filteredSigns = signs.filter(s => signs.length == 1 || s.id !== sign?.id);
        return filteredSigns[Math.floor(Math.random() * filteredSigns.length)]
    }
    const [videoOpen, setVideoOpen] = useState(false)

    if (signs.length == 0) {
        return (
            <>
                <Layout>
                    <Result status="404" title="Could not find any signs..."/>
                </Layout>
            </>
        )
    }

    return (
        <>
            <Layout>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <Card className="text-center" border={sign ? "" : "danger"}>
                            <Card.Header>
                                <Nav className="flex-column flex-sm-row px-2">
                                    <Nav.Item className="mr-auto align-self-center w-75 text-left">
                                        <h6 className="my-2">Practice</h6>
                                        <p className="text-muted"></p>
                                    </Nav.Item>
                                    <Nav.Item className="text-right align-self-center">
                                        <Button onClick={() => {
                                            setSign(randomSign())
                                            setVideoOpen(false)
                                        }}>New sign <FontAwesomeIcon icon={faSync} /></Button>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                <SignContent sign={sign} videoOpen={videoOpen} setVideoOpen={setVideoOpen}/>
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
        allWeek {
            nodes {
                name
                signs {
                    id
                    hint
                    sign
                    video_url
                }
            }
        }
        allCategory {
            nodes {
                name
                signs {
                    id
                    hint
                    sign
                    video_url
                }
            }
        }
    }
  
`

export default PracticePage