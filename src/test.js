import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";

const rand = () => Math.round(Math.random() * 20 - 10)

const genData = () => ({
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Scale',
      data: [rand(), rand(), rand(), rand(), rand(), rand()],

      borderWidth: 1,
    },
  ],
})

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const Dynamic = () => {
  const [data, setData] = useState(genData())

  useEffect(() => {
    const interval = setInterval(() => setData(genData()), 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className='header'>
        <h1 className='title'>Dynamic Bar Chart</h1>
        
      </div>
      <Bar data={data} options={options} />
    </>
  )
}

export default Dynamic