import { Row,Text,Col} from '@nextui-org/react';
import Image from "../assets/image/men.png";
// import capitalImage from '../assets/image/capital.png';
import { ReactComponent as Grap } from "../assets/icons/grap.svg";


export default function Home (){
    return(
    <Row css={{height:'100%'}}>
        <img
            src={Image}
            alt="imag"
            style={{ width: "30%", height: "auto", marginTop: "15%" , marginLeft:'11%'}}
        />
       <Col css={{marginTop:'10%',marginLeft:'3.5%',width:'80%'}}>
        <Text   size={60} css={{marginBottom:'0',fontWeight:'$extrabold'}}>Explora el Mundo Financiero
        <Grap style={{color:"#ffffff"}}/>
        </Text>
        <Text   size={20} css={{marginTop:'3%',width:'80%'}}> Explora las finanzas desde lo básico hasta las estrategias avanzadas. Domina el manejo del dinero y toma decisiones financieras más inteligentes con nuestra plataforma educativa de confianza.</Text>
        </Col>
    </Row>);
}