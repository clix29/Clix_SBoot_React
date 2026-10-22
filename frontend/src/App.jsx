import './App.css'
import axios from 'axios';
import {useEffect, useState} from "react";

function App() {

  const [student, setStudent] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [page, setPage] = useState('home');
  const [menu, setMenu] = useState(false);
  const [message, setMessage] = useState('');



  const fetchStudent = async () => {
    try{
      const response = await axios.get('http://localhost:8080/api/v1/students')
      setStudent(response.data)
      console.log(response.data);
    }catch (error) {
      console.log(error);
    }
  }

  const createStudent = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:8080/api/v1/students',{
        id: Number(id),
        name: name,
        age: Number(age)})
      console.log(response.data);
      fetchStudent()
      setId('')
      setName('')
      setAge('')
      setMessage('Student successfully added')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.log(error);
    }
  }

  const updateStudent = async () => {
    try{
      const response = await axios.put(`http://localhost:8080/api/v1/students/${id}`, {
        name: name,
        age: Number(age)})
      console.log(response.data);
       fetchStudent();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/students/${studentId}`)
      fetchStudent();
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchStudent()
  }, []);

  return(

      <div>

        <div className="header">
          <h1>student Management System</h1>

          <div className="menu">
            <button className="dots" onClick={() => setMenu(!menu)}>☰</button>

            {menu && (
                <div className="dropdown">
                  <button onClick={() => { setPage('view'); fetchStudent(); setMenu(false) }}>VIEW STUDENTS</button>
                  <button onClick={() => { setPage('create'); setMenu(false) }}>ADD STUDENT</button>
                </div>
            )}
          </div>
        </div>

        <div className="options">
          <button className="option-box" onClick={() => { setPage('view');fetchStudent() }}>VIEW STUDENTS</button>
          <button className="option-box" onClick={() => setPage('create')}>ADD STUDENT</button>
        </div>

        {page === 'create' && (
            <div className="overlay">
              <div className="popup">
                <button type="button" className="close" onClick={() => setPage('view')}>✕</button>
                <h2>Add Student</h2>
                <p>Add a student to continue</p>

                {message && (
                    <div className="success">{message}</div>
                )}

                <form onSubmit={createStudent}>
                  <input type="number" placeholder="ID" value={id} onChange={(e) =>setId(e.target.value)}/>
                  <input type="text" placeholder="Name" value={name} onChange={(e) =>setName(e.target.value)}/>
                  <input type="number" placeholder="Age" value={age} onChange={(e) =>setAge(e.target.value)}/>
                  <button type="submit">ADD</button>
                  <button type="button" onClick={() => setPage('view')}>CANCEL</button>
                </form>
              </div>
            </div>
        )}

        {page === 'edit' && (
            <div className="overlay">
              <div className="popup">
                <button type="button" className="close" onClick={() => setPage('view')}>✕</button>
                <h2>Edit Student</h2>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  updateStudent();
                  setPage('view');
                }}>
                  <input type="number" placeholder="ID" value={id} disabled/>
                  <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                  <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
                  <button type="submit">UPDATE</button>
                  <button type="button" onClick={() => setPage('view')}>CANCEL</button>
                </form>
              </div>
            </div>
        )}


        {page === 'view' && (
            <div className="student-table">
              <button type="button" className="close-table" onClick={() => setPage('home')}>close</button>
          <h2>Student List</h2>

           <table>
             <thead>
             <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Age</th>
               <th>Action</th>
             </tr>
             </thead>
             <tbody>
             {student.map((stud) => (
                 <tr key={stud.id}>
                 <td>{stud.id}</td>
                 <td>{stud.name}</td>
                 <td>{stud.age}</td>

                   <td>
                     <button onClick={() => {
                     setId(stud.id);
                     setName(stud.name);
                     setAge(stud.age);
                     setPage('edit');
                     }}>
                       edit</button>

                     <button onClick={() => deleteStudent(stud.id)}>
                       delete</button>
                   </td>
               </tr>
               ))}
             </tbody>
           </table>
            </div>
            )}
      </div>

  );
}

export default App