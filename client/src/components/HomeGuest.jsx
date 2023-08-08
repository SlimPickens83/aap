import React from "react"
import Page from "./Page"
import topImage from "../assets/9176032_6573.jpeg"
import secondImage from "../assets/3992745.jpg"

function HomeGuest() {
  return (
    <Page title="Welcome">
      <div id="main">
        <div id="splashOne">
          <div id="topText">
            <h1 style={{ color: "text-secondary" }}>Effective business accounting serving the Pittsburgh area.</h1>
            <h5>AccountAbility Pittsburgh has been serving clients in the greater Pittsburgh area going on two decades. We provide accurate, high efficiency financial accounting to save you time and money. Let us handle the numbers, so you can focus on what matters most – growing your business.</h5>
          </div>
          <div id="topImage">
            <img id="topImageChild" src={topImage} alt="" />
          </div>
        </div>

        <div id="splashTwo">
          <div id="secondChild">
            <h1 style={{ color: "text-secondary" }}>We make cash flow.</h1>
            <h5>With years of experience serving small businesses, we've honed our expertise to deliver top-notch accounting solutions that truly make a difference. We specialize in simplifying your financial processes, ensuring compliance, and maximizing your profits. Our comprehensive suite of accounting services, including bookkeeping, tax planning, and financial consulting, is designed to meet your specific needs.</h5>
          </div>
          <div id="secondChild">
            <img id="secondImage" src={secondImage} alt="" />
          </div>
        </div>
        <div id="splashThree">
          <div className="thirdChild">
            <h2 style={{ color: "text-secondary" }}>Excellence comes standard.</h2>
            <h5>At AccountAbility Pittsburgh, excellence is at the core of everything we do. As your dedicated financial advisors we take the time to understand your business goals, allowing us to tailor our services to your unique requirements.</h5>
          </div>
          <div className="thirdChild">
            <h2 style={{ color: "text-secondary" }}>It's business; it's personal.</h2>
            <h5>Your small business is unique, and so are your accounting needs. We take prclassNamee in delivering personalized financial solutions that cater to your specific challenges and aspirations. </h5>
          </div>
          <div className="thirdChild">
            <h2 style={{ color: "text-secondary" }}>Consult with us today!</h2>
            <h5>We believe AccountAbility Pittsburgh has the solutions your business needs to thrive. Visit our contact page to reach out for a consultation and one of our staff will be in touch with you promptly.</h5>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default HomeGuest
