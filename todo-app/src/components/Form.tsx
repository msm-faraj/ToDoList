import { useForm } from "react-hook-form";

interface FormData {
  name: String;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="todo-name" className="form-label"></label>new-todo
        <input
          id="todo-name"
          type="text"
          className="form-control"
          {...register("name", { required: true, minLength: 3 })}
        />
      </div>
      {errors.name?.type === "minLength" && (
        <p className="text-danger">It must be at least 3 characters!</p>
      )}
      {errors.name?.type === "required" && (
        <p className="text-danger">Name required</p>
      )}
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Send
      </button>
    </form>
  );
};

export default Form;
