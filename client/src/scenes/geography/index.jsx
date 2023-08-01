import { Box } from "@mui/material"
import AdminHeader from "../../components/dashComponents/AdminHeader"
import GeographyChart from "../../components/dashComponents/GeographyChart"
import { tokens } from "../../theme"
import { useTheme } from "@mui/material"

function Geography() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <AdminHeader title="Geography Chart" subtitle="Simple Geography Chart" />
      <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <GeographyChart />
      </Box>
    </Box>
  )
}

export default Geography
