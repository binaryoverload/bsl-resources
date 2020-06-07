import React, { useMemo, useState } from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Row, Col, Card, Button, Collapse, OverlayTrigger, Popover, Nav, Badge } from "react-bootstrap"
import { Empty, Result } from "antd"
import "antd/es/empty/style/index.css"
import "antd/es/result/style/index.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faQuestionCircle,  faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import PageSelect from "../components/pageselect"

import "./practice.css"

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

const VideoSelect = ({ videos, video_titles, selectedVideoState}) => {
    let [selectedVideo, setSelectedVideo] = selectedVideoState

    let leftVisibility = selectedVideo == 0 ? "hidden" : "visible"
    let rightVisibility = selectedVideo == videos.length - 1 ? "hidden" : "visible"

    const elements = []

    elements.push(
        <div onClick={() => setSelectedVideo(selectedVideo - 1)} style={{visibility: leftVisibility}}><FontAwesomeIcon className="left-arrow" icon={faChevronLeft}/></div>
    )

    for (let i = 0; i < videos.length; i++) {
        let subtitle = ""
        if (video_titles && video_titles[i]) {
            subtitle = <span className="video-subtitle">{video_titles[i]}</span>
        }
        elements.push(<div className="sign-video" style={{display: (selectedVideo === i ? "flex" : "none")}}><Video video={videos[i]}/>{subtitle}
        </div>)
    }

    elements.push(
        <div onClick={() => setSelectedVideo(selectedVideo + 1)} style={{visibility: rightVisibility}}><FontAwesomeIcon className="right-arrow" icon={faChevronRight}/></div>
    ) 

    return (
    <>
        <div className="video-select">
            {elements}
        </div>
        <PageSelect current={selectedVideo} size={videos.length} callback={setSelectedVideo} />
    </>
    )
}

const Video = ({ video, style }) => {
    if (video) {
        return <video src={video} style={style} autoPlay loop></video>
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

const VideoCollapse = ({ videos, video_titles, videoState, selectedVideoState }) => {
    let [videoOpen, setVideoOpen] = videoState
    if (videos.length > 0) {
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
                        <VideoSelect videos={videos} video_titles={video_titles} selectedVideoState={selectedVideoState}/>
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

const SignContent = ({ data, sign, videoState, selectedVideoState }) => {
    if (sign) {
        return (
            <>
                <div className="h4 class-title">{sign.display_name} <HintOverlay hint={sign.hint} /></div>
                <SignNotes sign={sign} />
                <VideoCollapse videoState={videoState} selectedVideoState={selectedVideoState} videos={sign.videos} video_titles={sign.video_titles} />
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
    const videoState = useState(false)
    const [videoOpen, setVideoOpen] = videoState

    const selectedVideoState = useState(0)
    const [selectedVideo, setSelectedVideo] = selectedVideoState

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
                                        <p className="text-muted">Click the <span className="text-primary">New sign <FontAwesomeIcon icon={faSync} /></span> button to get a random new sign from: <SignGroupings groupingData={groupingData}/></p>
                                    </Nav.Item>
                                    <Nav.Item className="text-right align-self-center flex-shrink-0">
                                        <Button onClick={() => {
                                            setVideoOpen(false)
                                            setSelectedVideo(0)
                                            setSign(randomSign())
                                        }}>New sign <FontAwesomeIcon icon={faSync} /></Button>
                                    </Nav.Item>
                                </Nav>
                                
                            </Card.Header>
                            <Card.Body aria-live="assertive">
                                <SignContent data={data} sign={sign} videoState={videoState} selectedVideoState={selectedVideoState} />
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
              videos
              video_titles
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