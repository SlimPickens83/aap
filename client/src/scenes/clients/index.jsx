import { useState, useEffect } from "react"
import Axios from "axios"
import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { mockDataInvoices } from "../../data/mockData"
import AdminHeader from "../../components/dashComponents/AdminHeader"

function Clients() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [clients, setClients] = useState([])

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await Axios.get("/Dashboard/clients")
        setClients(response.data)
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    fetchClients()
  }, [])

  const columns = [
    { field: "clientName", headerName: "Client", flex: 1 },
    { field: "owner", headerName: "Owner", flex: 1, cellClassName: "name-column--cell" },
    { field: "accountKey", headerName: "Account Key", flex: 1 },
    { field: "clientKey", headerName: "Client Key", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address1", headerName: "Street Address", flex: 1 },
    { field: "address2", headerName: "City & Zip", flex: 1 }
  ]

  return (
    <Box m="20px">
      <AdminHeader title="CLIENTS" subtitle="Client Detail List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderbottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700]
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        <DataGrid checkboxSelection rows={clients} columns={columns} />
      </Box>
    </Box>
  )
}

export default Clients
