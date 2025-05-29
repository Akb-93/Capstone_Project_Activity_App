import styled from "styled-components";
import Link from "next/link";

export const StyledButton = styled.button`
  background-color: var(--c-dark-600);
  color: var(--c-neutral-000);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-pill);
  border: 1px solid var(--c-dark-600);
  text-decoration: none;
  font-size: var(--text-20);
  font-weight: var(--text-bold);
  font-family: var(--font-family);
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
