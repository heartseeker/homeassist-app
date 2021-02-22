import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Button } from '@material-ui/core';
import Truncate from 'react-truncate';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    maxWidth: 345,
    marginRight: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  readMore: {
    color: '#fff',
  },
  actions: {
    marginTop: 'auto',
  },
}));

const ListingItem = ({
  property,
}) => {
  const classes = useStyles();

  // const createMarkup = (html) => ({
  //   __html: html,
  // });

  return (
    <Card className={classes.root}>
      <CardHeader
        title={(<Truncate lines={1} ellipsis={<span>...</span>}>{property.post_title}</Truncate>)}
        subheader={property.location}
      />
      <CardMedia
        className={classes.media}
        image={property.thumbnail}
        title={property.post_title}
      />
      <CardContent>
        {/* <Typography style={{ whiteSpace: 'pre-wrap' }} variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={createMarkup(property.plain_post_content)} /> */}
        <Truncate lines={3} ellipsis={<span>...</span>}>
          {property.plain_post_content}
        </Truncate>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <IconButton aria-label="add to favorites">
          <BookmarkIcon />
        </IconButton>
        <div className={clsx(classes.expand)}>
          <Button className={classes.readMore} variant="contained" color="primary">
            Inquire now
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

ListingItem.propTypes = {
  property: PropTypes.object.isRequired,
};

export default ListingItem;
