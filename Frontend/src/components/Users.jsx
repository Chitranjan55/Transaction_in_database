import React from 'react';
import Person from './Person';
import { useNavigate } from 'react-router-dom';

const Users = ({ filtered }) => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center'>
      <div className='flex overflow-auto flex-col w-[1000px] h-[500px] bg-inherit rounded-md'>
        {filtered && filtered.length > 0 ? (
          filtered.map((user) => (
            <Person
              key={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
              onClick={() => {
                navigate(`/sendmoney?to=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`);
              }}
            />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default Users;
