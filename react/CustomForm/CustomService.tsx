import React, { useState, useEffect } from 'react';
import style from "./CustomService.css"

interface ContactInfo {
  Name: string;
  Email: string; 
}

const CustomService = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[] | null>(null);
  const [contact, setContact] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/formData');
        if (response.ok) {
          const data: ContactInfo[] = await response.json();
          setContactInfo(data);
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        console.error('Error:', error);
        setContactInfo(null);
      }
    };

    fetchData();
  }, []);

  if (contactInfo === null) {
    return (
      <div>
        <h2>Contact Info</h2> 
        <br />
        <p>Loading...</p>
      </div>
    )} 

  return (
    <div>
      {!contact && (
        <h2 className={style.topHead} 
          onClick={() => setContact(true)}>
          Contact Information<u><p
          onClick={() => console.log(contactInfo)}>click here</p></u>
        </h2>
      )}
      {contact && (
        <div>
          <div className={style.serviceBlock}>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {contactInfo.map((info: ContactInfo, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{info.Name}</td>
                    <td>{info.Email}</td>
                  </tr>
                ))}
              </tbody>
            </table> 
            {contact && <button className={style.serviceBtn} onClick={() => setContact(false)}>Close</button>}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default CustomService; 