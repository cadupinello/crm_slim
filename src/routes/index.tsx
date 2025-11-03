import { Button, Container } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Container sx={{mt: 4 }}>
      <p>Hello World</p>
      <Button variant="contained">Contained</Button>
    </Container>
  )
}
