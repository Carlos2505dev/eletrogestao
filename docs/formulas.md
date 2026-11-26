# Fórmulas de consumo e custo

A aplicação usa duas fórmulas básicas para transformar dados físicos em indicadores de gestão.

## Fórmula do consumo de energia

\[
E = \frac{P \times t}{1000}
\]

Onde:

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| `E` | Energia consumida | kWh |
| `P` | Potência do equipamento | W |
| `t` | Tempo de funcionamento | h |

A potência em watts é multiplicada pelo tempo em horas. O resultado é dividido por 1000 porque:

\[
1000\ W = 1\ kW
\]

## Fórmula do custo

\[
\text{Custo} = \text{Consumo em kWh} \times \text{Tarifa}
\]

A tarifa representa o preço cobrado por cada kWh. Neste projeto, ela é informada em reais por kWh.

Exemplo:

\[
2640\ kWh \times R\$\,0{,}92/kWh = R\$\,2428{,}80
\]

## Cálculo mensal

Quando o tempo é informado por dia e por mês, a aplicação usa:

\[
t_{\text{mês}} = t_{\text{dia}} \times d_{\text{mês}}
\]

Onde `d_mês` é o número de dias trabalhados no mês.

Exemplo de um motor:

- potência: 7.500 W;
- funcionamento: 16 horas por dia;
- período: 22 dias por mês;
- quantidade: 1 unidade.

```text
t = 16 × 22 = 352 horas
E = (7.500 × 352) / 1000
E = 2.640 kWh
```

Com tarifa de R$ 0,92 por kWh:

```text
Custo = 2.640 × 0,92
Custo = R$ 2.428,80
```

## Horas em equipamentos com quantidade maior que 1

O consumo total de um grupo de equipamentos considera a quantidade:

\[
E_{\text{total}}
=
\frac{P \times t_{\text{mês}}}{1000}
\times
q
\]

Onde `q` é a quantidade de unidades.

## Fatores que alteram o consumo

### Potência `P`

Pode ser reduzida por:

- troca por equipamentos eficientes;
- manutenção que elimina perdas por desgaste.

### Tempo `t`

Pode ser reduzido por:

- menor tempo diário de funcionamento;
- desligamento de máquinas ociosas;
- planejamento que conclui o trabalho em menos horas.

### Interpretação gerencial

Uma decisão só deve ser considerada vantajosa quando o valor econômico produzido compensa custos adicionais, como aquisição de equipamentos ou manutenção.

## Exemplo no código

As fórmulas são implementadas em `src/lib/energy.ts`:

```ts
import { cost, energyKWh } from "@/lib/energy";

const consumo = energyKWh(7500, 352);
const custo = cost(consumo, 0.92);
```

## Limitações

- Impostos, bandeiras tarifárias e contratos específicos não são modelados em detalhe.
- As potências são valores simplificados de uma empresa fictícia.
- O cálculo não substitui uma medição elétrica profissional.
- O objetivo é didático e gerencial.
