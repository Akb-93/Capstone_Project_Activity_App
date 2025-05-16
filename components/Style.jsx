//hhhhh
import styled from "styled-components";
import Link from "next/link";

export const FormContainer = styled.form`
  display: grid;
  gap: 1rem;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f9f9f9;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Select = styled.select`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;
export const StyledAddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:hover {
    background-color: #0056b3;
  }
`;

// Buttons

export const StyledButton = styled.button`
  background-color: black;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  border: 1px solid black;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $variant }) =>
    $variant === "outlined" &&
    `
      background-color: white;
      color: black;
      border: 1px solid black;

      &:hover {
        background-color: #f3f4f6;
      }

      &:active {
        background-color: #e5e7eb;
      }
    `}

  ${({ $variant }) =>
    $variant === "destructive" &&
    `
      background-color: #dc2626;
      border: 1px solid #dc2626;

      &:hover {
        background-color: #ef4444;
      }

      &:active {
        background-color: #b91c1c;
      }
    `}
`;

// Links that look like buttons

export const StyledLinkButton = styled(Link)`
  display: inline-block;
  background-color: black;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  border: 1px solid black;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  ${({ $variant }) =>
    $variant === "outlined" &&
    `
      background-color: white;
      color: black;
      border: 1px solid black;

      &:hover {
        background-color: #f3f4f6;
      }

      &:active {
        background-color: #e5e7eb;
      }
    `}

  ${({ $variant }) =>
    $variant === "destructive" &&
    `
      background-color: #dc2626;
      border: 1px solid #dc2626;

      &:hover {
        background-color: #ef4444;
      }

      &:active {
        background-color: #b91c1c;
      }
    `}
`;

// Dialog

export const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  background: rgba(0, 0, 0, 0.4);
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

export const DialogSection = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 0.6rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const DialogFooter = styled.footer`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

// Main

export const StyledMain = styled.main`
padding: 1.5rem;
margin-bottom: 4rem;`;

// Footer


export const FooterWrapper = styled.footer`
    background-color: #ccc;
    width: 100%;
    padding:50px;
`;

export const FooterList = styled.ul`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin:auto;
`;

export const FooterItem = styled.li`
 list-style-type: none;
`;

export const FooterLink = styled(Link)`
  
  text-decoration: none;
 
`;