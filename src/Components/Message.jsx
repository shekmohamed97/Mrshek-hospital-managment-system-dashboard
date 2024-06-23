import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Message = () => {

  const [message, setMessage] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1.1/hospitalmessage/getall",
          { withCredentials: true }
        );
        setMessage(data.message);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchUser();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {message && message.length > 0 ? (
          message.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>


  );
};

export default Message;