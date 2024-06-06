import Navbar from "../../components/Navbar/Navbar";
import { useValidateUserToken } from "../../helpers/validation";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "carbon-react/lib/components/box/box.component";
import {
    FlatTable,
    FlatTableHead,
    FlatTableBody,
    FlatTableRow,
    FlatTableHeader,
    FlatTableCell,
  } from "carbon-react/lib/components/flat-table";
  import Typography from "carbon-react/lib/components/typography/typography.component";


const Satellite = () => {

    useValidateUserToken();

    useEffect(async () => {
        try {
            if (satObject.id === ''){
                const response = await axios.get('http://localhost:3001/satellites')
                setSatObject({
                    name: response.data[0].name_sat,
                    id: response.data[0].id_sat,
                    status: 'Active'
                })
            }
        }
        catch (error) {
            console.log(error.response)
        }   
    });

    const [satObject, setSatObject] = useState({
        name : '',
        id : '',
        status: 'Inactive'
    });

    const goPositions = (isActive) => {
        if (isActive) {
            console.log("access to positions!")
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Box display="flex" flexDirection="column" width="600px">
                    <Typography variant="h1-large" my={4}>
                        Satellites
                    </Typography>
                    <FlatTable >
                        <FlatTableHead>
                            <FlatTableRow>
                                <FlatTableHeader>Name</FlatTableHeader>
                                <FlatTableHeader>Satellite Number</FlatTableHeader>
                                <FlatTableHeader>Status</FlatTableHeader>
                            </FlatTableRow>
                        </FlatTableHead>
                        <FlatTableBody>
                            <FlatTableRow
                                onClick={() => goPositions(true)}
                            >
                                <FlatTableCell>{satObject.name}</FlatTableCell>
                                <FlatTableCell>{satObject.id}</FlatTableCell>
                                <FlatTableCell>{satObject.status}</FlatTableCell>
                            </FlatTableRow>
                            <FlatTableRow
                                selected={false}
                                onClick={() => goPositions(false)}
                            >
                                <FlatTableCell>Starlink</FlatTableCell>
                                <FlatTableCell>1999</FlatTableCell>
                                <FlatTableCell >Inactive</FlatTableCell>
                            </FlatTableRow>
                        </FlatTableBody>
                    </FlatTable>
                </Box>
            </Box>
            
        </div>
    );

}

export default Satellite;