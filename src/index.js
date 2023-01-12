import { chartConfig, updateChartValue } from "./chart";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

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

const chart = new Chart(chartConfig.ctx, chartConfig.config);

const fields = [
  {chartLabel:'MQ-2', firebasePath: '/MQ2 Sensor/Valor'}, 
  {chartLabel:'MQ-8', firebasePath: '/MQ8 Sensor/Valor'}, 
  {chartLabel:'MQ-9', firebasePath: '/MQ9 Sensor/Valor'},
];

fields.forEach((field) => {

  const path = ref(database,  field.firebasePath);

  onValue(path, (response) => {
    const data = response.val();
    console.log({data}, field.chartLabel);
    updateChartValue(chart, data, field.chartLabel);
  });
});