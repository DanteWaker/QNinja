import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface EssayCorrectionSuccessDialogProps {
  open: boolean;
  closeFunc: () => void;
  confirmFunc: () => void;
}

export default function EssayCorrectionSuccessDialog(
  props: EssayCorrectionSuccessDialogProps
) {
  const { open, closeFunc, confirmFunc } = props;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Redação corrigida</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A redação foi corrigida com sucesso! <br /> Você gostaria de fazer
          outra correção?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFunc}>Não</Button>
        <Button onClick={confirmFunc} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
