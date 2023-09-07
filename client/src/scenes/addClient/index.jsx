import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, TextField } from "@mui/material"
import Axios from "axios"
import DispatchContext from "../../DispatchContext"
import { Formik } from "formik"
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery"
import Tooltip from "@mui/material/Tooltip"
import AdminHeader from "../../components/dashComponents/AdminHeader"

const initialValues = {
  clientName: "",
  owner: "",
  accountKey: "",
  clientKey: "",
  email: "",
  contact: "",
  address1: "",
  address2: ""
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

const clientSchema = yup.object().shape({
  clientName: yup.string().required("required"),
  owner: yup.string().required("required"),
  accountKey: yup.string().required("required"),
  clientKey: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  contact: yup.string().matches(phoneRegExp, "Invalid phone number").required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required")
})

function AddClient() {
  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  // const redirect = () => navigate("/")
  const [errors, setErrors] = useState()

  const registerFormik = async function (values) {
    try {
      const response = await Axios.post("/clientRegister", {
        clientName: values.clientName,
        owner: values.owner,
        accountKey: values.accountKey,
        clientKey: values.clientKey,
        email: values.email,
        contact: values.contact,
        address1: values.address1,
        address2: values.address2
      })
      appDispatch({ type: "register", data: response.data.user.data })
    } catch {
      setErrors("There was a problem or the request was canceled.")
    }
  }

  const handleFormSubmit = values => {
    registerFormik(values)
    console.log(values)
    navigate("/Dashboard")
  }

  return (
    <Box m="20px">
      <AdminHeader title="CREATE CLIENT" subtitle="Create a New Client Profile" />

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={clientSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ "& div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
              <TextField fullWidth variant="filled" type="text" label="Client Name" onBlur={handleBlur} onChange={handleChange} value={values.clientName} name="clientName" error={!!touched.clientName && !!errors.clientName} helperText={touched.clientName && errors.clientName} sx={{ gridColumn: "span 4" }} />
              <TextField fullWidth variant="filled" type="text" label="Owner" onBlur={handleBlur} onChange={handleChange} value={values.owner} name="owner" error={!!touched.owner && !!errors.owner} helperText={touched.owner && errors.owner} sx={{ gridColumn: "span 4" }} />
              <Tooltip title="A unique identifier enabling clients to securely register and create their credentials." placemnt="top" arrow>
                <TextField fullWidth variant="filled" type="text" label="Account Key" onBlur={handleBlur} onChange={handleChange} value={values.accountKey} name="accountKey" error={!!touched.accountKey && !!errors.accountKey} helperText={touched.accountKey && errors.accountKey} sx={{ gridColumn: "span 4" }} />
              </Tooltip>
              <Tooltip title="A unique client identifier enabling employees to securely register and create credentials." placemnt="top" arrow>
                <TextField fullWidth variant="filled" type="text" label="Client Key" onBlur={handleBlur} onChange={handleChange} value={values.clientKey} name="clientKey" error={!!touched.clientKey && !!errors.clientKey} helperText={touched.clientKey && errors.clientKey} sx={{ gridColumn: "span 4" }} />
              </Tooltip>
              <TextField fullWidth variant="filled" type="text" label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" type="text" label="Contact Number" onBlur={handleBlur} onChange={handleChange} value={values.contact} name="contact" error={!!touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" type="text" label="Address 1" onBlur={handleBlur} onChange={handleChange} value={values.address1} name="address1" error={!!touched.address1 && !!errors.address1} helperText={touched.address1 && errors.address1} sx={{ gridColumn: "span 4" }} />
              <TextField fullWidth variant="filled" type="text" label="Address 2" onBlur={handleBlur} onChange={handleChange} value={values.address2} name="address2" error={!!touched.address2 && !!errors.address2} helperText={touched.address2 && errors.address2} sx={{ gridColumn: "span 4" }} />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {/* Button should add a new client to the database  */}
              <Button type="submit" color="secondary" variant="contained">
                Create New Client
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default AddClient
