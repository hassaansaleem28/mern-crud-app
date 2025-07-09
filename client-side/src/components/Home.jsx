import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://mern-crud-app-smoky.vercel.app/";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(function () {
    async function fetchData() {
      try {
        const data = await axios.get(BASE_URL);
        setUsers(data.data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`${BASE_URL}deleteUser/` + id);
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          position: "absolute",
          left: "32%",
          top: "3%",
          color: "#fff",
          fontWeight: "700",
        }}
      >
        CRUD OPERATIONS
      </h1>
      <div className="container-fluid bg-primary min-vh-100 d-flex justify-content-center align-items-center">
        <div className="bg-white rounded shadow p-3 w-100 w-md-75 w-lg-50">
          <div className="d-flex justify-content-between mb-3">
            <h4 className="mb-0">User List</h4>
            <Link to="/create" className="btn btn-success">
              Add +
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td className="d-flex flex-wrap gap-2">
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-sm btn-success"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
