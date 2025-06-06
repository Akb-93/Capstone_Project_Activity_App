import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import { StyledButton } from "./StyledComponents";
import styled from "styled-components";
import Image from "next/image";
import UploadWidget from "./UploadWidget";

export default function ActivityForm({ onSubmit, onCancel, inputData }) {
  const router = useRouter();

  const { data: categories, error: categoriesError } =
    useSWR("/api/categories");

  const [formData, setFormData] = useState(
    inputData || {
    title: "",
    categories: [],
    description: "",
    area: "",
    country: "",
    imageUrl: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  if (categoriesError) return <p>Error loading data...</p>;
  if (!categories) return <p>Loading...</p>;

  function handleChange(event) {
    const { name, value, selectedOptions } = event.target;

    let newValue;

    if (name === "categories") {
      newValue = Array.from(selectedOptions).map((opt) => {
        return categories.find((cat) => cat._id === opt.value);
      });
    } else {
      newValue = value;
    }

    const updatedFormData = {
      ...formData,
      [name]: newValue,
    };

    setFormData(updatedFormData);

    if (!updatedFormData.title || updatedFormData.categories.length === 0) {
      setErrorMessage("Please fill in all required fields.");
    } else {
      setErrorMessage("");
    }
  }

  function handleSubmit(event) {
  
    event.preventDefault();

    const dataToSubmit = {
      ...formData,
      categories: formData.categories.map((cat) => cat._id),
    };

    onSubmit(dataToSubmit);
  }

  function handleImageUpload(url) {
    setFormData({
      ...formData,
      imageUrl: url,
    });
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <Label>
          Title*
          <Input
            type="text"
            name="title"
            placeholder="insert title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Area
          <Input
            type="text"
            placeholder="insert Area"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Country
          <Input
            type="text"
            placeholder="insert country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Categories*
          <Select
            name="categories"
            value={formData.categories.map((cat) => cat._id)}
            onChange={handleChange}
            multiple
            required
          >
            {categories?.map((cat) => (
              <option
                key={cat._id}
                value={
                  cat._id
                }
              >
                {cat.name}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          Description
          <Textarea
            name="description"
            type="text"
            placeholder="insert description"
            value={formData.description}
            onChange={handleChange}
          />
        </Label>
        <FieldSet>
          <Legend>Image</Legend>
          {formData.imageUrl ? (
            <ImageWrapper>
            <Image
              src={formData.imageUrl}
              alt="Uploaded Preview"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
            </ImageWrapper>
          ) : (
            <ImageWrapper>
              <Image
              width={39}
              height={39}
              alt="placeholder icon"
              src="/img/img-placeholder-icon.svg"/>
            </ImageWrapper>
          )}
          <UploadWidget onUpload={handleImageUpload} />
        </FieldSet>
        <p>*required fields</p>
        {errorMessage && <p>{errorMessage}</p>}
        <StyledButton
          type="submit"
          disabled={!formData.title || formData.categories.length === 0}
        >
          {inputData ? "Edit Activity" : "Add Activity"}
        </StyledButton>
        <StyledButton type="button" $variant="outlined" onClick={onCancel}>
          Cancel
        </StyledButton>
      </FormContainer>
    </>
  );
}

//Styled Components
const FormContainer = styled.form`
  display: grid;
  gap: var(--space-2);
  padding: var(--space-5) var(--space-3);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: var(--space-2) var(--space-2);
  width: 100%;
  min-width: 280px;
  max-width: 500px;
  font-size: var(--text-16);
  font-family: var(--font-family);
  border: 1px solid var(--c-dark-600);
  border-radius: var(--radius-md);
`;

const Textarea = styled.textarea`
  padding: var(--space-2) var(--space-2);
  width: 100%;
  min-width: 280px;
  max-width: 500px;
  font-size: var(--text-16);
  font-family: var(--font-family);
  border: 1px solid var(--c-dark-600);
  border-radius: var(--radius-md);
`;

const Label = styled.label`
  display: flex;
  gap: var(--space-1);
  flex-direction: column;
  font-size: var(--text-16);
  font-family: var(--font-family);
  font-weight: var(--text-bold);
  color: var(--c-dark-600);
`;

const Select = styled.select`
  padding: var(--space-2) var(--space-2);
  width: 100%;
  min-width: 280px;
  max-width: 500px;
  font-size: var(--text-16);
  font-family: var(--font-family);
  border: 1px solid var(--c-dark-600);
  border-radius: var(--radius-md);
`;

const FieldSet = styled.fieldset`
  position: relative;
  width: 100%;
  min-width: 280px;
  max-width: 500px;
  padding: var(--space-2) var(--space-2);
  margin-top: var(--space-4);
  font-size: var(--text-16);
  font-family: var(--font-family);
  border: 1px solid var(--c-dark-600);
  border-radius: var(--radius-md);
`;

const Legend = styled.legend`
  position: absolute;
  top: -32px;
  left: -4px;
  font-weight: var(--text-bold);
`;

const ImageWrapper = styled.figure`
  width: 100%;
  height: 200px;
  background-color: var(--c-neutral-200);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--c-neutral-500);
  margin: 0;
  margin-bottom: var(--space-2);
  border: 1px dashed var(--c-dark-600);
  border-radius: var(--radius-md);
`;
