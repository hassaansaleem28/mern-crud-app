import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
          const { data } = await axios.get(
            "http://localhost:5000/getUser/" + id
          );
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
      .put("http://localhost:5000/updateUser/" + id, { name, email, age })
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter Name"
              className="form-control"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              className="form-control"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              value={age}
              placeholder="Enter Age"
              className="form-control"
              onChange={e => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
