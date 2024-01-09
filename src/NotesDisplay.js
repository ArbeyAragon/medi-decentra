import React, { useState } from 'react';
import { Card, CardContent, Typography, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Carousel from "react-material-ui-carousel";

function NotesDisplay({ notas }) {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleOpen = (img) => {
    setSelectedImg(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {notas.map((nota, index) => (
        <Card key={index} className="noteCard">
          <CardContent>
            <Typography variant="h5">Fecha: {nota.fecha}</Typography>
            <Typography variant="body1">{nota.texto}</Typography>
            <Typography variant="body2">
              Motivo de ingreso: {nota.motivoIngreso}
            </Typography>
            <Carousel>
              {nota.imagenes.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Imagen ${idx}`}
                  onClick={() => handleOpen(img)}
                  style={{ maxWidth: '500px', maxHeight: '300px', width: 'auto', height: 'auto', objectFit: 'contain', cursor: 'pointer' }}
                />
              ))}
            </Carousel>
          </CardContent>
        </Card>
      ))}

      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle>
          <IconButton onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={selectedImg}
            alt="Enlarged"
            style={{ width: '90%', height: '90%', objectFit: 'contain' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NotesDisplay;
