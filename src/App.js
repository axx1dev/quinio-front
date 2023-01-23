import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Pagination } from "react-bootstrap";
import SpinnerCustom from "./components/SpinnerCustom";
import ChartCustom from "./components/ChartCustom";
import PaginationCustom from "./components/PaginationCustom";
import TableCustom from "./components/TableCustom";
import ToastCustom from "./components/ToastCustom";
import { generateArrayToCSV, getData } from "./helpers/utils";
import ModalCustom from "./components/ModalCustom";
import { CSVLink } from "react-csv";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");

  const [activeToast, setActiveToast] = useState(false);

  const headers = [
    { label: "Fecha Inicio Semana", key: "startDateOfWeek" },
    { label: "Semana del Año", key: "weekOfYear" },
    { label: "# de Transacciones de Bonificación	", key: "noTransactions" },
    { label: "Ventas totales", key: "totalSales" },
    { label: "Monto bonificado", key: "rewardAmount" },
    { label: "# de Transacciones de Redención", key: "transactionkey" },
    { label: "Monto Redimido", key: "redeemedAmount" },
    { label: "# de Transacciones de Expiración	", key: "expiredTransaction" },
    { label: "Monto Expirado", key: "expiredAmount" },
    { label: "Saldo Disponible en Monedero", key: "availableBalance" },
  ];

  const reviewPeriodFields = () => {
    if (inputStart === "" || inputEnd === "") {
      setActiveToast(true)
      return;
    }

    getData(setData, setTotalPages, 0, 10, inputStart, inputEnd);
    return;
  };

  useEffect(() => {
    getData(setData, setTotalPages, 0, 10);
  }, []);

  useEffect(() => {}, [data]);

  return (
    <div className="App">
      {activeToast && <ToastCustom active={activeToast} setActive={setActiveToast}/>}
      <Card className="w-75 shadow p-3 mb-5 bg-white rounded">
        <Card.Title>Estadistícas del programa de lealtad</Card.Title>
        {data?.length <= 0 && <SpinnerCustom />}
        {data?.length > 0 && (
          <Card.Body>
            <Container className="shadow-sm p-3 mb-2 bg-white rounded">
              <Row>
                <Col sm={8}>
                  Seleccionar periodo: Desde{" "}
                  <input
                    name="from"
                    type="date"
                    min="2000-01-01"
                    step="1"
                    onChange={(e) => setInputStart(e.target.value)}
                  />
                  Hasta{" "}
                  <input
                    name="to"
                    type="date"
                    min="2000-01-01"
                    step="1"
                    onChange={(e) => setInputEnd(e.target.value)}
                  />
                  <Button
                    onClick={() => reviewPeriodFields()}
                    variant="outline-success"
                    size="sm"
                  >
                    Aplicar
                  </Button>
                </Col>
                <Col sm={4} className="row__action--btns">
                  <CSVLink data={generateArrayToCSV(data)} headers={headers}>
                    <Button variant="outline-success" size="sm">
                      Descargar CSV
                    </Button>
                  </CSVLink>
                  <ModalCustom
                    titleButton={"Barras"}
                    title={"Total de transacciones de bonificación"}
                    component={<ChartCustom type={"Bar"} data={data} />}
                  />
                  <ModalCustom
                    titleButton={"Líneas"}
                    title={"Total de transacciones de bonificación"}
                    component={<ChartCustom type={"Line"} data={data} />}
                  />
                </Col>
              </Row>
            </Container>

            <TableCustom data={data} setState={setData} />

            <div>
              <Pagination>
                <PaginationCustom
                  setData={setData}
                  setTotalPages={setTotalPages}
                  totalPages={totalPages}
                  start={inputStart}
                  end={inputEnd}
                />
              </Pagination>
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default App;
