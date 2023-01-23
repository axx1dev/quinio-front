import { useEffect, useState } from "react"
import {
  Table,
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import axios from 'axios';
import SpinnerCustom from "./components/SpinnerCustom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const endpoint = "http://127.0.0.1:3000"
const getData = (setState, setStatePage) => {
  axios.get(`${endpoint}/get-data-purses/0/10`)
  .then((res) => {
    setState(res.data.data)
    setStatePage(res.data.pages)
  })
  .catch((error) => {
    console.error(error)
  })
}

const App = () => {
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState()
  const [updateActive, setUpdateActive] = useState(1)

  const [inputFrom, setInputFrom] = useState(0)
  const [inputTo, setInputTo] = useState(0)

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  const addItemsPerPage = () => {
    let items = [];

    if (totalPages > 0) {
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item onClick={()=>setUpdateActive(number)} key={number} active={number === updateActive}>
            {number}
          </Pagination.Item>,
        );
      }
      setItemsPerPage(items)
      return;
    } 

    items.push(
      <Pagination.Item key={1} active={true}>
        {1}
      </Pagination.Item>,
    );
    setItemsPerPage(items)
    return;
    
  }

  useEffect(() => {
    getData(setData, setTotalPages)
  }, [data])

  useEffect(() => {
    addItemsPerPage()
  }, [data, updateActive])

  console.log({data})
  

  return (
    <div className="App">
      <Card className="w-75 shadow p-3 mb-5 bg-white rounded">
        <Card.Title>Estadistícas del programa de lealtad</Card.Title>
        {data?.length <= 0 && (<SpinnerCustom/>)}
        {data?.length > 0 && (<Card.Body>
          <Container className="shadow-sm p-3 mb-2 bg-white rounded">
            <Row>
              <Col>
                Seleccionar periodo: Desde{" "}
                <input
                  name="from"
                  type="date"
                  min="2000-01-01"
                  max={currentDate}
                  step="1"
                  //defaultValue="2023"
                />
                Hasta{" "}
                <input
                  name="to"
                  type="date"
                  min="2000-01-01"
                  max={currentDate}
                  step="1"
                  //defaultValue="2023"
                />
                <Button variant="outline-success" size="sm">
                  Aplicar
                </Button>
                Sucursal:
              </Col>
              <Col>
                <Form.Select
                  className="w-25"
                  size="sm"
                  aria-label="Default select example"
                >
                  <option>Todas</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>

                <Button variant="outline-success" size="sm">
                  Descargar CSV
                </Button>
              </Col>
            </Row>
          </Container>

          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Fecha Inicio Semana </th>
                <th>Semana del Año</th>
                <th># de Transacciones de Bonificación </th>
                <th>Ventas totales</th>
                <th>Monto bonificado</th>
                <th># de Transacciones de Redención</th>
                <th>Monto Redimido</th>
                <th># de Transacciones de Expiración</th>
                <th>Monto Expirado</th>
                <th>Saldo Disponible en Monedero</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (<tr key={item.id}>
                <td>{item.createdAt}</td>
                <td>{(item?.originDetails?.details?.length || 0)}</td>
                <td>{(item?.originDetails?.details?.length || 0) * 2}</td>
                <td>{item?.saleAmount}</td>
                <td>{item?.rewardAmount}</td>
                <td>{(item?.originDetails?.transactionkey || 0)}</td>
                <td>{(item?.originDetails?.subtotal || 0)}</td>
                <td>{(item?.originDetails?.details?.length || 0)}</td>
                <td>{item?.amountUsed}</td>
                <td>{(item?.originDetails?.total || 0)}</td>
              </tr>))}
              
            </tbody>
          </Table>
          <div>
            <Pagination>{itemsPerPage}</Pagination>
          </div>
        </Card.Body>)}
      </Card>
    </div>
  );
}

export default App;
