interface BMI {
    height: number,
    weight: number
}


export const parseArgs = (height: number, weight: number): BMI => {

    if(!isNaN(height) && !isNaN(weight)) {
        return {
            height: height,
            weight: weight
        };
    }
    else throw new Error('Both arguments must be numbers');
};

export const bmiCalculator = (weight: number, height: number): string => {
    const bmi = (weight / (height * height)) * 703;
    if(bmi >= 30) 
        return 'Obese';
    else if(bmi >= 25)
        return 'Overweight (pre-obese)';
    else if(bmi >= 18.5) 
        return 'Normal (healthy weight)';
    else if(bmi >= 16) 
        return 'Underweight (mild-moderate thinness)';
    else 
        return 'Underweight (severe thinness)';
};

// try {
//     const { height, weight } = parseArgs(process.argv)
//     console.log(bmiCalculator(weight, height))
// } catch (e) {
//     throw new Error('Error somewhere my dude!')
// }