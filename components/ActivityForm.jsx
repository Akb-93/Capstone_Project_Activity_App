//creo el formulario
import { FormContainer, Input, Textarea, Label, Select } from "./Style";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ActivityForm({ onSubmit, inputData }) {
  //el fetcher esta en otra carpeta
  const router = useRouter();


  const { data: categories, error: categoriesError } =  // improved SWR, copied Alissa's config from her last PR
    useSWR("/api/categories");
  const { data: activities, error: activitiesError } =
    useSWR("/api/activities");

  //DESHABILITAR BOTON SUBMIT ://CREO ESTADO
  const [formData, setFormData] = useState(
    inputData || {
      // this to have inputData if there are any
      title: "",
      categories: [], // this one was originally treated as a string, but actually is an array :/
      description: "",
      area: "",
      country: "",
    }
  );

  //PARA MENSAJE DE ERROR
  const [errorMessage, setErrorMessage] = useState("");

  if (categoriesError || activitiesError) return <p>Error loading data...</p>;
  if (!categories || !activities) return <p>Loading...</p>;

  function handleChange(event) {
    const { name, value, selectedOptions } = event.target;

    let newValue;

    if (name === "categories") {
      // here we need an array of category objects based on the selected category IDs, so we have to change the logic
      newValue = Array.from(selectedOptions).map((opt) => {
        return categories.find((cat) => cat._id === opt.value); // and we need need this to return categories objs whose ids matches the ids specifies in the option
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

    // brainstorming some logic to go back when cancel (for Jessi's ticket too)

    if (inputData?._id) {
      router.push(`/activities/${inputData._id}`);
    } else {
    setFormData({
    title: "",
    categories: [],
    description: "",
    area: "",
    country: "",
    });

    setErrorMessage("");
    }
  }

  function handleSubmit(event) {
    // función que se ejecuta cuando el usuario envía el formulario.
    event.preventDefault(); //evitar que se recargue la pagina

    const dataToSubmit = { // also updating here the data we need to submit
      ...formData,
      categories: formData.categories.map((cat) => cat._id),
    };

    onSubmit(dataToSubmit);
  }

  return (
    <div>
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
            multiple //let's allow for multiple entries
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
          disabled={
            !formData.title || formData.categories.length === 0
          } /* updating the logic to disable the button here */
        >
          {inputData ? "Edit Activity" : "Add Activity" /* updating the logic so it change depending whether we have inputData (the data we use in edit page) */} 
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </FormContainer>
    </div>
  );
}
