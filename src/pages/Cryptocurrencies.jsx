import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Input, Table, Space } from 'antd';
import { Loader } from '../components';
import { useGetCryptosQuery } from '../services/cryptoApi';

function Cryptocurrencies({ simplified }) {
  const { Column } = Table;
  const count = simplified ? 6 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if(!isFetching){
      setCryptos(data.data.coins);
    

    const filteredData = data.data.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
    }
  }, [data, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            style={{
              width: '100%',
            }}
            placeholder="Search Cryptocurrency Name"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      {cryptos && <Table dataSource={cryptos}>
          <Column
            title="Icon"
            key="iconUrl"
            dataIndex="iconUrl"
            render={(_, record) => (
              <img className="crypto-image" src={record.iconUrl} />
            )}
          />
          <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => a.name.length - b.name.length}/>
          <Column title="Price" dataIndex="price" key="price" sorter={(a, b) => a.price - b.price} render={(_, record) => (
              <p>{millify(record.price)}</p>
            )} />
            <Column title="Rank" dataIndex="rank" key="rank" sorter={(a, b) => a.rank - b.rank} render={(_, record) => (
              <p>{record.rank}</p>
            )} />
            <Column  title="Change" dataIndex="change" key="change" sorter={(a, b) => a.change - b.change} render={(_, record) => (
              <p>{record.change}%</p>
            )} />
            <Column  title="Url" dataIndex="uuid" key="Url" render={ (_, record) => <Link to={'/crypto/' + record.uuid}>More Info</Link>} />
      </Table>}
    </>
  );
};

export default Cryptocurrencies;
