import { useState, useEffect } from "react";
import { getData } from "../helpers/utils";
import { Pagination } from "react-bootstrap";

const PaginationCustom = ({ setData, setTotalPages, totalPages, start = '', end = '' }) => {
  const [updateActive, setUpdateActive] = useState(1);

  let items = [];

  useEffect(() => {}, [updateActive]);
  useEffect(() => {setUpdateActive(1)}, [totalPages]);

  if (totalPages > 0) {
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          onClick={() => {
            setUpdateActive(number);
            getData(setData, setTotalPages, number - 1, 10, start, end);
          }}
          key={number}
          active={number === updateActive}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  }

  items.push(
    <Pagination.Item key={1} active={true}>
      {1}
    </Pagination.Item>
  );
  return items;
};

export default PaginationCustom;
