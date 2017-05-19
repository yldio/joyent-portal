import faker from 'faker';

const numberOfDates = 25;
const maxIncrementValue = 200;
const maxFluctuation = 500;

let numStateIncreaser = 0;
let numStateDecreaser = 5000;
let numStateFluctuate = 0;
let increaseMode = true;

/* ############################## */
/* ### GENERATE A DATA RANGE ###  */
/* ############################## */
const generateDates = (
  date = '2017-01-01'
) => {
  let date2 = new Date(date);
  let day;
  let date1 = new Date();
  let datesBetween = [date1];

  while ( date2 <= date1 ) {
    day = date1.getDate()
    date1 = new Date(date1.setDate(--day));
    datesBetween.push(date1);
  }

  return datesBetween
};

const sets = {
  "median": [],
  "third_quartile": [],
  "first_quartile": [],
};

let data = {
  'random': { ...sets },
  'increase': { ...sets },
  'decrease': { ...sets },
  'fluctuate': { ...sets }
}

/* ############################## */
/* #### CREATE DATA ARRAYS #####  */
/* ############################## */
for ( let i = 0; i < numberOfDates; i++ ) {

  const randomNum = () => faker.random.number();
  const increaseNum = () => {
    const newRandom = numStateIncreaser = faker.random.number({
      min: numStateIncreaser,
      max: numStateIncreaser + maxIncrementValue
    });
    return newRandom;
  };
  const decreaseNum = () => {
    const newRandom = numStateDecreaser = faker.random.number({
      max: numStateDecreaser - maxIncrementValue,
      min: numStateDecreaser
    });
    return newRandom;
  };

  const fluctuate = () => {
    let newRandom;

    if ( increaseMode ) {
      increaseMode = numStateFluctuate < maxFluctuation;

      newRandom = numStateFluctuate = faker.random.number({
        min: numStateFluctuate,
        max: numStateFluctuate + maxIncrementValue
      });
    } else {
      increaseMode = numStateFluctuate < 0;
      newRandom = numStateFluctuate = faker.random.number({
        max: numStateFluctuate - maxIncrementValue,
        min: numStateFluctuate
      });
    }
    return newRandom;
  };

  Object.keys(data).map( items => {

    Object.keys(data[items]).map( item => {


// Uncomment for each to work - props aren't working atm

//      data['random'][item][i] = [
//        generateDates()[i],
//        randomNum()
//      ];
//      data['increase'][item][i] = [
//        generateDates()[i],
//        increaseNum()
//      ];
//      data['decrease'][item][i] = [
//        generateDates()[i],
//        decreaseNum()
//      ];
      data['fluctuate'][item][i] = [
        generateDates()[i],
        fluctuate()
      ]
    })
  });
};

//console.log(data)
export default data;