interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

interface Week {
    week: Array<string>
}



const parseArguments = (args: Array<string>): Array<string> => {
    console.log(args.length);
    if(args.length > 9) 
        throw new Error('Too many days');
    if(args.length < 9) {
        throw new Error('Not enough days')
    }

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && !isNaN(Number(args[4])) && !isNaN(Number(args[5])) 
    && !isNaN(Number(args[6])) && !isNaN(Number(args[7])) && !isNaN(Number(args[8]))) {
        return args.filter(arg => !isNaN(Number(arg)));
    }
    else {
        throw new Error('Provided values were not all numbers');
    }
}

const exerciseCalculator = (week: Array<string>): Result => {
    let counter = 0;
    let hours = 0
    week.map(week => {
        if(Number(week) !== 0) {
            counter++;
            hours += Number(week)
        }
    })
    if(counter === 0) {
        return {
            periodLength: 7,
            trainingDays: counter,
            success: false,
            rating: 0,
            ratingDescription: "We have an overachiever here!",
            target: 5,
            average: hours / 7 
        }
    } 
    else if(counter < 5) {
        return {
            periodLength: 7,
            trainingDays: counter,
            success: false,
            rating: 1,
            ratingDescription: "Not good enough!",
            target: 5,
            average: hours / 7 
        }
    }
    else if(counter < 7) {
        return {
            periodLength: 7,
            trainingDays: counter,
            success: true,
            rating: 2,
            ratingDescription: "I like to see it!",
            target: 5,
            average: hours / 7 
        }
    }
    else {
        return {
            periodLength: 7,
            trainingDays: counter,
            success: true,
            rating: 3,
            ratingDescription: "Nice job",
            target: 5,
            average: hours / 7 
        }
    }
}

try {
    const week = parseArguments(process.argv);
    console.log(exerciseCalculator(week));
} catch (e) {
    throw new Error('An error has occurred');
}