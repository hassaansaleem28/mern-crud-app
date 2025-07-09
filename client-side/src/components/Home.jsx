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
        console.log(data.data);
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
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => {
              return (
                <tr key={user.name}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
