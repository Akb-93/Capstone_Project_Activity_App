import styled from "styled-components";
import Link from "next/link";

// Buttons & links that look like buttons

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
`;

// Dialog

export const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  margin: auto;
  padding: 0;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Section = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 0.6rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;
