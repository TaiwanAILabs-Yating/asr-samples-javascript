import { useEffect, useState, useRef } from 'preact/compat'
import { AILabsYatingASR } from "@ailabs-yating/asr-client-sdk-javascript"
import axios from "axios"

const PREACT_APP_BACKEND_HOST = process.env.PREACT_APP_BACKEND_HOST || ""

export default function App() {
  const [asrResult, setAsrResult] = useState([""])
  const asrHistory = useRef([""])

  const connect = async() => {
    const asrSDK = new AILabsYatingASR(async() => {
      const { data } = await axios.post(`${PREACT_APP_BACKEND_HOST}/token`)
      return data.token
    })

    asrSDK.on("sentence", (event) => {
      console.log(`ASR SENTENCE: ${JSON.stringify(event)}`)
      const history = [...asrHistory.current]
      history[history.length - 1] = event.asr_sentence
      setAsrResult(history)
    })
  
    asrSDK.on("sentenceFinal", (event) => {
      console.log(`ASR SENTENCE FINAL: ${JSON.stringify(event)}`)
      const history = [...asrHistory.current]
      history[history.length - 1] = event.asr_sentence
      history.push("")
      setAsrResult(history)
    })
  
    await asrSDK.connect()
  }

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    asrHistory.current = asrResult;
  }, [asrResult])

  return (
    <div>
      <h1>ASR SDK Example</h1>
      {asrResult.map(r => <p>{r}</p>)}
    </div>
  );
}
