import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

type apiData = {
  number: number;
  is_prime: boolean;
  is_perfect: boolean;
  digit_sum: number;
  fun_fact: string;
};

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function is_perfect(num: number): boolean {
  if (num < 2) return false;
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
}

function sumOfDigits(num: number): number {
  return String(num)
    .split('')
    .map(Number)
    .reduce((acc, digit) => acc + digit, 0);
}

async function fun_fact(num: number): Promise<string> {
  const baseUrl = `http://numbersapi.com/${num}/math`;
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch fun fact');
    }
    const fact = await response.text();
    return fact;
  } catch (error) {
    throw new Error(`There was an error fetching fun fact for ${num}`);
  }
}

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: 'OK',
    message: 'Server is up and running!',
  });
});

app.get(
  '/api/classify-number',
  async (req: Request, res: Response, next: NextFunction) => {
    const numberInput = req.query.number as string;
    const number = parseInt(numberInput, 10);

    // Check if the input is invalid (NaN or not a valid integer)
    if (isNaN(number) || !Number.isInteger(Number(numberInput))) {
      return res.status(400).json({
        number: numberInput,
        error: true,
      });
    }

    const result: apiData = {
      number,
      is_prime: isPrime(number),
      is_perfect: is_perfect(number),
      digit_sum: sumOfDigits(number),
      fun_fact: await fun_fact(number),
    };

    res.json(result);
  }
);

app.get('*', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is currently up and running on port ${PORT}`);
});
