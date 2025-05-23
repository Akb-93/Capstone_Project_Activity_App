import styled from "styled-components";
import Link from "next/link";

// Buttons
export const StyledButton = styled.button`
  background-color: var(--c-dark-600);
  color: var(--c-neutral-000);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-pill);
  border: 1px solid var(--c-dark-600);
  text-decoration: none;
  font-size: var(--text-20);
  font-weight: var(--text-bold);
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
      background-color: var(--c-neutral-000);
      color: var(--c-dark-600);
      border: 1px solid var(--c-dark-600);

      &:hover {
        background-color: var(--c-neutral-050);
      }

      &:active {
        background-color: var(--c-neutral-050);
      }
    `}

  ${({ $variant }) =>
    $variant === "destructive" &&
    `
      background-color: var(--c-red-700);
      border: 1px solid var(--c-red-700);

      &:hover {
        background-color: var(--c-red-400);
      }

      &:active {
        background-color: var(--c-red-400);
      }
    `}
`;

// Links that look like buttons
//Will be reused in Home Page moving forward

export const StyledLink = styled(Link)`
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
