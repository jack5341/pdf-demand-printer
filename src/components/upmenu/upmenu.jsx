import {useState} from 'react'
import axios from 'axios'
import { Box,Container,IconButton,SlideFade  } from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

// Containers
import Header from '../../containers/header/header'

export default function Upmenu(props){

    const [hide,setHide] = useState(true)

    function uploadFile(e){  
        var formData = new FormData()
        formData.append("document", e.target.files[0]);
        axios({
            method: "post",
            url: "http://localhost:8080/api/extension-separator",
            data: formData
        }).then((res) => {
            setHide(false)
            props.setType(res.data.type)
            props.setList(res.data.parsedArray)
        })
    }

    return (
        <Container maxW="xxl" centerContent>
            <Box padding="4" bg="gray.100" maxW="10xl">
            <SlideFade in={hide} offsetY="20px">
                <div style={{display: hide == false ? "none" : "block"}}>
                        <Header/>
                        <Box bg="#2866ca38" mt="4" boxShadow="outline">
                            <center>
                                <form>
                                    <input name="document" onChange={uploadFile} style={{padding: "2.5rem"}} accept=".xlsx, .csv" type="file" />
                                </form>
                            </center>
                        </Box>
                </div>            
            </SlideFade>
                <center>
                    <IconButton
                    mt="3"
                    style={{width: "100%"}}
                    onClick={() => setHide(!hide)}
                    icon={hide == true ? <ChevronUpIcon fontSize="6xl"/> : <ChevronDownIcon fontSize="6xl"/>}
                    />
                </center>
            </Box>
        </Container>
    )
}