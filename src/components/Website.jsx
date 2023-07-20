import React from 'react';

const Website = ({ webUrl, onDelete }) => {

  const handleDelete = () => {
    onDelete(webUrl);
  };
  return (
    <div className='website'>
      <p>{webUrl}</p>
      <code onClick={handleDelete} >Delete</code>
    </div>
  );
};

export default Website;
