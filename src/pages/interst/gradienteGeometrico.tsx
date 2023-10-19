import { Spacer, Text, Container, Col, Row, Input, Button } from '@nextui-org/react';
import { Select, Option } from '../../styled-component/Select';
import { useForm } from "react-hook-form";
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
        { value: 'valorPresente', label: 'Valor Presente' },
        { value: 'valorPresenteAnticipado', label: 'Valor Presente Anticipado' },
        { value: 'valorFuturo', label: 'Valor Futuro' },
        { value: 'valorFuturoAnticipado', label: 'Valor Futuro Anticipado' },
        { value: 'valorPresenteInfinito', label: 'Valor presente Infinito' }
    ];

    const { register, handleSubmit } = useForm<FormData>();

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };


    const [resultado, setResultado] = useState<number | null>(null);
    const [valorCapital, setValorCapital] = useState<number | null>(null);
    const [timeC, setTimeC] = useState<{ años: number; meses: number; días: number } | null>(null);
    const [imagen, setImagen] = useState<string>('');

    const [selectedOption, setSelectedOption] = useState('valorPresente'); // Estado para la opción seleccionada
    const [selectedOptions, setSelectedOptions] = useState('mensual'); // Estado para la opción seleccionada

    const handleOptionChange = (selectedValue: string) => {
        setSelectedOption(selectedValue);
    };

    const onSubmit = (data: FormData) => {
        setResultado(null);
        setTimeC(null);

        const tasaInteresDecimal = data.tasaInteres / 100; // Convertir la tasa de interés a decimal
        const tasaCrecimientoDecimal = data.tasaCrecimiento / 100;
        let resultado = null;

        if (selectedOption === 'valorPresente') {
            resultado = GradienteGeometrico.calcularValorPresenteGradienteGeometrico(
                data.primerPago,
                tasaInteresDecimal,
                tasaCrecimientoDecimal,
                data.numeroPeriodos,
               
            );
        } else if (selectedOption === 'valorFuturo') {
            resultado = GradienteGeometrico.calcularValorFuturoGradienteGeometrico(
                data.primerPago,
                tasaInteresDecimal,
                tasaCrecimientoDecimal,
                data.numeroPeriodos,
            );
        } else if (selectedOption === 'valorPresenteInfinito') {
            resultado = GradienteGeometrico.calcularValorPresenteGradienteGeometricoInfinito (
                data.primerPago,
                tasaInteresDecimal,
                tasaCrecimientoDecimal
            );
        }

        // Actualiza el estado de resultado
        setResultado(resultado);
    };

    return (
        <Col css={{ padding: '2rem' }}>
            <Text h1 size={30} color='#ffffff' css={{ letterSpacing: '1px', fontWeight: '$thin', marginTop: '2rem' }}>Gradiente Geometrico</Text>
            <Spacer y={1.2} />
            <Row justify='space-between' css={{ width: '100%' }}>
                <Container css={{ width: '99%', height: '25rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '2rem' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Col>
                            <Col css={{ marginLeft: '2rem' }}>
                                <Row>
                                <Select
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    >   <Option value="Default">elija una opcion</Option>
                                        <Option value="valorPresente">Valor Presente</Option>

                                        <Option value="valorFuturo">Valor Futuro</Option>
                                        <Option value="valorPresenteInfinito">Valor Presente Infinito</Option>
                                       
                                    </Select>

                                    <Spacer x={0.6} />
                                    {/* <Select >
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select> */}
                                    
                                    <Spacer x={0.6} />
                                   
                                </Row>
                                <Spacer y={0.7} />
                                <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <Input {...register("primerPago")} min="0" clearable label="primer pago" type='number' width='20.7rem' />
                                    <Spacer x={2} />
                                    {/* <Checkbox
                                        checked={isChecked}
                                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                                        style={{ marginLeft: '0.001%' }}
                                    >
                                        Mostrar monto final
                                    </Checkbox> */}
                                </Row>

                                <Spacer y={0.7} />
                                <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <Input  {...register("tasaInteres")} min="0" clearable label="Tasa de interes %" type='double' width='10rem' />
                                    <Spacer y={0.7} />
                                    <Input  {...register("numeroPeriodos")} min="0" clearable label="Numero periodos" type='double' width='10rem' />
                                </Row>
                                <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <Input  {...register("tasaCrecimiento")} min="0" clearable label="Tasa de crecimiento" type='number' width='10rem' />
                                    <Spacer y={1} />
                                    <Select
                                        value={selectedOptions}
                                        onChange={(e) => setSelectedOptions(e.target.value)}
                                    >   
                                        {/* <Option value="Default">elija una opcion</Option> */}
                                        <Option value="mensual">Mensual</Option>
                                        <Option value="trimestral">Trimestral</Option>
                                        <Option value="semestral">Semestral</Option>
                                        <Option value="Anual">Anual</Option>
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
                            {resultado !== null && (
                                <div>
                                    <Text>Valor de la maquina: {resultado}</Text>
                                    {/* Valor Futuro es el resultado del cálculo */}
                                </div>
                            )}
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Col>
    );
}