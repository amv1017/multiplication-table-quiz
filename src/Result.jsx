import right from './right.svg'
import wrong from './wrong.svg'

export default function Result({ answer, notice }) {
  return (
    <div className='flex flex-col'>
      <div className='h-10 text-3xl text-red-800 text-center'>{!answer && notice}</div>
      <img className='w-36 place-self-center' src={answer ? right : wrong} />
    </div>
  )
}
