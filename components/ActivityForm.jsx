//creo el formulario
import { FormContainer, Input, Textarea, Label, Select } from "./Style";
import useSWR from "swr";
import { useState } from "react";

export default function ActivityForm({ onSubmit }) {
  const fetcher = (url) => fetch(url).then((res) => res.json()); //DEL GET PARA CATEGORIAS DEL FORM
  const { data: categories, error } = useSWR("api/categories", fetcher); //useswr para cargar datos automáticamente cuando el componente se monta.

  //DESHABILITAR BOTON SUBMIT ://CREO ESTADO
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    area: "",
    country: "",
  });

  //PARA MENSAJE DE ERROR
  const [errorMessage, setErrorMessage] = useState("");

  if (error) return <p>Error loading categories...</p>;
  if (!categories) return <p>Loading categories...</p>;
  console.log(categories);

  function handleChange(event) {
    //ASI MANEJO LOS CAMBIOS DEL INPUT
    const { name, value } = event.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }; //crear nuevo objeto con contenido previo + el nuevo valor del(title o category)

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
      category: "",
      description: "",
      area: "",
      country: "",
    });
    setErrorMessage("");
  }

  function handleSubmit(event) {
    // función que se ejecuta cuando el usuario envía el formulario.
    event.preventDefault(); //evitar que se recargue la pagina
    const formData = new FormData(event.target); //crear objeto con los datos del form
    const activityData = Object.fromEntries(formData);
    onSubmit(activityData); //llamo a la funcion para mandarle los datos que el usuario ingreso
  }

  return (
    <div>
      <h1> New Activity</h1>
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
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {" "}
            {/*loop MAP para unir categoria se necesita 1 opcion */}
            <option value="">Please select a category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat.name}>
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
        <button type="submit" disabled={!formData.title || !formData.category}>
          Add Activity
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </FormContainer>
    </div>
  );
}
