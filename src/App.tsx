import React, { useState } from 'react';
import Table from './components/Table';
import { userData } from './components/DataCenter/userdata';
import { postdata } from './components/DataCenter/postdata';
import { commentData } from './components/DataCenter/commentdata';

function App() {
  const [selectedData, setSelectedData] = useState<any[]>(userData);

  const handleDataChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    switch (value) {
      case 'userData':
        setSelectedData(userData);
        break;
      case 'postData':
        setSelectedData(postdata);
        break;
      case 'commentData':
        setSelectedData(commentData);
        break;
      default:
        setSelectedData(userData);
    }
  };

  return (
    <>
    <div style={{ position: 'absolute', left: '20%', top: '5px' }}>
      <select onChange={handleDataChange}>
        <option value="userData">User Data</option>
        <option value="postData">Post Data</option>
        <option value="commentData">Comment Data</option>
      </select>
    </div>
        <div>
    <Table data={selectedData} />
    </div>
    </>
  );
}

export default App;
