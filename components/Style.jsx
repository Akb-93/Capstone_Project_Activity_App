import styled from "styled-components";
import Link from "next/link";

const StyledButton = styled.button`
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

const StyledLinkButton = styled(Link)`
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
