//creo el formulario
import { FormContainer, Input, Textarea, Label, Select } from "./Style";

export default function ActivityForm({ onSubmit }) {
  function handleSubmit(event) {
    // función que se ejecuta cuando el usuario envía el formulario.
    event.preventDefault(); //evitar que se recargue la pagina
    const formData = new FormData(event.target); //crear objeto con los datos del form
    const activityData = Object.fromEntries(formData); //convertirlo en objeto de js
    onSubmit(activityData); //llamo a la funcion para mandarle los datos que el usuario ingreso
  }

  return (
    <div>
      <h1> New Activity</h1>
      <FormContainer onSubmit={handleSubmit}>
        <Label>
          {" "}
          Title
          <Input type="text" placeholder="insert title" />
        </Label>

        <Label>
          {" "}
          Area
          <Input type="text" placeholder="insert Area" />
        </Label>

        <Label>
          {" "}
          Country
          <Input type="text" placeholder="insert country" />
        </Label>

        <Label>
          {" "}
          Categories
          <Select>
            <option value="">Please select a category</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Sport">Sport</option>
            <option value="Water">Water</option>
            <option value="Nature">Nature</option>
            <option value="Adventure">Adventure</option>
            <option value="Winter">Winter</option>
          </Select>
        </Label>

        <Label>
          {" "}
          Description
          <Textarea type="text" placeholder="insert description" />{" "}
        </Label>

        <button type="submit">Add Activity</button>
        <button type="button">Cancel</button>
      </FormContainer>
    </div>
  );
}
