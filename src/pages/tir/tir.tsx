    import { Spacer, Text, Container, Col, Row, Input, Button } from '@nextui-org/react';
    import { Select, Option } from '../../styled-component/Select';
    import { useForm } from 'react-hook-form';
    import { Checkbox } from 'antd';
    import React, { useState } from 'react';
    import { TIR } from '../../domain/TIR'; // Reemplaza 'tu-ruta-al-archivo' con la ruta real

    interface FormData {
    primerPago: number;
    tasaCrecimiento: number;
    tasaInteres: number;
    numeroPeriodos: number;
    }

    export function ComponentTir() {
    const { register, handleSubmit } = useForm<FormData>();
    const [isChecked, setIsChecked] = useState(false);
    const [resultado, setResultado] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imagen, setImagen] = useState<string>('');

    const onSubmit = async (data: FormData) => {
        setResultado(null);
        setError(null);

        // Ajustes necesarios para calcular la TIR
        const flujosDeEfectivo = [-data.primerPago]; // Flujo de efectivo inicial negativo

        try {
        // Ajusta iteraciones y tolerancia según tus necesidades
        const tir = TIR.calcularTIR(flujosDeEfectivo, 0, 5000, 0.0001);

        // Verificar si la TIR ha convergido antes de asignarla al estado
        if (tir !== undefined && !isNaN(tir)) {
            // Actualiza el estado de resultado
            setResultado(tir);
        } else {
            // Manejar el caso donde la TIR no ha convergido o es NaN
            setError('Error al calcular la TIR. Asegúrate de que los datos proporcionados son válidos y que la TIR ha convergido.');
            console.error('La TIR no ha convergido o es NaN');
        }
        } catch (error) {
        // Captura cualquier excepción que pueda ocurrir durante el cálculo
        setError(`Error al calcular la TIR: ${error}`);
        console.error('Error al calcular la TIR:', error);
        }
    };

    return (
        <Col css={{ padding: '2rem' }}>
        <Text h1 size={30} color='#ffffff' css={{ letterSpacing: '1px', fontWeight: '$thin', marginTop: '2rem' }}>Tasa de Interna de Retorno</Text>
        <Spacer y={1.2} />
        <Row justify='space-between' css={{ width: '100%' }}>
            <Container css={{ width: '99%', height: '25rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '2rem' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Col>
                <Col css={{ marginLeft: '2rem' }}>
                    <Spacer y={0.7} />
                    <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                    <Input {...register("primerPago")} min="0" clearable label="Primer Pago" type='number' width='20.7rem' />
                    <Spacer x={2} />
                    <Checkbox
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        style={{ marginLeft: '0.001%' }}
                    >
                        Mostrar monto final
                    </Checkbox>
                    </Row>

                    <Spacer y={0.7} />
                    <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                    <Input  {...register("tasaInteres")} min="0" clearable label="Tasa de interés %" type='double' width='10rem' />
                    <Spacer y={0.7} />
                    <Input  {...register("numeroPeriodos")} min="0" clearable label="Número de periodos" type='double' width='10rem' />
                    </Row>

                    <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                    <Input  {...register("tasaCrecimiento")} min="0" clearable label="Tasa de crecimiento" type='number' width='10rem' />
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
                    <Text>TIR: {resultado * 100}%</Text>
                    </div>
                )}
                {error && (
                    <div>
                    <Text color="red">{error}</Text>
                    </div>
                )}
                </Row>
            </Col>
            </Col>
        </Row>
        </Col>
    );
    }
