/* eslint-disable @next/next/link-passhref */
import { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ArticleIcon from "@mui/icons-material/Article";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoComponent from "../../../public/logo";
import { SideBarProps } from "../../interfaces/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import { Avatar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const drawerWidth = 240;

interface ThemeInterface {
  spacing: any;
  transitions: {
    create: (duration: any, easing: any) => any;
    easing: {
      sharp: any;
      easeOut: any;
    };
    duration: {
      leavingScreen: any;
      enteringScreen: any;
    };
  };
}

interface StyledProps {
  theme?: ThemeInterface;
  open?: boolean;
  children?: JSX.Element;
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: StyledProps) => ({
    flexGrow: 1,
    padding: theme?.spacing(3),
    transition: theme?.transitions.create("margin", {
      easing: theme?.transitions.easing.sharp,
      duration: theme?.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme?.transitions.create("margin", {
        easing: theme?.transitions.easing.easeOut,
        duration: theme?.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== "open",
})(({ theme, open }: StyledProps) => ({
  transition: theme?.transitions.create(["margin", "width"], {
    easing: theme?.transitions.easing.sharp,
    duration: theme?.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme?.transitions.create(["margin", "width"], {
      easing: theme?.transitions.easing.easeOut,
      duration: theme?.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBar(props: SideBarProps) {
  const { name, children } = props;
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { user, handleLogout } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function renderProfileIcon() {
    if (user?.photo) {
      return (
        <>
          {user?.photo && (
            <Avatar
              alt="Remy Sharp"
              src={user?.photo}
              sx={{ mr: 2, height: "3rem", width: "3rem" }}
            />
          )}
        </>
      );
    }
  }

  const adminStatus = user?.groups.includes("Administrators");
  const studentStatus = user?.groups.includes("Students") || adminStatus;
  const correctorStatus = user?.groups.includes("Correctors") || adminStatus;

  function renderNavBarItems() {
    return (
      <>
        {studentStatus && (
          <>
            <Link href="/temas" passHref>
              <ListItem button>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText>Temas de redação</ListItemText>
              </ListItem>
            </Link>

            <Link href="/redacoes" passHref>
              <ListItem button>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText>Redações</ListItemText>
              </ListItem>
            </Link>
          </>
        )}
        {correctorStatus && (
          <>
            <Link href="/redacoes/corrigir" passHref>
              <ListItem button>
                <ListItemIcon>
                  <HistoryEduIcon />
                </ListItemIcon>
                <ListItemText>Corrigir redações</ListItemText>
              </ListItem>
            </Link>
            <Link href="/redacoes/corrigir/history" passHref>
              <ListItem button>
                <ListItemIcon>
                  <HistoryEduIcon />
                </ListItemIcon>
                <ListItemText>Histórico de correções</ListItemText>
              </ListItem>
            </Link>
          </>
        )}
      </>
    );
  }

  const handleBackPage = () => history.back();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: theme.palette.primary.main,
          height: "4rem",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: "#fff", mr: 2, ...(!open && { display: "none" }) }}
          >
            {theme.direction === "ltr" ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <LogoComponent width="8rem" height="auto" />
          <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
            {router.route !== "/temas" && router.route !== "/redacoes" && (
              <Button onClick={handleBackPage} sx={{ color: "#fff" }}>
                <KeyboardBackspaceIcon />
              </Button>
            )}

            {name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "space-between",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box>
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              height: "64px",
            }}
          >
            {renderProfileIcon()}

            <Typography
              variant="h6"
              sx={{
                mr: 2,
                fontSize: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>{renderNavBarItems()}</List>
        </Box>

        <List>
          <Divider />

          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Sair</ListItemText>
          </ListItem>
        </List>
      </Drawer>

      <Main open={open}>{children}</Main>
    </Box>
  );
}
