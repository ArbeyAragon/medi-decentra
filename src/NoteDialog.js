import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  DialogActions,
  Button,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Carousel from "react-material-ui-carousel";

function NoteDialog({ handleSave }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nota, setNota] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const fileInputRef = useRef();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenes([...imagenes, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSave = () => {
    handleSave(nota, imagenes);
    setNota('');
    setImagenes([]);
    setDialogOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpenDialog}>Agregar Nota</Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Agregar Nueva Nota</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nota"
            fullWidth
            variant="outlined"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
          <Carousel>
            {imagenes.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Imagen ${index}`}
                style={{
                  width: "500px",
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            ))}
          </Carousel>
          <IconButton onClick={() => fileInputRef.current.click()}>
            <AddAPhotoIcon />
          </IconButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={onSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NoteDialog;
