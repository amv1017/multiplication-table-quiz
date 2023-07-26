import React, { useState, useEffect } from 'react'
import Answer from './Answer'
import Result from './Result'
import Label from './Label'
import { version } from '../package.json'

const TIMEOUT = 1000
const VERSION = 'v' + JSON.stringify(version).replaceAll('"', '')
const LSKEY = 'amv1017-multiplication-table-quiz'

const num = () => Math.floor(2 + Math.random() * 8)

const generateAnother = (x) => {
  const r = num()
  return r === x ? generateAnother(x) : r
}

const App = () => {
  const [state, setState] = useState({
    answered: false,
    correct: false,
    step: +window.localStorage.getItem(LSKEY) || 0,
    a: num(),
    b: num(),
    c: 0,
    first: false,
    supposed: '',
    desired: 0,
  })
  const [refresh, setRefresh] = useState(0)

  const { a, b, c, first, desired, supposed, answered, correct } = state

  useEffect(() => {
    const va = generateAnother(a)
    const vb = generateAnother(b)
    const vc = va * vb
    const vp = Math.random() > 0.5

    setState({
      ...state,
      desired: !vp ? vc : vb,
      a: va,
      b: vb,
      c: vc,
      first: vp,
    })
  }, [refresh])

  const onCheck = () => {
    const check = desired == parseInt(supposed)
    setState({ ...state, answered: true, correct: check })
    setTimeout(() => {
      let step = 0
      if (check) {
        setRefresh((r) => r + 1)
        step = state.step + 1
      }

      setState({ ...state, answered: false, supposed: '', step })
      window.localStorage.setItem(LSKEY, step)
    }, TIMEOUT)
  }

  const valChange = (e) => {
    e.preventDefault()
    setState({ ...state, supposed: e.target.value })
  }

  return (
    <div>
      <div className="font-sans flex flex-col justify-center items-center md:my-8 sm:my-6 usm:my-4">
        <div className="text-zinc-800 md:text-3xl sm:text-3xl usm:text-2xl mb-4">
          Выбери правильный ответ
        </div>
        {/* <div className="mb-4">{`${values.a}×${values.b}=${values.c}`}</div> */}
        <div className="flex flex-row justify-center text-5xl mb-4">
          <Label text={`${a}×`} />
          {first ? (
            <Answer
              value={supposed !== '' ? parseInt(supposed) : ''}
              onChange={valChange}
            />
          ) : (
            <Label text={b} />
          )}
          <Label text={'='} />
          {!first ? (
            <Answer
              value={supposed !== '' ? parseInt(supposed) : ''}
              onChange={valChange}
            />
          ) : (
            <Label text={c} />
          )}
        </div>
        <button
          className="text-zinc-800 md:text-3xl sm:text-3xl usm:text-2xl active:bg-indigo-400 hover:bg-indigo-300 bg-indigo-200 p-4 rounded-xl w-fit mb-1"
          onClick={onCheck}
        >
          Проверить
        </button>
        {answered && <Result answer={correct} notice={`${a}×${b}=${c}`} />}
      </div>
      <div className="absolute bottom-6 left-6 bg-emerald-300 rounded-md p-2">
        <span>Личный рекорд: </span>
        <span className="font-bold">{state.step}</span>
      </div>
      <div className="absolute bottom-0 right-0 italic text-sm">{VERSION}</div>
    </div>
  )
}

export default App
