//creo el formulario
import { FormContainer, Input, Textarea, Label, Select } from "./Style";
import useSWR from "swr";
import { useState } from "react";
import fetcher from "@/Lib/fetcher";

export default function ActivityForm({ onSubmit, inputData }) {
  //el fetcher esta en otra carpeta

  const { data: categories, error: categoriesError } = useSWR(
    "/api/categories",
    fetcher
  ); //useswr para cargar datos automáticamente cuando el componente se monta.

  const { data: activities, error: activitiesError } = useSWR(
    "/api/activities",
    fetcher
  ); // Obtener actividades desde GET el backend

  //console.log("form:", inputData);

  //DESHABILITAR BOTON SUBMIT ://CREO ESTADO
  const [formData, setFormData] = useState(
    inputData || {
      // this to have inputData if there are any
      title: "",
      category: [], // this one was originally treated as a string, but actually is an array :/
      description: "",
      area: "",
      country: "",
    }
  );

  console.log("formData", formData);
  //PARA MENSAJE DE ERROR
  const [errorMessage, setErrorMessage] = useState("");

  if (categoriesError || activitiesError) return <p>Error loading data...</p>;
  if (!categories || !activities) return <p>Loading...</p>;
  //console.log(categories);

  function handleChange(event) {
    //ASI MANEJO LOS CAMBIOS DEL INPUT
    const { name, value, selectedOptions } = event.target;
    setFormData((prev) => {

      if (name === "categories") { // when the key is categories...
        const newValue = Array.from(selectedOptions).map((opt) => opt.value); // ...create a value that is an array made of selected options
        setFormData((prev) => ({
          ...prev,
          [name]: newValue,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }

      const newData = { ...prev, [name]: newValue }; //crear nuevo objeto con contenido previo + el nuevo valor del(title o category)

      // asi verifico si los campos obligatorios están vacíos
      if (newData.title === "" || newData.category === "") {
        setErrorMessage("Please fill in all required fields.");
      } else {
        setErrorMessage("");
      }
      return newData;
    });
  }

  //LIMPIAR EL FORM LUEGO DE CANCEL
  function handleCancel() {
    setFormData({
      title: "",
      category: [],
      description: "",
      area: "",
      country: "",
    });
    setErrorMessage("");
  }

  function handleSubmit(event) {
    // función que se ejecuta cuando el usuario envía el formulario.
    event.preventDefault(); //evitar que se recargue la pagina

    onSubmit(formData); //llamo a la funcion para mandarle los datos que el usuario ingreso
  }

  return (
    <div>
      {/* <h1> New Activity</h1> */}
      <FormContainer onSubmit={handleSubmit}>
        {" "}
        {/* Escucha el envío del formulario. Cuando el usuario hace clic en "Add Activity"*/}
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
            value={formData.categories.map(cat => cat._id)} // changed here so the value is populated by an array of id strings from the array of objects
            onChange={handleChange}
            multiple //let's allow for multiple entries
            required
          >
            {" "}
            {/*loop MAP para unir categoria se necesita 1 opcion // actually also more than 1 option since it's an array, we need it for the edit ad well */}
            <option value="">Select categories</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id} /* also updating here so it sends the id and not the name */>
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
        <button type="submit" disabled={!formData.title || formData.categories.length === 0} /* updating the logic to disable the button here */>
          {inputData ? "Edit Activity" : "Add Activity"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </FormContainer>
    </div>
  );
}
