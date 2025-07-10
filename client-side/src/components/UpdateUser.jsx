import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "https://mern-crud-app-smoky.vercel.app/";

function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(
    function () {
      async function fetchData() {
        try {
          const { data } = await axios.get(`${BASE_URL}getUser/` + id);
          setName(data.name);
          setEmail(data.email);
          setAge(data.age);
        } catch (err) {
          console.error(err.message);
        }
      }
      fetchData();
    },
    [id]
  );

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`${BASE_URL}updateUser/` + id, { name, email, age })
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  }

  return (
    <div className="container-fluid bg-primary min-vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white rounded shadow p-4 w-100 w-md-75 w-lg-50">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Update User</h2>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter Name"
              className="form-control"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              className="form-control"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              value={age}
              placeholder="Enter Age"
              className="form-control"
              onChange={e => setAge(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
