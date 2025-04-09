const GREEN_COLOR = '#44e657';
const YELLOW_COLOR = '#e4e418';
const RED_COLOR = '#ed4f4f';

export function updateGasChart(chart, value, ...limites) {
    if (!chart) {
        return
    }

    const [verde, amarelo, vermelho] = limites

    let color = GREEN_COLOR;
    chart.data.datasets[0].data[0] = Number(value);
    chart.data.datasets[0].data[1] = 1024 > value ? 1024 - Number(value) : 0;
    
    if (value > verde ) color = YELLOW_COLOR;
    if (value >= vermelho ) color = RED_COLOR;
  
    chart.data.datasets[0].backgroundColor[0] = color;
    
    chart.update()
}



export function updateChartSensorsValue(chart, value, label='MQ-2') {
    if (!chart) {
        return
    }
    const position = chart.data.labels.indexOf(label)
  
    if ( position === -1 || !isFinite(value)) return;
    
    chart.data.datasets.forEach((dataset) => {
        dataset.data[position] = Number(value);
    });
  
    chart.update()
}