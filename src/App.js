import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  // A single change handler function to update any input state
  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value, // this will result in `title: "New title"` or `body: "New body"`
    });
  };

  // Based on https://felixgerschau.com/react-hooks-form-validation-typescript/
  const submitHandler = async (event) => {
    event.preventDefault();

    // Reset the form state
    setFormSubmitted(false);
    setFormErrors({});

    // Variables to keep track of whether the form is valid + the errors
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
      setFormErrors(errors);
      return;
    }

    await axios.put("https://jsonplaceholder.typicode.com/posts/1", formData);

    setFormSubmitted(true);
  };

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={changeHandler}
            className={`form__input ${
              formErrors.title ? "form__input--error" : ""
            }`}
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
            value={formData.body}
            onChange={changeHandler}
            className={`form__input ${
              formErrors.body ? "form__input--error" : ""
            }`}
          ></textarea>
          {formErrors.body && <p className="error">{formErrors.body}</p>}
        </div>
        <input type="submit" value="Submit" />
      </form>
      {formSubmitted && <p>Post updated!</p>}
    </>
  );
}

export default App;
