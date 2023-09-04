import { Spacer, Text, Container, Col, Row, Input, Button } from '@nextui-org/react';
import { Select, Option } from '../../styled-component/Select';
import { useForm } from "react-hook-form";
import { ReactComponent as Dollar } from "../../assets/icons/dollar.svg";
import { Checkbox } from 'antd';
import React, { useState } from 'react';


interface Option {
    value: string;
    label: string;
}

interface FormData {
    startDate: string;
    endDate: string;
    capital: number;
    interestRate: number;
    interestProducido: number;
    selectedOption: string;
    tiempoType: string;
    customMonths: number;
    customDays: number;
    customYears: number;
    tiempo: number;
    typeInterest: string;
    // interestProducido: number; 
}

export function InterestSimple() {
    const { register, handleSubmit } = useForm<FormData>();
    const [tiempoType, setTiempoType] = useState('years');
    const [typeInterest, setTypeInterest] = useState('Tipo');

    const options: Option[] = [
        { value: 'annual', label: 'anual' },
        { value: 'bimonthly', label: 'bimestral' },
        { value: 'quarterly', label: 'trimestral' },
        { value: 'semiannual', label: 'semestral' },
        { value: 'months', label: 'mensual' },
    ];

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };


    const [valorFuturo, setValorFuturo] = useState<number | null>(null);
    


    const onSubmit = (data: FormData) => {
        const tasaDecimal = data.interestRate / 100;
        let tiempo = 0;
        let imagen = '';
        switch (tiempoType) {
            case 'years':
                tiempo = (data.customYears / 1) + (data.customMonths / 12) + (data.customDays / 360);
                break;
            case 'months':
                tiempo = (data.customMonths / 12) + (data.customDays / 360);
                break;
            case 'days':
                tiempo = data.customDays / 360;
                break;
            default:
                break;
        }

        if (data.capital && data.interestRate && tiempo) {
            if (isChecked) {
                let nuevoValorFuturo = data.capital * (1 + (tasaDecimal * tiempo));
                setValorFuturo(nuevoValorFuturo);
            } else {
                let nuevoValorFuturo = data.capital * (tasaDecimal * tiempo);
                setValorFuturo(nuevoValorFuturo);
            }
        }
        if (data.interestProducido && data.interestRate && tiempo) {
            let capital = data.interestProducido / (data.interestRate * tiempo) * 100;;
            setValorFuturo(capital);
            imagen = 'src'
        }
        if (data.capital && data.interestProducido && tiempo) {
            let interestRate = data.interestProducido / (data.capital * tiempo) * 100;
            setValorFuturo(interestRate);
        }
        if (data.capital && data.interestProducido && data.interestRate) {
            let time = data.interestProducido / (data.capital * data.interestRate) * 100;
            time = time * 360;
            console.log(time);
            const años = Math.floor(time / 360);
            const díasRestantes = time % 360;
            const meses = Math.floor(díasRestantes / 30);
            const días = Math.round(díasRestantes % 30);
            setValorFuturo(días);
        }
    };

    return (
        <Col css={{ padding: '2rem' }}>
            <Text h1 size={30} color='#ffffff' css={{ letterSpacing: '1px', fontWeight: '$thin', marginTop: '2rem' }}>Calcular Interes Simple</Text>
            <Spacer y={1.2} />
            <Row justify='space-between' css={{ width: '100%' }}>
                <Container css={{ width: '99%', height: '25rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '2rem' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Col>
                            <Col css={{ marginLeft: '2rem' }}>
                                <Row>
                                    <Select
                                        value={tiempoType}
                                        onChange={(e) => setTiempoType(e.target.value)}
                                    >
                                        <Option value="years">Años</Option>
                                        <Option value="months">Meses</Option>
                                        <Option value="days">Días</Option>
                                    </Select>

                                    {tiempoType === 'days' && (
                                        <Row>
                                            <Spacer x={0.6} />
                                            <Input {...register('customDays')} min="0" clearable label="Días" type="number" width="8rem" />
                                        </Row>
                                    )}

                                    {tiempoType === 'months' && (
                                        <Row>
                                            <Spacer x={0.6} />
                                            <Input {...register('customMonths')} min="0" clearable label="Meses" type="number" width="8rem" />
                                            <Spacer x={0.6} />
                                            <Input {...register('customDays')} min="0" max="31" clearable label="Días" type="number" width="8rem" />
                                        </Row>
                                    )}
                                    {tiempoType === 'years' && (
                                        <Row>
                                            <Spacer x={0.6} />
                                            <Input {...register('customYears')} min="0" clearable label="Años" type="number" width="8rem" />
                                            <Spacer x={0.6} />
                                            <Input {...register('customMonths')} min="0" max="11" clearable label="Meses" type="number" width="8rem" />
                                            <Spacer x={0.6} />
                                            <Input {...register('customDays')} min="0" max="31" clearable label="Días" type="number" width="8rem" />
                                        </Row>
                                    )}

                                </Row>
                                <Spacer y={0.7} />
                                <Row style={{ display: 'flex', alignItems: 'center' }}>
                                    <Input {...register("capital")} min="0" clearable label="Capital" type='number' width='20.7rem' />
                                    <Spacer x={2} />
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Calcular Monto Final
                                    </Checkbox>
                                </Row>

                                <Spacer y={0.7} />
                                <Input  {...register("interestRate")} min="0" clearable label="Tasa de interes %" type='number' width='10rem' />
                                <Spacer y={0.7} />
                                <Input  {...register("interestProducido")} min="0" clearable label="Interes producido" type='number' width='10rem' />
                                <Spacer y={1} />
                                <Button color="success" auto type="submit" css={{ fontFamily: 'Didact Gothic', width: '8rem', fontSize: '1rem' }}>
                                    Calcular
                                </Button>
                                
                            </Col>

                        </Col>
                    </form>
                </Container>
                <Spacer x={2} />
                <Col>
                    <Col css={{ width: '70%', height: '13rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '1.2rem', marginBottom: '2.5rem' }}>
                        <Text h1 size={25} css={{ letterSpacing: '1px', fontWeight: '$thin', marginLeft: '5rem' }}>Formula</Text>
                        {/* <img src="src\assets\capital.png" alt="Fórmula" width="50%" height="auto" /> */}
                    </Col>
                    <Col css={{ width: '70%', height: '13rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '1.5rem' }}>
                        <Text h1 size={25} css={{ letterSpacing: '1px', fontWeight: '$thin', marginLeft: '4rem' }}>Resultado</Text>
                        <Spacer y={1} />
                        <Row align='center'>
                            <Dollar/>
                            <Text size={20}>
                                {valorFuturo !== null ? valorFuturo.toFixed(2) : '---'}
                            </Text>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Col>
    );
}