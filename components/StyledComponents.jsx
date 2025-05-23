import styled from "styled-components";
import Link from "next/link";

// Buttons
export const StyledButton = styled.button`
  background-color: black;
  color: white;
  padding: var(--space-5) var(--space-3);

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
//Will be reused in Home Page moving forward

export const StyledLink = styled(Link)`
  margin: var(--space-5) auto 0;
  text-align: center;
  display: block;
  width: fit-content;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: var(--text-bold);
  font-size: var(--text-20);
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-pill);
  border: 3px solid var(--c-dark-600);
  color: var(--c-dark-600);
  background-color: white;

  &:hover {
    background-color: #ffe6e9;
    color: var(--c-dark-600);
  }

  &:active {
    background-color: #e5e7eb;
  }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;
