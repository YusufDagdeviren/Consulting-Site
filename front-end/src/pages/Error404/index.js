import React from 'react'
import { Alert, AlertTitle } from '@mui/material'
function Error404() {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This page is not found — <strong>check it pagelink!</strong>
        </Alert>
        )
}

export default Error404