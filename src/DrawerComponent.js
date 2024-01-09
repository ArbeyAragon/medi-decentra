import React from 'react';
import { Drawer, IconButton, List, ListItem, Divider, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function DrawerComponent({ userDid, menuList  }) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(userDid);
    };

    return (
        <>
            <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <div style={{ padding: "16px" }}>
                    <Typography variant="h6">{userDid}</Typography>
                    <Button onClick={copyToClipboard}>
                        <ContentCopyIcon />
                    </Button>
                </div>
                <Divider />
                {menuList}
            </Drawer>
        </>
    );
}

export default DrawerComponent;
