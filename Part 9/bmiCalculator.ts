interface BMI {
    height: number,
    weight: number
}


const parseArgs = (args: Array<string>): BMI => {
    if(args.length !== 4) throw new Error('Incorrect number of arguments')

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }
}

const bmiCalculator = (weight: number, height: number): string => {
    const bmi = (weight / (height * height)) * 703
    if(bmi >= 30) 
        return 'Obese';
    else if(bmi >= 25)
        return 'Overweight (pre-obese)';
    else if(bmi >= 18.5) 
        return 'Normal (healthy weight)';
    else if(bmi >= 16) 
        return 'Underweight (mild-moderate thinness)';
    else 
        return 'Underweight (sever thinness)';
}

try {
    const { height, weight } = parseArgs(process.argv)
    console.log(bmiCalculator(weight, height))
} catch (e) {
    throw new Error('Error somewhere my dude!')
}