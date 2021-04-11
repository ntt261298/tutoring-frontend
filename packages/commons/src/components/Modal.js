import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, closable, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {closable ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const renderHeader = (header, headerText, onHide) => {
  if (header) return header;
  return (
    <DialogTitle onClose={onHide}>
      {headerText}
    </DialogTitle>
  );
};

const renderFooter = (
  footer,
  footerType,
  primaryButtonText,
  secondaryButtonText,
  onClickPrimaryButton,
  onClickSecondaryButton,
  disablePrimaryButton,
  disableSecondaryButton,
) => {
  if (footer) {
    return footer;
  }
  switch (footerType) {
    case 'single':
      return (
        <DialogActions>
          <Button onClick={onClickPrimaryButton} disabled={disablePrimaryButton} color="primary">
            {primaryButtonText}
          </Button>
        </DialogActions>
      );
    case 'double':
      return (
        <DialogActions>
          <Button onClick={onClickSecondaryButton} disabled={disableSecondaryButton} color="secondary">
            {secondaryButtonText}
          </Button>
          <Button onClick={onClickPrimaryButton} disabled={disablePrimaryButton} color="primary">
            {primaryButtonText}
          </Button>
        </DialogActions>
      );
    default:
      return null;
  }
};

const Modal = ({
  header,
  headerText,
  body,
  footer,
  primaryButtonText,
  onClickPrimaryButton,
  secondaryButtonText,
  onClickSecondaryButton,
  footerType,
  onHide,
  closable,
  disablePrimaryButton,
  disableSecondaryButton,
  showFooter,
  showHeader,
  backdrop,
}) => (
  <Dialog
    open
    onClose={onHide}
    disableBackdropClick={!backdrop}
  >
    {showHeader && renderHeader(
      header,
      headerText,
      onHide,
      closable,
    )}
    <DialogContent dividers>
      {body}
    </DialogContent>
    {showFooter && renderFooter(
      footer,
      footerType,
      primaryButtonText,
      secondaryButtonText,
      onClickPrimaryButton,
      onClickSecondaryButton,
      disablePrimaryButton,
      disableSecondaryButton,
    )}
  </Dialog>
);

Modal.defaultProps = {
  backdrop: 'static',
  show: true,
  footerType: 'single',
  closable: true,
  showFooter: true,
  showHeader: true,
};

export default Modal;
