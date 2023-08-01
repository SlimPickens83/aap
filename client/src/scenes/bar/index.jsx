import { Box } from "@mui/material"
import AdminHeader from "../../components/dashComponents/AdminHeader"
import BarChart from "../../components/dashComponents/BarChart"

function Bar() {
  return (
    <Box m="20px">
      <AdminHeader title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  )
}

export default Bar
