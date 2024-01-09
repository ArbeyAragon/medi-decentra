import React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./NotesDisplay.css";

function NotesDisplay({ notas }) {
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
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                  />
                ))}
              </Carousel>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

export default NotesDisplay;