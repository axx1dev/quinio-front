import { useEffect, useState } from "react";
import { sortDataTable } from "../helpers/utils";
import { Table } from "react-bootstrap";

const TableCustom = ({ data, setState }) => {
  const [sort, setSort] = useState(true);

  useEffect(() => {}, [data, sort]);

  return (
    <div>
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th
              onClick={() =>
                sortDataTable(data, "createdAt", sort, setSort, setState)
              }
              className="cursor__pointer"
            >
              Fecha Inicio Semana ↓
            </th>
            <th>Semana del Año</th>
            <th># de Transacciones de Bonificación </th>
            <th
              onClick={() =>
                sortDataTable(data, "saleAmount", sort, setSort, setState)
              }
              className="cursor__pointer"
            >
              Ventas totales ↓
            </th>
            <th
              onClick={() =>
                sortDataTable(data, "rewardAmount", sort, setSort, setState)
              }
              className="cursor__pointer"
            >
              Monto bonificado ↓
            </th>
            <th># de Transacciones de Redención</th>
            <th>Monto Redimido</th>
            <th># de Transacciones de Expiración</th>
            <th>Monto Expirado</th>
            <th>Saldo Disponible en Monedero</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.createdAt.split("T")[0]}</td>
              <td>{item?.originDetails?.details?.length || 0}</td>
              <td>{(item?.originDetails?.details?.length || 0) * 2}</td>
              <td>{item?.saleAmount}</td>
              <td>{item?.rewardAmount}</td>
              <td>{item?.originDetails?.transactionkey || 0}</td>
              <td>{item?.originDetails?.subtotal || 0}</td>
              <td>{item?.originDetails?.details?.length || 0}</td>
              <td>{item?.amountUsed}</td>
              <td>{item?.originDetails?.total || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableCustom;
