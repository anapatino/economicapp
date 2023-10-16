import { Spacer, Text, Container, Col, Row, Input, Button } from '@nextui-org/react';
import { Select, Option } from '../../styled-component/Select';
import { useForm } from "react-hook-form";

import capitalImage from '../../assets/image/capital.png';
import capitalFinalImage from '../../assets/image/capitalFinal.png';
import tiempoImage from '../../assets/image/tiempo.png';
import interesProducidoImage from '../../assets/image/interesProducido.png';
import tasaInteresImage from '../../assets/image/tasaInteres.png';
import { Checkbox } from 'antd';
import { InterestSimple } from '../../domain/InterestSimple';
import { GradienteGeometrico } from '../../domain/GradienteGeometrico';
import React, { useState } from 'react';
import { GradienteAritmetico } from '../../domain/GradienteAritmetico';


interface Option {
    value: string;
    label: string;
}
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

    primerPago: number;
    tasaCrecimiento: number;
    tasaInteres: number;
    numeroPeriodos: number;
}

export function ComponentGradienteGeometrico() {
    const options: Option[] = [
        { value: 'annual', label: 'anual' },
        { value: 'bimonthly', label: 'bimestral' },
        { value: 'quarterly', label: 'trimestral' },
        { value: 'semiannual', label: 'semestral' },
        { value: 'months', label: 'mensual' },
    ];

    const { register, handleSubmit } = useForm<FormData>();
    const [tiempoType, setTiempoType] = useState('years');

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };


    const [valorFuturo, setValorFuturo] = useState<number | null>(null);
    const [valorCapital, setValorCapital] = useState<number | null>(null);
    const [timeC, setTimeC] = useState<{ años: number; meses: number; días: number } | null>(null);
    const [imagen, setImagen] = useState<string>('');

    const onSubmit = (data: FormData) => {
        setValorFuturo(null);
        setTimeC(null);
        let tiempo = 0;

        let filledFields = 0; // Contador de campos llenos


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
        const valorPresente = GradienteGeometrico.calcularValorPresenteGradienteGeometrico(
            data.primerPago,
            data.tasaCrecimiento,
            data.tasaInteres,
            data.numeroPeriodos
        );
        const valorFuturo = GradienteGeometrico.calcularValorFuturoGradienteGeometrico(
            data.primerPago,
            data.tasaCrecimiento,
            data.tasaInteres,
            data.numeroPeriodos
        );

        setValorFuturo(valorFuturo);
        setValorCapital(valorPresente);

        




    };
    // console.log(valorFuturo);
    return (
        <Col css={{ padding: '2rem' }}>
            <Text h1 size={30} color='#ffffff' css={{ letterSpacing: '1px', fontWeight: '$thin', marginTop: '2rem' }}>Gradiente Aritmetico</Text>
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

                                            <Input {...register('customYears')} min="0" clearable label="Años" type="number" width="8rem" defaultValue={0} />
                                        ) : ""}
                                        <Spacer x={0.6} />
                                        {tiempoType === 'months' || tiempoType === 'years' ? (
                                            <Input {...register('customMonths')} min="0" clearable label="Meses" type="number" width="8rem" defaultValue={0} />
                                        ) : ""}
                                        <Spacer x={0.6} />
                                        {tiempoType === 'months' || tiempoType === 'days' || tiempoType === 'years' ? (
                                            <Input {...register('customDays')} min="0" clearable label="Días" type="number" width="8rem" defaultValue={0} />
                                        ) : ""}
                                    </Row>
                                </Row>
                                <Spacer y={0.7} />
                                <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <Input {...register("primerPago")} min="0" clearable label="primer pago" type='number' width='20.7rem' />
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
                                <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <Input  {...register("tasaInteres")} min="0" clearable label="Tasa de interes %" type='double' width='10rem' />
                                    <Spacer y={0.7} />
                                    <Input  {...register("numeroPeriodos")} min="0" clearable label="numeroPeriodos" type='double' width='10rem' />
                                </Row>
                                <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <Input  {...register("tasaCrecimiento")} min="0" clearable label="Tasa de crecimiento" type='number' width='10rem' />
                                    <Spacer y={1} />
                                    <Select >
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select></Row>
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
                    <Col css={{ width: '70%', height: '13rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '5% 8%', marginBottom: '2.5rem' }}>
                        <Text h1 size={20} css={{ letterSpacing: '1px', fontWeight: '$bold' }}>Formula</Text>
                        {<img
                            src={imagen}
                            style={{ width: "100%", height: "auto", marginTop: "0%", marginLeft: '0%' }}
                        />}
                    </Col>
                    <Col css={{ width: '70%', height: '13rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '10% 8%' }}>
                        <Text h1 size={20} css={{ letterSpacing: '1px', fontWeight: '$bold' }}>Resultado</Text>
                        <Spacer y={1} />
                        <Row align='center'>
                            {valorFuturo !== null && (
                                <div>
                                    <Text>Valor Futuro: {valorFuturo}</Text>
                                    <Text>Valor Presente: {valorCapital}</Text>
                                </div>
                            )}
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Col>
    );
}