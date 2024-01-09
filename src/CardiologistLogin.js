import React, { useState, useRef, useEffect } from "react";
import {
  List,
  ListItem,
  Typography,
  Card,
  CardContent,
  Button
} from "@mui/material";
//import { Web5 } from "@web5/api";
import DrawerComponent from "./DrawerComponent";
import NoteDialog from "./NoteDialog";
import NotesDisplay from "./NotesDisplay";
import './CardiologistLogin.css';

function CardiologistLogin() {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [notas, setNotas] = useState([
    {
      texto: "Texto largo de la nota...",
      fecha: "2024-01-01",
      motivoIngreso: "Motivo del ingreso",
      imagenes: [],
    },
    {
      texto: "Texto largo de la nota...",
      fecha: "2024-01-01",
      motivoIngreso: "Motivo del ingreso",
      imagenes: ["img1.jpg", "img2.jpg", "img3.jpg"],
    },
    {
      texto: "Texto largo de la nota...",
      fecha: "2024-01-01",
      motivoIngreso: "Motivo del ingreso",
      imagenes: ["img1.jpg", "img2.jpg", "img3.jpg"],
    },
    // ... más notas
  ]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const pacientes = [
    { id: 1, name: "Paciente 1" },
    { id: 2, name: "Paciente 2" },
    { id: 3, name: "Paciente 3" },
    // ... more patients
  ];

  const handlePatientClick = (id) => {
    setSelectedPatientId(id);
  };

  const handleBackToPatientList = () => {
    setSelectedPatientId(null);
  };


  useEffect(() => {
    /*const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setMyDid(did);

      if (web5 && did) {
        await configureProtocol(web5, did);
        //await fetchDings(web5, did);
      }
    };
    initWeb5();*/
  }, []);

  const createProtocolDefinition = () => {
    const dingerProtocolDefinition = {
      protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
      published: true,
      types: {
        ding: {
          schema: "https://blackgirlbytes.dev/ding",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        ding: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "author", of: "ding", can: "read" },
            { who: "recipient", of: "ding", can: "read" },
          ],
        },
      },
    };
    return dingerProtocolDefinition;
  };

  const configureProtocol = async (web5, did) => {
    const protocolDefinition = await createProtocolDefinition();

    const { protocols: localProtocol, status: localProtocolStatus } =
      await queryForProtocol(web5);
    console.log({ localProtocol, localProtocolStatus });
    if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {
      const { protocol, status } = await installProtocolLocally(
        web5,
        protocolDefinition
      );
      console.log("Protocol installed locally", protocol, status);

      const { status: configureRemoteStatus } = await protocol.send(did);
      console.log(
        "Did the protocol install on the remote DWN?",
        configureRemoteStatus
      );
    } else {
      console.log("Protocol already installed");
    }
  };

  const queryForProtocol = async (web5) => {
    return await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
        },
      },
    });
  };

  const installProtocolLocally = async (web5, protocolDefinition) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };


  const handleSave = (newNota, newImagenes) => {
    // Create a new note object
    const nuevaNota = {
      texto: newNota,
      fecha: new Date().toISOString().split("T")[0],
      imagenes: newImagenes,
    };

    // Add the new note to the list of notes
    setNotas([...notas, nuevaNota]);
  };


  const doctorName = "Dr. Juan Pérez";


  const patientList = (
    <List className="patientList">
      {pacientes.map((paciente) => (
        <ListItem button key={paciente.id} onClick={() => handlePatientClick(paciente.id)}>
          <Card>
            <CardContent>
              <Typography variant="h6">{paciente.name}</Typography>
              <Typography variant="body2">ID: {paciente.id}</Typography>
              <Button onClick={() => handlePatientClick(paciente.id)}>
                View Details
              </Button>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );

  const menuList = (
    <List>
      <ListItem button onClick={() => setSelectedPatientId(null)}>
        My Patients
      </ListItem>
      {/* Add other menu items here if necessary */}
    </List>
  );

  return (
    <div>
      <DrawerComponent userDid={doctorName} menuList={menuList} />
      {!selectedPatientId ? (
        patientList
      ) : (
        <div>
          <Button variant="contained" onClick={handleBackToPatientList}>
            Back to Patient List
          </Button>
          <NoteDialog handleSave={handleSave} />
          <NotesDisplay notas={notas} />
        </div>
      )}
    </div>
  );
}

export default CardiologistLogin;
