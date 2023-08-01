import { Box } from "@mui/material"
import AdminHeader from "../../components/dashComponents/AdminHeader"
import PieChart from "../../components/dashComponents/PieChart"

function Pie() {
  return (
    <Box m="20px">
      <AdminHeader title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  )
}

export default Pie
