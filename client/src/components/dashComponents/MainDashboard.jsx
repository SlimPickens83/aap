import React, { useContext, useEffect } from "react"
import { ColorModeContext, useMode } from "../../theme"
import { CssBaseline, ThemeProvider, dividerClasses } from "@mui/material"
import StateContext from "../../StateContext"
import Topbar from "../../scenes/global/Topbar"
import Side from "../../scenes/global/Sidebar"
import { columnsStateInitializer } from "@mui/x-data-grid/internals"
import { Satellite } from "@mui/icons-material"

function MainDashboard(props) {
  const [theme, colorMode] = useMode()
  const appState = useContext(StateContext)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="mainDashboard">
          <Side />
          <main className="content">
            <Topbar />
            {props.dashComponent}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default MainDashboard
