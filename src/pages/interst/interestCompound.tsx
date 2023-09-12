import { Spacer, Text, Container, Col, Row, Input, Button } from '@nextui-org/react';
import { Select, Option } from '../../styled-component/Select';
import { useForm } from "react-hook-form";
import { ReactComponent as Dollar } from "../../assets/icons/dollar.svg";
import { Checkbox } from 'antd';
import { InterestCompound as IC } from '../../domain/InterestCompoundC';
import React, { useState } from 'react';


interface FormData {
    startDate: string;
    endDate: string;
    capital: number;
    interestRate: number;
    interestEarned: number;
    selectedOption: string;
    tiempoType: string;
    customMonths: number;
    customDays: number;
    customYears: number;
    tiempo: number;
    typeInterest: string;
}
export function InterestCompound() {
    const { register, handleSubmit } = useForm<FormData>();
    const [tiempoType, setTiempoType] = useState('years');

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };


    const [valorFuturo, setValorFuturo] = useState<number | null>(null);

    const onSubmit = (data: FormData) => {
        let tiempo = 0;
        switch (tiempoType) {
            case 'years':
                tiempo = (data.customYears / 1) + (data.customMonths / 12) + (data.customDays / 365);
                break;
            case 'months':
                tiempo = (data.customMonths / 12) + (data.customDays / 365);
                break;
            case 'days':
                tiempo = data.customDays / 365;
                break;
            default:
                break;
        }

        if (tiempo > 0) {
            if (data.capital && data.interestRate) {
                const interestData = {
                    capital: data.capital,
                    interestRate: data.interestRate,
                };
                setValorFuturo(IC.calculateInterestEarned(interestData, tiempo));
            }

            if (data.interestEarned && data.interestRate) {
                const timeData = {
                    futureValue: data.interestEarned,
                    interestRate: data.interestRate,
                };
                setValorFuturo(IC.calculateInitialInvestment(timeData, tiempo));
            }

            if (data.capital && data.interestRate && data.interestEarned) {
                const interestData = {
                    capital: data.capital,
                    futureValue: data.interestEarned,
                };
                setValorFuturo(IC.calculateInterestRate(interestData, tiempo));
            }
        } else {
            // Manejar caso de condiciones no válidas, por ejemplo, mostrar un mensaje de error.
            console.error("Las condiciones ingresadas no son válidas para realizar los cálculos de interés compuesto.");
        }
    };

    return (
        <Col css={{ padding: '2rem' }}>
            <Text h1 size={30} color='#ffffff' css={{ letterSpacing: '1px', fontWeight: '$thin', marginTop: '2rem' }}>Calcular Interes Compuesto</Text>
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
                                    <Spacer x={0.6} />
                                    <Row>
                                        {tiempoType === 'years' ? (
                                            <Input {...register('customYears')} min="0" clearable label="Años" type="number" width="8rem" />
                                        ) : ""}
                                        <Spacer x={0.6} />
                                        {tiempoType === 'months' || tiempoType === 'years' ? (
                                            <Input {...register('customMonths')} min="0" max="96" clearable label="Meses" type="number" width="8rem" />
                                        ) : ""}
                                        <Spacer x={0.6} />
                                        {tiempoType === 'months' || tiempoType === 'days' || tiempoType === 'years' ? (
                                            <Input {...register('customDays')} min="0" max="365" clearable label="Días" type="number" width="8rem" />
                                        ) : ""}
                                    </Row>
                                </Row>
                                <Spacer y={0.7} />
                                <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <Input {...register("capital")} min="0" clearable label="Capital" type='number' width='20.7rem' />
                                    <Spacer x={2} />
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                                        style={{ marginLeft: '0.001%' }}
                                    >
                                        Mostrar monto final
                                    </Checkbox>
                                </Row>

                                <Spacer y={0.7} />
                                <Input  {...register("interestRate")} min="0" clearable label="Tasa de interes %" type='double' width='10rem' />
                                <Spacer y={0.7} />
                                <Input  {...register("interestEarned")} min="0" clearable label="Interes producido" type='number' width='10rem' />
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
                    <Col css={{ width: '70%', height: '13rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '10% 8%', marginBottom: '2.5rem' }}>
                        <Text h1 size={20} css={{ letterSpacing: '1px', fontWeight: '$bold' }}>Formula</Text>
                        {/* <img src="src\assets\capital.png" alt="Fórmula" width="50%" height="auto" /> */}
                    </Col>
                    <Col css={{ width: '70%', height: '13rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '10% 8%' }}>
                        <Text h1 size={20} css={{ letterSpacing: '1px', fontWeight: '$bold' }}>Resultado</Text>
                        <Spacer y={1} />
                        <Row align='center'>
                            <Dollar />
                            <Spacer x={1} />
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