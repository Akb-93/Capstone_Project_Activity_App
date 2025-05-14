import { Dialog, DialogSection, DialogFooter, StyledButton } from "./Style";

export default function ConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <Dialog open role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <DialogSection>
        <h2 id="modal-title">{title}</h2>
        <p>{message}</p>
        <DialogFooter>
          <StyledButton type="button" onClick={onCancel} $variant="outlined">
            No, Cancel
          </StyledButton>
          <StyledButton type="button" onClick={onConfirm} $variant="destructive">
            Yes, Delete
          </StyledButton>
        </DialogFooter>
      </DialogSection>
    </Dialog>
  );
}