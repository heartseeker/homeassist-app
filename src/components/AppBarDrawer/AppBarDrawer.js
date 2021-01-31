import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Badge, InputAdornment, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

import Icon from '@mdi/react';
import {
  mdiHomeSearch,
  mdiHomeEdit,
  mdiHomeAnalytics,
  mdiCalendarClock,
  mdiClipboardEdit,
  mdiFileDocumentMultiple,
  mdiPin,
  mdiAndroidMessages,
  mdiBell,
  mdiMagnify,
  mdiLogout,
} from '@mdi/js';

import { palette } from '../../styles/theme';
import Logo from '../../assets/images/logo.png';
import DummyAvatar from '../../assets/images/dummies/avatar.jpg';

const drawerWidth = 260;
const userAvatar = DummyAvatar;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${theme.spacing(9)}px)`,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      marginRight: 10,
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerOpen: {
    backgroundColor: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    color: '#fff',
  },
  drawerClose: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    color: '#fff',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 5,
  },
  topbarInnerLeft: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 'auto',
  },
  topbarInnerRight: {
    width: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    width: 100,
    marginRight: 25,
  },
  search: {
    height: 1,
  },
  listItemText: {
    color: '#fff',
  },
  avatar: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
  },
}));

const menus = [
  {
    icon: mdiHomeSearch,
    title: 'Property Search',
    size: 1,
    path: '/property-search',
  },
  {
    icon: mdiHomeEdit,
    title: 'Home Loan Qualifying',
    size: 1,
    path: '/home-loan-qualfying',
  },
  {
    icon: mdiHomeAnalytics,
    title: 'Home Loan Evaluation',
    size: 1,
    path: '#',
  },
  {
    icon: mdiCalendarClock,
    title: 'Tripping Scheduler',
    size: 1,
    path: '#',
  },
  {
    icon: mdiClipboardEdit,
    title: 'E-Forms',
    size: 1,
    path: '#',
  },
  {
    icon: mdiFileDocumentMultiple,
    title: 'Document Upload',
    size: 1,
    path: '#',
  },
  {
    icon: mdiPin,
    title: 'Document Tracker',
    size: 1,
    path: '#',
  },
];

const AppBarDrawer = () => {
  const isOpen = localStorage.getItem('isMenuExpanded') && localStorage.getItem('isMenuExpanded') === '1';
  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);
  const history = useHistory();

  const handleDrawerOpen = () => {
    localStorage.setItem('isMenuExpanded', '1');
    setOpen(true);
  };

  const handleDrawerClose = () => {
    localStorage.setItem('isMenuExpanded', '0');
    setOpen(false);
  };

  const onSignout = () => {
    history.push('/users/signin');
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.topbar}>
          <div className={classes.topbarInnerLeft}>
            <div>
              <img className={classes.logo} src={Logo} alt="Homeassist.ph" />
            </div>
            <div>
              <TextField
                size="small"
                label="Search"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon
                        path={mdiMagnify}
                        title="Search"
                        size={1}
                        color={palette.primary.main}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className={classes.topbarInnerRight}>
            <IconButton color="inherit" edge="start">
              <Badge badgeContent={2} color="secondary">
                <Icon
                  path={mdiAndroidMessages}
                  title="Messages"
                  size={1}
                  color={palette.primary.main}
                />
              </Badge>
            </IconButton>
            <IconButton color="inherit" edge="start">
              <Badge badgeContent={9} color="secondary">
                <Icon
                  path={mdiBell}
                  title="Notifications"
                  size={1}
                  color={palette.primary.main}
                />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        color="primary"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            className={clsx({ [classes.hide]: !open })}
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon style={{ color: '#fff' }} />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <Link to={menu.path} style={{ textDecoration: 'none' }}>
              <ListItem button key={`menu-item-${index}`}>
                <ListItemIcon>
                  <Icon
                    path={menu.icon}
                    title={menu.title}
                    size={1}
                    color="#fff"
                  />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.listItemText }} primary={menu.title} />
              </ListItem>
            </Link>
          ))}
        </List>
        <div style={{ marginTop: 'auto' }}>
          <Divider />
          <List>
            <ListItem button onClick={onSignout}>
              <ListItemIcon>
                <Avatar src={userAvatar} className={classes.avatar}>JS</Avatar>
              </ListItemIcon>
              <ListItemText primary="John Smith" />
              <ListItemIcon>
                <Icon
                  path={mdiLogout}
                  title="Logout"
                  size={1}
                  color="#fff"
                />
              </ListItemIcon>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default AppBarDrawer;
