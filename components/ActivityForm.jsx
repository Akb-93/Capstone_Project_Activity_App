//creo el formulario
import { FormContainer, Input, Textarea, Label, Select } from "./Style";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ActivityForm({ onSubmit, inputData }) {
  //el fetcher esta en otra carpeta
  const router = useRouter();

  const { data: categories, error: categoriesError } =
    useSWR("/api/categories");

  //DESHABILITAR BOTON SUBMIT ://CREO ESTADO
  const [formData, setFormData] = useState({
    title: "",
    categories: [],
    description: "",
    area: "",
    country: "",
  });

  //PARA MENSAJE DE ERROR
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

    // this is updated too so it takes the whole array
    if (!updatedFormData.title || updatedFormData.categories.length === 0) {
      setErrorMessage("Please fill in all required fields.");
    } else {
      setErrorMessage("");
    }
  }

  //LIMPIAR EL FORM LUEGO DE CANCEL
  function handleCancel() {
    //router.back(); <--------- would this be better or would it be better to have more control?
    setFormData({
      title: "",
      categories: [],
      description: "",
      area: "",
      country: "",
    });

    setErrorMessage("");

    if (inputData?._id) {
      router.push(`/activities/${inputData._id}`); // won't work until Alissa cooks the details page
    } else {
      router.push("/activities"); // won't work until activities page is operational
    }
  }

  function handleSubmit(event) {
    // función que se ejecuta cuando el usuario envía el formulario.
    event.preventDefault(); //evitar que se recargue la pagina

    const dataToSubmit = {
      // also updating here the data we need to submit
      ...formData,
      categories: formData.categories.map((cat) => cat._id),
    };

    onSubmit(dataToSubmit);
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        {" "}
        <Label>
          {" "}
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
          {" "}
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
          {" "}
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
          {" "}
          Categories*
          <Select
            name="categories"
            value={formData.categories.map((cat) => cat._id)} // changed here so the value is populated by an array of id strings from the array of objects
            onChange={handleChange}
            multiple
            required
          >
            {" "}
            {categories?.map((cat) => (
              <option
                key={cat._id}
                value={
                  cat._id
                } /* also updating here so it sends the id and not the name */
              >
                {cat.name}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          {" "}
          Description
          <Textarea
            name="description"
            type="text"
            placeholder="insert description"
            value={formData.description}
            onChange={handleChange}
          />{" "}
        </Label>
        <p>*required fields</p>
        {errorMessage && <p>{errorMessage}</p>}
        <button
          type="submit"
          disabled={!formData.title || formData.categories.length === 0}
        >
          Add activity
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </FormContainer>
    </>
  );
}
