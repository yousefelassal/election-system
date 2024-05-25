import useSWR from 'swr';
import { baseUrl } from '../lib/utils';
import { getStats } from '../services/stats';
import { DonutChart, Legend } from '@tremor/react';

const Stats = () => {
  const { data, isLoading } = useSWR(`${baseUrl}/stats`, getStats);
  if (isLoading) return <div>Loading...</div>;
  const values = data.map((candidate) => {
    return {
      name: candidate.name,
      value: candidate.votes
    }
  })
  return (
    <div className="flex flex-col w-full h-full items-center justify-center lg:px-32">
      <div className="flex flex-col w-full bg-white rounded-lg p-4">
      <h1 className="font-bold w-full text-center text-2xl">Live Statistics Chart</h1>
      <DonutChart
        data={values}
        index="name"
        colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
        variant="pie"
      />
      <Legend
        categories={values.map((candidate) => candidate.name)}
        colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
      />
      </div>
    </div>
  )
}

export default Stats