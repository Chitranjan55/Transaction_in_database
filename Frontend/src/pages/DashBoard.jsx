import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Users from '../components/Users';
import axios from 'axios';

const DashBoard = () => {
  const [balance, setBalance] = useState([]);
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]); // State to hold the fetched users
  const[username, setUsername] = useState("");


  useEffect(()=>{
    const getUser = async ()=>{
      try {
        const res = await  axios.get('http://localhost:3000/api/v1/users/username',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsername(res.data.username);
      } catch (error) {
        console.log(error+"error while fetching the username");
      }
    }
    getUser()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/amount/balance', {
          headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
          },
        });
        setBalance(res.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/bulk?filter=` + filter, {
          headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
          },
        });
        setUsers(response.data.users); // Set the fetched users
      } catch (error) {
        console.log("error filtering data" + error);
      }
    };
    filterSearch();
  }, [filter]);

  return (
    <div className='w-screen h-screen bg-gradient-to-t from-green-900 to-stone-50'>
      <NavBar username={username} balance={balance} />
      <SearchBar onChange={(e) => {
        setFilter(e.target.value);
      }} />
      <Users filtered={users} /> {/* Pass the fetched users to the Users component */}
    </div>
  );
};

export default DashBoard;
