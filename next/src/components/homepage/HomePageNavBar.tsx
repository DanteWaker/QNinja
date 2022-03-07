import React, { useState } from "react";

//Material UI imports
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { AppBar } from "@material-ui/core";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { LogoContainer } from "../../styles/pages/HomePage";
import LogoComponent from "../../../public/logo";
import { Box, Typography } from "@mui/material";
import { theme } from "../../styles/global";
import Link from "next/link";

const pages = [
  { title: "Início", url: "#home" },
  { title: "Planos", url: "#prices" },
  { title: "Relatos", url: "#results" },
  { title: "Sobre nós", url: "#about" },
  { title: "Ajuda", url: "#help" },
];

export function HomePageNavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoContainer>
            <LogoComponent width="auto" height="100%" />
          </LogoContainer>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <LogoComponent />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: theme.palette.text.primary,
                  display: "block",
                  margin: "0 1.4rem",
                }}
                href={page.url}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link href="/login" passHref>
              <Button
                color="inherit"
                sx={{ my: 2, color: theme.palette.text.primary }}
              >
                Login
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button
                color="inherit"
                sx={{
                  my: 2,
                  color: theme.palette.text.primary,
                  background: theme.palette.secondary.main,
                  padding: ".3rem 1rem",
                  borderRadius: "1rem",
                }}
              >
                Cadastrar-se
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
