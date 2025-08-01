import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://mern-crud-app-smoky.vercel.app/";
function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}createUser`, { name, email, age })
      .then(res => {
        console.log(res);
        navigate("/");
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="container-fluid bg-primary min-vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white rounded shadow p-4 w-100 w-md-75 w-lg-50">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Add User</h2>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              onChange={e => setAge(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
