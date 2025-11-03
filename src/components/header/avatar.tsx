import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { LogOut, Plus, Settings } from "lucide-react";
import { useState } from "react";

export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>CE</Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem sx={{ gap: 1 }} onClick={handleClose}>
          <Plus width={16} />
          Add another account
        </MenuItem>
        <MenuItem sx={{ gap: 1}} onClick={handleClose}>
          <Settings width={16} />
          Settings
        </MenuItem>
        <MenuItem sx={{ gap: 1}} onClick={handleClose}>
          <LogOut width={16} stroke="#FF0000" />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
