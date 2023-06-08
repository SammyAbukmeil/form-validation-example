import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // Get the data for this post and set it in state (to fill the form fields)
  const getPost = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );

      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value, // warehouseName: "Test"
    });
  };

  // Based on https://felixgerschau.com/react-hooks-form-validation-typescript/
  const submitHandler = async (event) => {
    event.preventDefault();

    setFormErrors({});

    let formIsValid = true;

    const errors = {};

    if (!formData.title) {
      formIsValid = false;
      errors["title"] = "You must enter a title for your post";
    }

    if (!formData.body) {
      formIsValid = false;
      errors["body"] = "You must enter a body for your post";
    }

    if (!formIsValid) {
      return setFormErrors(errors);
    }

    const result = await axios.put(
      "https://jsonplaceholder.typicode.com/posts/1",
      formData
    );

    console.log(result.data);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title ?? ""}
          onChange={(e) => changeHandler(e)}
        />
        {formErrors.title && <p className="error">{formErrors.title}</p>}
      </div>
      <div>
        <label htmlFor="description">Body:</label>
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="10"
          value={formData.body ?? ""}
          onChange={(e) => changeHandler(e)}
        ></textarea>
        {formErrors.body && <p className="error">{formErrors.body}</p>}
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
