import { StyledButton } from "./StyledComponents";
import styled from "styled-components";

export default function ConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <Dialog open role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <DialogSection>
        <DialogTitle id="modal-title">{title}</DialogTitle> {/* <-- CHANGED */}
        <DialogMessage>{message}</DialogMessage> {/* <-- CHANGED */}
        <DialogFooter>
          <StyledButton type="button" onClick={onCancel} $variant="outlined">
            No, Cancel
          </StyledButton>
          <StyledButton
            type="button"
            onClick={onConfirm}
            $variant="destructive"
          >
            Yes, Delete
          </StyledButton>
        </DialogFooter>
      </DialogSection>
    </Dialog>
  );
}

//Styled Components

const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  background: rgba(0, 0, 0, 0.4); /* overlay background */
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
`;

const DialogSection = styled.section`
  background: var(--c-neutral-000); /* <-- CHANGED: content bg */
  padding: 2rem;
  border-radius: 0.6rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const DialogTitle = styled.h2`
  /* <-- CHANGED: new styled title */
  font-size: var(--text-20);
  color: var(--c-dark-700);
  margin: 0 0 1rem 0;
`;

const DialogMessage = styled.p`
  /* <-- CHANGED: new styled message */
  font-size: var(--text-16);
  color: var(--c-dark-600);
  margin: 0;
`;

const DialogFooter = styled.footer`
  display: flex;
  justify-content: space-around;
  gap: 1rem; /* <-- CHANGED: spacing between buttons */
  margin-top: 1.5rem;
`;
