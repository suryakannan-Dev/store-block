import React, { useEffect, useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import documents from '../graphql/getCustomTable.graphql';
import styleTable from "./customTable.css"

const CustomTable = () => {
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [connect, setConnect] = useState(false)
  const [contactData, setContactData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [getContact, { data, error: queryError }] = useLazyQuery(documents, {
    variables: {
      acronym: 'FT',
      fields: ['firstName', 'secondName', 'Age', 'Subject'],
      schema: 'suryaschema',
      page: pageNo,
      pageSize,
    },
    notifyOnNetworkStatusChange: true,
    ssr: false,
  }); 

  useEffect(() => {
    getContact();
  }, [pageNo]); 

  useEffect(() => {
    if (data?.documents) {
      setContactData(data.documents);
      setError(null);
      console.table(contactData);
    }
    if (queryError) {
      setError('There is an error fetching data.'); 
    }
  }, [data, queryError]);

  return (
    <div className={styleTable.center}>
    {!connect && <button className={styleTable.btn}
    onClick={() => setConnect(true)}>details</button> }
    {connect &&
    <div className={styleTable.contactTable}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Second Name</th>
            <th>Subject</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {contactData.length ? (
            contactData.map((item: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {['firstName', 'secondName', 'Subject', 'Age'].map((field) => (
                  <td key={field}>
                    {item.fields.find((f: any) => f.key === field)?.value}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>{error || 'No contact data found.'}</td>
            </tr>
          )}
        </tbody>
      </table> 

      {error === null && 
      <div className={styleTable.show}>
        {contactData.length !== 0 && (
          <button onClick={() => setPageNo(pageNo + 1)}>
            See More
          </button>)}
        {pageNo === 1 && (
          <button className={styleTable.close} onClick={() => setConnect(false)}>
            close
          </button>)}
        {pageNo > 1 && (
          <button onClick={() => setPageNo(pageNo - 1)}>
            See Less
          </button>
        )}
      </div>} 
      
    </div>}
    </div>
  );
};

export default CustomTable;
