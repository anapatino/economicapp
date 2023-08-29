import { Text,Dropdown,Spacer} from '@nextui-org/react';
import { ReactComponent as Diagram} from "../assets/icons/diagram.svg";
import { ReactComponent as Money} from "../assets/icons/money_send.svg";
import { ReactComponent as Chart} from "../assets/icons/chart.svg";
import { useNavigate } from "react-router-dom";


export interface Items {
    key:string,
    name: string;
    route: string;

}

export interface ListComponents {
    title: string,
    items: Items[];
}

export function DropdownNative (props:ListComponents){

    const navigate = useNavigate();

    const handleMenuItemClick = (item: Items) => {
        if (item.route) {
          navigate(item.route);
        }
    };
    
    return (
        <Dropdown>
        <Dropdown.Button color="default" light css={{width:'5rem'}}>
        <div className='icon'>
        { props.title === "Consultar interes" ? <Diagram/> : props.title === "Consultas segundo corte" ? <Money/> : <Chart/> } 
       </div>
        <Spacer x={0.5}/>
        <Text  css={{ fontSize:'1.1rem',fontFamily:'Didact Gothic'}} >{props.title}</Text>
         </Dropdown.Button>
        <Dropdown.Menu
          color="default"
          variant="light"
          aria-label="Actions"
          onAction={(e) => {
            // `e` contiene información sobre el elemento seleccionado
            const selectedItem = props.items.find(item => item.key === e);
            if (selectedItem) {
              handleMenuItemClick(selectedItem);
            }
          }}
        >
         {props.items.map((item) => (
            <Dropdown.Item  css={{letterSpacing:'1px'}}  key={item.key}>{item.name} </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    );
}