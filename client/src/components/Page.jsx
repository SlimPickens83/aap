import React, { useEffect } from "react"
import ContainerCustom from "./ContainerCustom"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | AccountAbility Pittsburgh`
    window.scrollTo(0, 0)
  }, [props.title])

  return <ContainerCustom>{props.children}</ContainerCustom>
}

export default Page
