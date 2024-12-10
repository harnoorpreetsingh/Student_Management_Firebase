import { Button, TextField } from '@mui/material'

export const AddStudent = () => {
    const addStud=()=>{
        
    }
  return (
    <div>
        <h1 className='text-2xl font-bold' >Fill the form below to Add Student: </h1>

        <div className="flex items-center justify-center flex-col gap-12 mt-12">
        <TextField className='!border !border-black'  id="outlined-basic" label="Enter Name" variant="outlined" required/>
<TextField
          id="outlined-number"
          label=" Phone Number"
          type="number"
          
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
         <Button variant="outlined" className='hover:bg-blue-600 hover:text-white' size="large" onClick={addStud}>
          Add Student
        </Button>
        </div>

    </div>
  )
}
