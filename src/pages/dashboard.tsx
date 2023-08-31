import React from 'react';
import '../app.css';
import { ReactComponent as Logo} from "../assets/icons/logoPrincipal.svg";
import { DropdownNative } from '../components/Dropdown';
import { Items } from '../components/Dropdown';
import { Spacer,Col,Row,Container} from '@nextui-org/react';
import { Outlet } from "react-router-dom";

 function Dashboard() {

  const listInterest: Items[] = [
    { key: 'interestSimple', name: 'Calcular el interes',route:'interest-simple/' },
    { key: 'interestSimpleMf', name: 'Calcular el monto final',route:'interest-simple/monto-final/' },
    { key: 'interestSimpleCapital', name: 'Calcular el Capital',route:'interest-simple/capital/' },
    { key: 'interestSimpleTasaInteres', name: 'Calcular la tasa de interes',route:'interest-simple/tasa-de-interes/' },
    { key: 'interestSimpleTiempoInvertido', name: 'Calcular tiempo de inversion',route:'interest-simple/tiempo-invertido/' },
    { key: 'interestCompound', name: 'Interes Compuesto',route:'interest-compound/' },
  ];
  const listSecond: Items[] = [
    { key: '1', name: 'Primer ejercicio', route:'' },
    { key: '2', name: 'Segundo ejercicio', route:'' },
  ];

  const listThird: Items[] = [
    { key: '1', name: 'Primer ejercicio', route:'' },
    { key: '2', name: 'Segundo ejercicio', route:'' },
  ];
  return (
    <div className="App">
      <Col css={{backgroundColor:'#ffffff',width: '25%',height:'100vh',borderTopRightRadius:'2rem',
      borderBottomRightRadius:'2rem'}}>
        <Row align='center' css={{marginLeft:'3rem',marginTop:'2rem',marginBottom:'3rem'}} >
        <Logo/>
        <p className='NameLogo'>economicapp</p>
        </Row>
        <Col css={{justifyItems:'center', marginLeft:'1.5rem'}}>
          <DropdownNative items={listInterest} title='Consultar Interes Simple'/>
          <Spacer y={3}/>
          <DropdownNative items={listSecond} title='Consultas segundo corte'/>
          <Spacer y={3}/>
          <DropdownNative items={listThird} title='Consultar tercer corte'/>
        </Col>
      </Col>
      <Container css={{ height: "100%", width: "75%", overflow: "hidden" ,margin:'0 auto'}}>
          <Outlet />
      </Container>
    </div>
  );
}

export default Dashboard;
