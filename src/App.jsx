import React, { useState, useEffect } from 'react'
import Answer from './Answer'
import Result from './Result'
import Label from './Label'
import packagejson from '../package.json'

const TIMEOUT = 1000
const VERSION = 'v'+JSON.stringify(packagejson.version).replaceAll('"','')

const num = () => {
  return Math.floor(2+Math.random()*8)
}

const generateAnother = (x) => {
  while (true) {
    let y = num()
    if (x != y) {
      return y
    }
  }
}

const App = () => {
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [step, setStep] = useState(true)
  const [values, setValues] = useState({ a: num(), b: num(), c: 0, p: false })
  const [supposed, setSupposed] = useState('')
  const [desired, setDesired] = useState(0)

  useEffect(() => {
    const va = generateAnother(values.a)
    const vb = generateAnother(values.b)
    const vc = va * vb
    const vp = Math.random()>0.5

    setDesired(!vp ? vc : vb)
    setValues({ a: va, b: vb, c: vc, p: vp })
  }, [step])

  const onCheck = () => {
    setAnswered(true)
    const check = (desired == parseInt(supposed))
    setCorrect(check)
    setTimeout(() => {
      if (check) {
        setSupposed('')
        setStep(!step)
      }
      setAnswered(false)
    }, TIMEOUT)
  }

  const valChange = (e) => {
    e.preventDefault()
    setSupposed(e.target.value)
  }

  return (
    <div>
      <div className="font-sans flex flex-col justify-center items-center md:my-8 sm:my-6 usm:my-4">
        <div className="text-zinc-800 md:text-3xl sm:text-3xl usm:text-2xl mb-4">Выбери правильный ответ</div>
        {/* <div className="mb-4">{`${values.a}×${values.b}=${values.c}`}</div> */}
        <div className="flex flex-row justify-center text-5xl mb-4">
          <Label text={`${values.a}×`} />
          {values.p ? <Answer value={supposed !== '' ? parseInt(supposed) : ''} onChange={valChange} /> : <Label text={values.b} />}
          <Label text={'='}/>
          {!values.p ? <Answer value={supposed !== '' ? parseInt(supposed) : ''} onChange={valChange} /> : <Label text={values.c} />}
        </div>
        <button className='text-zinc-800 md:text-3xl sm:text-3xl usm:text-2xl active:bg-indigo-400 hover:bg-indigo-300 bg-indigo-200 p-4 rounded-xl w-fit mb-1' onClick={onCheck}>
          Проверить
        </button>
        {answered && <Result answer={correct} notice={`${values.a}×${values.b}=${values.c}`} />}
      </div>
      <div className="absolute bottom-0 right-0 italic text-sm">
        {VERSION}
      </div>
    </div>
  )
}

export default App
