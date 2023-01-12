import { sensors } from "./chart";
import { leaksLGP } from "./chart";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const GREEN_COLOR = '#44e657';
const YELLOW_COLOR = '#e4e418';
const RED_COLOR = '#ed4f4f';

const firebaseConfig = {
  apiKey: "AIzaSyAeW-oRdds8R8GpJ08isjYwxD24yH9h8-I",
  authDomain: "sensor-mqs.firebaseapp.com",
  databaseURL: "https://sensor-mqs-default-rtdb.firebaseio.com",
  projectId: "sensor-mqs",
  storageBucket: "sensor-mqs.appspot.com",
  messagingSenderId: "648901119376",
  appId: "1:648901119376:web:97eb7af0816cd1a08b7715"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

const sensorsChart = new Chart(sensors.ctx, sensors.config);
const leaksChart = new Chart(leaksLGP.ctx, leaksLGP.config);

const sensorsInfo = [
  {chartLabel:'MQ-2', firebasePath: '/MQ2 Sensor/Valor'}, 
  {chartLabel:'MQ-8', firebasePath: '/MQ8 Sensor/Valor'}, 
  {chartLabel:'MQ-9', firebasePath: '/MQ9 Sensor/Valor'},
];

sensorsInfo.forEach((s) => {

  const path = ref(database,  s.firebasePath);

  onValue(path, (response) => {
    const data = response.val();
    updateChartSensorsValue(sensorsChart, data, s.chartLabel);
  });
});

onValue(ref(database,  '/MQ2 Sensor/Valor'), (response) => {
  const data = response.val();
  updateGasValue(leaksChart, data);
});




function updateChartSensorsValue(chart, value, label='MQ-2') {
  const position = chart.data.labels.indexOf(label)

  if ( position === -1 || !isFinite(value)) return

  chart.data.datasets.forEach((dataset) => {
      dataset.data[position] = Number(value);
  });

  chart.update()
}

function updateGasValue(chart, value) {

  let color = GREEN_COLOR;
  chart.data.datasets[0].data[0] = Number(value);
  chart.data.datasets[0].data[1] = 1023 - Number(value);

  if (value > 300) color = YELLOW_COLOR;
  if (value > 650) color = RED_COLOR;

  chart.data.datasets[0].backgroundColor[0] = color;
  
  chart.update()
}