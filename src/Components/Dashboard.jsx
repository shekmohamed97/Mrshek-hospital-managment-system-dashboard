import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai"

const Dashboard = () => {

  const [appoinments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1.1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appoinments);

      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments()
  }, [])

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1.1/appointment/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appoinment) =>
          appoinment._id === appointmentId ? { ...appoinment, status } : appoinment));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }


  return (
    <>


      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>1500</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appoinments && appoinments.length > 0
                ? appoinments.map((appoinment) => (
                  <tr key={appoinment._id}>
                    <td>{`${appoinment.firstName} ${appoinment.lastName}`}</td>
                    <td>{appoinment.appoinment_date.substring(0, 16)}</td>
                    <td>{`${appoinment.doctor.firstName} ${appoinment.doctor.lastName}`}</td>
                    <td>{appoinment.department}</td>
                    <td>
                      <select className={appoinment.status === "Pending" ? "value-pending" : appoinment.status === "Accepted" ? "value-accepted" : "value-rejected"} value={appoinment.status}
                        onChange={(e) => handleUpdateStatus(appoinment._id, e.target.value)
                        }>
                        <option value="Pending" className='value-pending'>
                          Pending
                        </option>
                        <option value="Accepted" className='value-accepted'>
                          Accepted
                        </option>
                        <option value="Rejected" className='value-rejected'>
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>{appoinment.hasVisited === true ? <GoCheckCircleFill className='green' /> : <AiFillCloseCircle className='red' />}</td>
                  </tr>
                ))
                : "No Appointments Found!"}
            </tbody>
          </table>

          { }
        </div>
      </section>
    </>


  );
};

export default Dashboard;