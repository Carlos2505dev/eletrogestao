# Engine de energia e gestão

A engine do projeto está concentrada em `src/lib/energy.ts`. Ela contém os modelos de dados, fórmulas, cenários, indicadores financeiros e cálculo da nota de gestão.

## Responsabilidades

A engine:

- define os equipamentos disponíveis;
- separa consumo antes e depois;
- aplica decisões da gestão;
- calcula consumo e custo;
- calcula investimento e retorno;
- compara combinações de decisões;
- gera a nota de gestão.

Ela não renderiza interface e não depende de componentes React.

## Tipos principais

### `Category`

Classifica os equipamentos:

```ts
type Category = "producao" | "climatizacao" | "iluminacao" | "escritorio";
```

### `Equipment`

Representa um equipamento ou conjunto homogêneo de equipamentos:

| Campo | Significado |
| --- | --- |
| `id` | Identificador único |
| `name` | Nome exibido |
| `category` | Categoria operacional |
| `power` | Potência atual em watts |
| `efficientPower` | Potência eficiente equivalente |
| `efficientModel` | Nome do modelo eficiente |
| `replacementCost` | Custo de troca por unidade |
| `quantity` | Quantidade de unidades |
| `hoursPerDay` | Horas ligadas por dia |
| `idleHoursPerDay` | Horas ociosas por dia |
| `daysPerMonth` | Dias trabalhados por mês |
| `wear` | Fração de perda por falta de manutenção |

### `Decisions`

Representa as decisões que podem ser ativadas:

```ts
interface Decisions {
  efficientEquipment: boolean;
  reduceTimePercent: number;
  turnOffIdle: boolean;
  betterPlanning: boolean;
  maintenance: boolean;
}
```

O percentual de redução varia entre 0 e 50.

## Cenário padrão

`NO_DECISIONS` representa o cenário sem mudanças:

- equipamentos atuais;
- nenhuma redução de tempo;
- horas ociosas mantidas;
- planejamento atual;
- perda por manutenção mantida.

## Cálculo de energia

```ts
export function energyKWh(powerW: number, hours: number): number {
  return (powerW * hours) / 1000;
}
```

Recebe potência em watts e tempo em horas e retorna kWh.

## Cálculo do custo

```ts
export function cost(kWh: number, tariff: number): number {
  return kWh * tariff;
}
```

O primeiro valor é o consumo em kWh e o segundo é a tarifa em reais por kWh.

## Estado de um equipamento

`equipmentState(eq, decisions)` calcula:

- potência efetiva;
- horas por mês;
- consumo mensal total.

### Potência efetiva

Sem manutenção, a potência inclui desgaste:

\[
P_{\text{efetiva}}
=
P_{\text{base}}
\times
(1+\text{desgaste})
\]

Com manutenção ativa, o fator de desgaste é eliminado.

Com equipamentos eficientes selecionados, `P_base` passa a ser `efficientPower`.

### Separação de horas ativas e ociosas

\[
h_{\text{ativa}} =
h_{\text{ligada}} - h_{\text{ociosa}}
\]

A redução geral de tempo é aplicada às horas ativas e às horas ociosas. Quando máquinas ociosas são desligadas, as horas ociosas passam a zero.

Para equipamentos de produção, o planejamento reduz em 10% as horas ativas.

As horas mensais são calculadas por:

\[
t_{\text{mês}}
=
(h_{\text{ativa\ depois}} + h_{\text{ociosa\ depois}})
\times
d_{\text{mês}}
\]

## Resultado da simulação

`simulate(equipment, decisions, tariff, maintenanceMonthlyCost)` produz:

- consumo antes;
- consumo depois;
- custo antes;
- custo depois;
- economia bruta;
- investimento;
- custo de manutenção;
- economia líquida;
- tempo de retorno.

### Investimento

O investimento só existe quando a troca por equipamentos eficientes está ativa:

\[
\text{Investimento}
=
\sum(\text{custo de troca} \times \text{quantidade})
\]

### Economia mensal líquida

\[
\text{Economia líquida}
=
(\text{Custo antes}-\text{Custo depois})
-\text{Manutenção mensal}
\]

### Payback

\[
\text{Payback}
=
\frac{\text{Investimento}}{\text{Economia líquida mensal}}
\]

O retorno é exibido somente quando o investimento é maior que zero e a economia líquida é positiva.

## Nota de gestão

`managementScore(...)` avalia uma combinação de decisões por três critérios:

| Critério | Peso máximo |
| --- | ---: |
| Energia | 40 pontos |
| Financeiro | 30 pontos |
| Operação | 30 pontos |

### Energia

Combina:

- piso de 12 pontos por manter a operação;
- até 28 pontos pela redução de kWh em relação às melhores combinações avaliadas.

### Financeiro

Avalia o valor acumulado em um horizonte de 60 meses:

\[
\text{Valor financeiro}
=
\text{Economia líquida mensal}
\times
60
-
\text{Investimento}
\]

O resultado combina:

- piso de 10 pontos por não perder dinheiro;
- até 20 pontos pelo valor acumulado relativo às combinações possíveis.

### Operação

O trabalho útil considera apenas as horas ativas:

\[
\text{Trabalho útil}
=
\text{quantidade}
\times
h_{\text{ativas}}
\times
d_{\text{mês}}
\times
\text{fator de redução de tempo}
\]

O planejamento não reduz esse trabalho útil porque representa uma reorganização que mantém ou melhora a execução da produção.

Uma perda de até 10% é absorvida pela folga operacional. Perdas maiores reduzem a pontuação de operação até o limite de 50%.

## Níveis da nota

| Percentual | Nível |
| ---: | --- |
| 90 a 100 | Gestão exemplar |
| 70 a 89 | Boa gestão |
| 40 a 69 | Gestão regular |
| 0 a 39 | Gestão em risco |

A nota é relativa às combinações permitidas pelo simulador e ao cenário inicial. Ela não é uma certificação técnica ou uma auditoria real.

## Combinações avaliadas

`allDecisionSets()` gera todas as combinações possíveis:

- troca eficiente ativada ou desativada;
- desligamento de ociosos ativado ou desativado;
- planejamento ativado ou desativado;
- manutenção ativada ou desativada;
- redução de tempo em incrementos de 5%, até 50%.
