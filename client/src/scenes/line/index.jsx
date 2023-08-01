import { Box } from "@mui/material"
import AdminHeader from "../../components/dashComponents/AdminHeader"
import LineChart from "../../components/dashComponents/LineChart"

function Line() {
  return (
    <Box m="20px">
      <AdminHeader title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  )
}

export default Line
