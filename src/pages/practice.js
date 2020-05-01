import React, { useMemo, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { Row, Col, Card, Button, Collapse, OverlayTrigger, Popover, Nav } from "react-bootstrap"
import { Empty, Result } from "antd"
import "antd/es/empty/style/index.css"
import "antd/es/result/style/index.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { displayFormat } from "../utils/title-case"

function useQuerySigns(data, location) {
    let params = new URLSearchParams(location.search.slice(1));
    return useMemo(() => {
        for (let grouping of data.allGrouping.nodes) {
            if (params.has(grouping.name) && params.get(grouping.name)) {
                const groupings = params.get(grouping.name).split(",")
                return grouping.data
                    .filter(grouping => groupings.includes(grouping.name))
                    .flatMap(category => category.signs)
            }
        }
        return data.allGrouping.nodes.flatMap(category => category.data.flatMap(data => data.signs))
    }, [params, data])
}

function getWeeksOrCategories( data, location ) {
    let params = new URLSearchParams(location.search.slice(1));

    if (params.has("category") && params.get("category")) {
        const categories = params.get("category").split(",")
        return {
            categories: data.allCategory.nodes
                            .filter(category => categories.includes(category.name))
                            .map(category => category.name)
        }
    }
    if (params.has("week") && params.get("week")) {
        const weeks = params.get("week").split(",")
        return {
            weeks: data.allWeek.nodes
                            .filter(week => weeks.includes(week.name))
                            .map(week => week.name)
        }
    }
    return {}
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

const SignContent = ({ data, sign, videoOpen, setVideoOpen }) => {
    if (sign) {
        return (
            <>
                {/* <p>{data.allGrouping.nodes[0].data.filter(data => data.signs.includes(sign.sign)).map(data => data.name).join(", ")}</p> */}
                <div className="h4 class-title">{sign.display_name} <HintOverlay hint={sign.hint} /></div>
                <p className="text-muted">{sign.notes}</p>
                <VideoCollapse videoOpen={videoOpen} setVideoOpen={setVideoOpen} video_url={sign.video_url} />
            </>
        )
    } else {
        return <Empty description="No sign is available! This is most likely an error 😥"/>
    }
}

const PracticePage = ({ data, location }) => {

    const signs = useQuerySigns(data, location).map(signName => data.allSign.nodes.find(sign => sign.sign === signName))

    let grouping = getWeeksOrCategories(data, location)
    let groupText = <strong>all of the signs</strong>

    if (grouping) {
        const { categories, weeks } = grouping

        if (categories) {
            if (categories.length > 1) {
                groupText = (
                    <>
                        the categories <strong>{categories.map(displayFormat).join(", ")}</strong>
                    </>
                )
            } else {
                // Since an empty array is falsy, it would be caught by the "if (categories)"
                // therefore this can only ever be 1 in length
                groupText = (
                    <>
                        the category <strong>{displayFormat(categories[0])}</strong>
                    </>
                )
            }
        } else if (weeks) {
            if (weeks.length > 1) {
                groupText = (
                    <>
                        the weeks <strong>{weeks.map(displayFormat).join(", ")}</strong>
                    </>
                )
            } else {
                // Since an empty array is falsy, it would be caught by the "if (weeks)"
                // therefore this can only ever be 1 in length
                groupText = (
                    <>
                        the week <strong>{displayFormat(weeks[0])}</strong>
                    </>
                )
            }
        }

    }


    const [sign, setSign] = useState(signs[0])
    const randomSign = () => {
        const filteredSigns = signs.filter(s => signs.length === 1 || s.id !== sign?.id);
        return filteredSigns[Math.floor(Math.random() * filteredSigns.length)]
    }
    const [videoOpen, setVideoOpen] = useState(false)

    if (signs.length === 0) {
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
            <SEO title="Practice"/>
            <Layout className="pt-3">
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <Card className="text-center" border={sign ? "" : "danger"}>
                            <Card.Header>
                                <Nav className="flex-column flex-sm-row px-2">
                                    <Nav.Item className="mr-auto align-self-center w-75 text-left">
                                        <h6 className="my-2">Practice</h6>
                                        <p className="text-muted">You have selected {groupText} to practice. Click the <strong>New sign <FontAwesomeIcon icon={faSync} /></strong> button to get a random new sign from your chosen selection.</p>
                                    </Nav.Item>
                                    <Nav.Item className="text-right align-self-center">
                                        <Button onClick={() => {
                                            setVideoOpen(false)
                                            setSign(randomSign())
                                        }}>New sign <FontAwesomeIcon icon={faSync} /></Button>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body aria-live="assertive">
                                <SignContent data={data} sign={sign} videoOpen={videoOpen} setVideoOpen={setVideoOpen}/>
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
                signs
              }
              name
            }
        } 
    }
  
`

export default PracticePage