# Documentação do simulador

O simulador permite comparar o consumo elétrico e o custo de uma empresa fictícia antes e depois de decisões de gestão.

## Cenário inicial

A tela começa com equipamentos predefinidos:

- motor de esteira;
- compressor de ar;
- forno industrial;
- ar-condicionado split;
- lâmpadas do galpão;
- computadores.

Cada equipamento possui potência atual, potência eficiente, custo de troca, quantidade, horas por dia, horas ociosas por dia, dias trabalhados por mês e perda por desgaste.

## Decisões disponíveis

### Trocar por modelos eficientes

Substitui a potência atual pela potência do modelo eficiente informado para o equipamento.

Também calcula o investimento necessário com base no custo de troca e na quantidade de unidades.

### Reduzir o tempo de funcionamento

Permite reduzir o tempo de todos os equipamentos em incrementos de 5%, entre 5% e 50%.

A redução inicial ao ativar a decisão é de 15%.

### Desligar máquinas ociosas

Remove do cálculo as horas que o equipamento fica ligado sem produzir.

O sistema separa:

- horas ativas;
- horas ociosas;
- horas ligadas por dia.

### Melhorar o planejamento da produção

Reduz em 10% as horas ativas dos equipamentos classificados como produção.

O tempo útil da produção não é reduzido pela justificativa didática de que lotes consolidados eliminam retrabalho e ociosidade interna.

### Investir em manutenção

Elimina a perda por desgaste usada no cálculo. Quando ativada, permite informar o custo mensal do contrato de manutenção.

O custo informado é descontado da economia gerada pela conta elétrica.

## Tarifas e custos

A tarifa padrão é R$ 0,92 por kWh. Ela pode ser alterada manualmente no painel de decisões.

O custo mensal de manutenção pode ser informado separadamente.

## Indicadores exibidos

### Consumo antes

Soma o consumo mensal de todos os equipamentos sem decisões aplicadas.

### Consumo depois

Soma o consumo após a combinação de decisões escolhida.

### Redução do consumo

Calculada por:

\[
\text{Redução (\%)}
=
\left(1-\frac{E_{\text{depois}}}{E_{\text{antes}}}\right)\times100
\]

### Economia líquida

A economia mensal na conta é descontada pelo custo mensal da manutenção:

\[
\text{Economia líquida}
=
\text{Economia na conta}
-
\text{Custo da manutenção}
\]

O mesmo valor pode ser multiplicado por 12 para estimar a economia anual.

### Retorno do investimento

Quando existe troca de equipamentos e a economia líquida é positiva:

\[
\text{Retorno (meses)}
=
\frac{\text{Investimento}}{\text{Economia líquida mensal}}
\]

Se não houver investimento, o indicador não é aplicado. Caso o investimento exista, mas não haja retorno positivo, a interface informa que não há retorno.

## Gráfico comparativo

Um gráfico de barras apresenta o consumo mensal antes e depois para cada equipamento.

Os nomes exibidos usam a primeira palavra do nome de cada equipamento. Os valores são arredondados para kWh inteiros na apresentação.

## Planilha de equipamentos

A planilha permite editar:

- quantidade;
- horas ligadas por dia.

Os campos limitam automaticamente:

- quantidade mínima: 0;
- quantidade inteira;
- horas por dia entre 0 e 24.

Ao clicar em uma linha, o sistema seleciona o equipamento cuja memória de cálculo será mostrada abaixo da planilha.

## Memória de cálculo

Para o equipamento selecionado, o simulador mostra:

- potência efetiva antes e depois;
- horas por mês antes e depois;
- consumo antes e depois;
- custo antes e depois;
- quantidade de unidades;
- perda por desgaste;
- modelo eficiente, quando aplicável.

Cada memória usa:

```text
E = (P × t / 1000) × quantidade
Custo = E × tarifa
```

## Restaurar cenário

O botão **Restaurar cenário** redefine:

- equipamentos;
- decisões;
- tarifa;
- custo da manutenção;
- nota calculada.

## Verificar análise

Ao clicar em **Verificar análise**, o sistema calcula uma nota gerencial baseada em:

- redução de energia;
- valor financeiro acumulado;
- preservação da operação.

Se o usuário alterar as escolhas depois da verificação, a interface informa que a análise está desatualizada e deve ser recalculada.

## Fluxo de uso

```text
Escolher decisões
    ↓
Configurar tarifa e manutenção
    ↓
Alterar equipamentos na planilha
    ↓
Calcular consumo antes e depois
    ↓
Verificar economia e payback
    ↓
Consultar memória de cálculo
    ↓
Verificar nota gerencial
```
