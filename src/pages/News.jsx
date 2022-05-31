import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;


function News( {simplified}) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const count = simplified ? 6 : 12 ;
  const { data: cryptoNews } = useGetCryptoNewsQuery(`${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`);

  console.log(cryptoNews);

  if (!cryptoNews) return "dfsaf";

  return (
    <Row gutter={[24, 24]}>
    {!simplified && (
      <Col span={24}>
        <Select
          showSearch
          className="select-news"
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={(value) => setNewsCategory(value)}
          style={{
            width: '80%',
          }}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="Cryptocurency">Cryptocurrency</Option>
          {data && data.data.coins.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
        </Select>
      </Col>
    )}
    {cryptoNews.value.length>1 && cryptoNews.value.map((news, i) => (
      <Col xs={24} sm={12} lg={8} key={i}>
        <Card hoverable className="news-card">
          <a href={news.url} target="_blank" rel="noreferrer">
            <div className="news-image-container">
              <Title className="news-title" level={4}>{news.name}</Title>
              {/* {news.image.thumbnail.contentUrl && <img src={news.image.thumbnail.contentUrl} alt="brnyr" />} */}
              { <img src={demoImage} alt="brnyr" />}
            </div>
            <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
            <div className="provider-container">
              <div>
              {/* {news.provider[0].image.thumbnail.contentUrl  && <Avatar src={news.provider[0].image.thumbnail.contentUrl } alt="media" />} */}
              { <Avatar src={demoImage} alt="" />}
                <Text className="provider-name">{news.provider[0].name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
            </div>
          </a>
        </Card>
      </Col>
    ))}
  </Row>
);
};

export default News;