import { Spacer, Text, Container, Col, Row, Input, Button } from '@nextui-org/react';
import { Select, Option } from '../../styled-component/Select';
import { useForm } from "react-hook-form";
import { ReactComponent as Dollar } from "../../assets/icons/dollar.svg";
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
    selectedOption: string;
    tiempoType: string;
    customMonths: number;
    customDays: number;
    customYears: number;
    tiempo: number;
    typeInterest: string;
}

export function InterestSimpleCapital() {
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

    const [valorFuturo, setValorFuturo] = useState<number | null>(null);


    const onSubmit = (data: FormData) => {
        const tasaDecimal = data.interestRate / 100;
        let tiempo = 0;

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
        const capitalFinal = data.capital / (tasaDecimal * tiempo);
        setValorFuturo(capitalFinal);
    };

    return (
        <Col css={{ padding: '2rem' }}>
            <Text h1 size={30} color='#ffffff' css={{ letterSpacing: '1px', fontWeight: '$thin', marginTop: '2rem' }}>Calcular capital</Text>
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
                                            <Input {...register('customDays')} clearable label="Días" type="number" width="8rem" />
                                        </Row>
                                    )}

                                    {tiempoType === 'months' && (
                                        <Row>
                                            <Spacer x={0.6} />
                                            <Input {...register('customMonths')} clearable label="Meses" type="number" width="8rem" />
                                            <Spacer x={0.6} />
                                            <Input {...register('customDays')} clearable label="Días" type="number" width="8rem" />
                                        </Row>
                                    )}
                                    {tiempoType === 'years' && (
                                        <Row>
                                            <Spacer x={0.6} />
                                            <Input {...register('customYears')} clearable label="Años" type="number" width="8rem" />
                                            <Spacer x={0.6} />
                                            <Input {...register('customMonths')} clearable label="Meses" type="number" width="8rem" />
                                            <Spacer x={0.6} />
                                            <Input {...register('customDays')} clearable label="Días" type="number" width="8rem" />
                                        </Row>
                                    )}

                                </Row>
                                <Spacer y={0.7} />
                                <Input  {...register("capital")} clearable label="Interes Producido" type='number' width='20.7rem' />
                                <Spacer y={0.7} />
                                <Row align='center'>
                                    <Input  {...register("interestRate")} clearable label="Tasa de interes" type='number' width='10rem' />
                                    <Spacer x={0.6} />
                                    <Select >
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Row>
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
                        <Text h1 size={20} css={{ letterSpacing: '1px', fontWeight: '$thin', marginLeft: '1rem' }}>Formula</Text>
                    </Col>
                    <Col css={{ width: '70%', height: '13rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '1.5rem' }}>
                        <Text h1 size={20} css={{ letterSpacing: '1px', fontWeight: '$thin', marginLeft: '0.4rem' }}>Resultado</Text>
                        <Spacer y={1} />
                        <Row align='center'>
                            <Dollar />
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