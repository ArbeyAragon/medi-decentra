import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, Divider, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Carousel from 'react-material-ui-carousel'; // Asegúrate de instalar 'react-material-ui-carousel'

function CardiologyExamsLabLogin() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Ejemplo de datos de notas
  const notas = [
    {
        texto: "Texto largo de la nota...",
        fecha: "2024-01-01",
        motivoIngreso: "Motivo del ingreso",
        imagenes: []
    },
    {
        texto: "Texto largo de la nota...",
        fecha: "2024-01-01",
        motivoIngreso: "Motivo del ingreso",
        imagenes: ["img1.jpg", "img2.jpg", "img3.jpg"]
    },
    {
        texto: "Texto largo de la nota...",
        fecha: "2024-01-01",
        motivoIngreso: "Motivo del ingreso",
        imagenes: ["img1.jpg", "img2.jpg", "img3.jpg"]
    },
    // ... más notas
  ];

  const pacientes = ['Paciente 1', 'Paciente 2', 'Paciente 3'];
  const doctorName = "Dr. Juan Pérez";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(doctorName);
  };

  return (
    <div>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div style={{ padding: '16px' }}>
          <Typography variant="h6">{doctorName}</Typography>
          <Button onClick={copyToClipboard}>
            <ContentCopyIcon />
          </Button>
        </div>
        <Divider />
        <List>
          {pacientes.map((paciente, index) => (
            <ListItem button key={index}>{paciente}</ListItem>
          ))}
        </List>
      </Drawer>
      <div>
            {notas.map((nota, index) => (
                <Card key={index} style={{ margin: '20px' }}>
                <CardContent>
                    <Typography variant="h5">Fecha: {nota.fecha}</Typography>
                    <Typography variant="body1">{nota.texto}</Typography>
                    <Typography variant="body2">Motivo de ingreso: {nota.motivoIngreso}</Typography>
                    <Carousel>
                        {nota.imagenes.map((imagen, imgIndex) => (
                            <CardMedia
                            key={imgIndex}
                            component="img"
                            image={imagen}
                            alt={`Imagen ${imgIndex + 1}`}
                            />
                        ))}
                    </Carousel>
                </CardContent>
                </Card>
            ))}
      </div>
    </div>
  );
}

export default CardiologyExamsLabLogin;
