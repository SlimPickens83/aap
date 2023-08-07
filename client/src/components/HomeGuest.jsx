import React from "react"
import Page from "./Page"
import topImage from "../assets/9176032_6573.jpeg"
import secondImage from "../assets/3992745.jpg"

function HomeGuest() {
  return (
    <Page title="Welcome">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "100%" }}>
        <h1 className="d-none" id="welcome"></h1>
        <div id="main">
          <div id="splashOne">
            <div id="topText">
              <h2 style={{ color: "text-secondary" }}>Effective business accounting serving the Pittsburgh area.</h2>
              <p>AccountAbility Pittsburgh has been serving clients in the greater Pittsburgh area going on two decades. We provide accurate, high efficiency financial accounting to save you time and money. Let us handle the numbers, so you can focus on what matters most – growing your business.</p>
            </div>
            <div id="topImage">
              <img id="topImageChild" src={topImage} alt="" />
            </div>
          </div>

          <div id="splashTwo">
            <div id="secondChild">
              <img id="secondImage" src={secondImage} alt="" />
            </div>
            <div id="secondChild">
              <h2 style={{ color: "text-secondary" }}>We make cash flow.</h2>
              <p>With years of experience serving small businesses, we've honed our expertise to deliver top-notch accounting solutions that truly make a difference. We specialize in simplifying your financial processes, ensuring compliance, and maximizing your profits. Our comprehensive suite of accounting services, including bookkeeping, tax planning, and financial consulting, is designed to meet your specific needs.</p>
            </div>
          </div>
          <div id="splashThree">
            <div className="thirdChild">
              <h3 style={{ color: "text-secondary" }}>Excellence comes standard.</h3>
              <p>At AccountAbility Pittsburgh, excellence is at the core of everything we do. As your dedicated financial advisors we take the time to understand your business goals, allowing us to tailor our services to your unique requirements.</p>
            </div>
            <div className="thirdChild">
              <h4 style={{ color: "text-secondary" }}>It's business; it's personal.</h4>
              <p>Your small business is unique, and so are your accounting needs. We take prclassNamee in delivering personalized financial solutions that cater to your specific challenges and aspirations. </p>
            </div>
            <div className="thirdChild">
              <h4 style={{ color: "text-secondary" }}>Consult with us today!</h4>
              <p>We believe AccountAbility Pittsburgh has the solutions your business needs to thrive. Visit our contact page to reach out for a consultation and one of our staff will be in touch with you promptly.</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default HomeGuest
