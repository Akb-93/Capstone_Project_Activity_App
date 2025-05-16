//hhhhh
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

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
  margin-bottom: 8rem;
`;

//thumbnail:
export const ImageContainer = styled.div`
  width: 150px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ThumbnailWrapper = styled.div`
  width: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    width: 110px;
  }
`;
export const ThumbnailImage = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 110px;
    height: 80px;
  }
`;

export const ThumbnailTitle = styled.p`
  text-align: center;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

//Carousel:
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  justify-content: center;
`;

export const CarouselContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 50%;
  overflow-x: auto;
  scroll-behavior: smooth;
  justify-content: flex-start;

  /* ocultar scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    scroll-snap-type: x mandatory;
  }

  /* cada thumbnail se ajustará con snap */
  & > * {
    scroll-snap-align: center;
  }
`;

export const CircleButton = styled.button`
  font-size: 2rem;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  user-select: none;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

//homepage:
export const DescriptionText = styled.p`
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  border: 3px dashed #4a90e2; /* borde ondulado simulado con dashed */
  border-radius: 15px;
  padding: 15px 20px;
  margin-top: 20px;
  font-size: 1.1rem;
  color: #333;
  max-width: 600px; /* para que no ocupe todo el ancho */
  background: #f9faff;
`;

//line between carousel and descrption :
export const Divider = styled.hr`
  margin: 40px auto;
  width: 80%;
  border: none;
  border-top: 2px solid #ccc;
`;

export const StyledSpan = styled.span`
  display: block;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;
//logo
export const LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.5);
    }
  }
`;
export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  background-color: #ccc;
  width: 100%;
`;

export const FooterList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FooterItem = styled.li`
  list-style-type: none;
`;

export const FooterLink = styled(Link)`
  text-decoration: none;
`;
