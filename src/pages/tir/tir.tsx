    import { Spacer, Text, Container, Col, Row, Input, Button } from '@nextui-org/react';
    import { useForm } from 'react-hook-form';
    import { Checkbox } from 'antd';
    import React, { useState } from 'react';
    import { TIR } from '../../domain/TIR';

    interface FormData {
    primerPago: number;
    tasaCrecimiento: number;
    tasaInteres: number;
    numeroPeriodos: number;
    primerFlujo: number;
    segundoFlujo: number;
    tercerFlujo: number;
    cuartoFlujo: number;
    quintoFlujo: number;
    sextoFlujo: number;
    }


    export function ComponentTir() {
    const { register, handleSubmit } = useForm<FormData>();
    const [isChecked, setIsChecked] = useState(false);
    const [resultado, setResultado] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setmessage] =useState<string | null>(null);
    const [mostrar,setMostrar]= useState(true);
    const [resultadoInteres, setResultadoInteres] = useState<number | null>(null);

    const onSubmit = async (data: FormData) => {
        setResultado(null);
        setError(null);
        const flujosDeEfectivo = -data.primerPago;
      
        try {
        if(data.primerPago && data.primerFlujo && data.segundoFlujo){
            const tir = TIR.calcularTir(flujosDeEfectivo,data);
            if(tir < 0 ){
                setmessage('El proyecto se rechaza. La razón es que el proyecto da una rentabilidad menor que la rentabilidad mínima requerida.');
            }
            if(tir === 0){
                setmessage('En este caso sería indiferente realizar el proyecto, ya que ni ganamos ni perdemos.');
            }
            if (tir !== undefined && !isNaN(tir)) {
                setResultado(tir);
                setResultadoInteres(TIR.calcularInteresRetorno(data,flujosDeEfectivo,tir));
            } else {
                setError('Error al calcular la TIR. Asegúrate de que los datos proporcionados son válidos y que la TIR ha convergido.');
                console.error('La TIR no ha convergido o es NaN');
            }

        }
        } catch (error) {
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
                    <Row justify='space-between' style={{width:'90%'}}>
                    <Input  {...register("primerFlujo")} min="0" clearable label="Primer flujo" type='double' width='6rem' />
                    <Input  {...register("segundoFlujo")} min="0" clearable label="Segundo flujo" type='double' width='6rem' />
                    <Input  {...register("tercerFlujo")} min="0" clearable label="Tercer flujo" type='double' width='6rem' />
                    <Input  {...register("cuartoFlujo")} min="0" clearable label="Cuarto flujo" type='double' width='6rem' />
                    </Row>
                    {mostrar ? (
                        <Row justify='space-between' style={{width:'43%'}}>
                        <Input  {...register("quintoFlujo")} min="0" clearable label="Quinto flujo" type='double' width='6rem' />
                        <Input  {...register("sextoFlujo")} min="0" clearable label="Sexto flujo" type='double' width='6rem' />
                        </Row>
                    ): <Spacer y={0.01} />
                    }
                    <Spacer y={0.7} />
                    <Row style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                    <Input  {...register("tasaInteres")} min="0" clearable label="Tasa de interés %" type='double' width='10rem' />
                    <Spacer y={0.7} />
                    <Input  {...register("numeroPeriodos")} min="0" clearable label="Número de periodos" type='double' width='10rem' />
                    </Row>
                    <Spacer y={0.7} />
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
                <Text h1 size={20} css={{ letterSpacing: '1px', fontWeight: '$bold' }}>Numero de TIR</Text>
                {resultado !== null && (
                    <div>
                    <Text>TIR: {resultado }</Text>
                    </div>
                )}
                {error && (
                    <div>
                    <Text color="red">{error}</Text>
                    </div>
                )}
                {message  && (
                    <div>
                    <Text color="red">{message}</Text>
                    </div>
                )
                }
            </Col>
            <Col css={{ width: '70%', height: '13rem', backgroundColor: '#ffffff', borderRadius: '2rem', padding: '10% 8%' }}>
                <Text h1 size={20} css={{ letterSpacing: '1px', fontWeight: '$bold' }}>Resultado</Text>
                <Spacer y={1} />
                {resultadoInteres  && (
                    <div>
                    <Text >{resultadoInteres}</Text>
                    </div>
                )
                }
            </Col>
            </Col>
        </Row>
        </Col>
    );
    }
