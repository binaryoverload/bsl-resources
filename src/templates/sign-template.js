import React from "react"
export default ({ pageContext: { sign } }) => (
  <section>
    <video src={sign.video_url}></video>
  </section>
)