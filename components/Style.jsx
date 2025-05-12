//hhhhh
import styled from "styled-components";

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
