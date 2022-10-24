import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const getPost = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    setData(data);
  };

  useEffect(() => {
    try {
      getPost();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    if (!e.target.title.value) {
      valid = false;
      newErrors["title"] = "You must enter a title for your post";
    }

    if (!e.target.body.value) {
      valid = false;
      newErrors["body"] = "You must enter a body for your post";
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const result = await axios.put(
      "https://jsonplaceholder.typicode.com/posts/1",
      data
    );

    console.log(result.data);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Title:</label>
          <input
            type="text"
            name="title"
            value={data.title ?? ""}
            onChange={(e) => changeHandler(e)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="description">Body:</label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            value={data.body ?? ""}
            onChange={(e) => changeHandler(e)}
          ></textarea>
          {errors.body && <p className="error">{errors.body}</p>}
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;
