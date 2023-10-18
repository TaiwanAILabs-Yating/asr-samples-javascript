import { useEffect, useState, useRef } from 'preact/compat'
import { AILabsYatingASR } from "@ailabs-yating/asr-client-sdk-javascript"
import axios from "axios"

const PREACT_APP_BACKEND_HOST = process.env.PREACT_APP_BACKEND_HOST || ""

export default function App() {
  const [asrResult, setAsrResult] = useState([""])
  const [showCusLm, setShowCusLm] = useState("")
  const asrHistory = useRef([""])

  const connect = async() => {
    const params = new URLSearchParams(window.location.search)
    const s3CusModelKey = params.get('s3CusModelKey')
    let requestBody = {}
    if(s3CusModelKey) {
      requestBody = { s3CusModelKey }
      setShowCusLm(`using cus lm: ${s3CusModelKey}`)
    }

    const asrSDK = new AILabsYatingASR(async() => {
      const { data } = await axios.post(`${PREACT_APP_BACKEND_HOST}/token`, requestBody)
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

    const devices = await asrSDK.setupAudioDevices()
    if(devices.length == 0) {
      alert("no mic detected!")
      return
    }
    if(devices.length > 1) {
      const deviceSelectText = devices.map((d, i) => `${i}: ${d.label}`).join("\n")
      const deviceIndexStr = prompt(`Please select device with number:\n${deviceSelectText}`, 0)
      const deviceIndex = parseInt(deviceIndexStr)
      if(!isNaN(deviceIndex)) {
        await asrSDK.connect(devices[deviceIndex].deviceId)
      } else {
        await asrSDK.connect()
      }
    } else {
      await asrSDK.connect()
    }
  }

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    asrHistory.current = asrResult;
  }, [asrResult])

  return (
    <div>
      <h1>ASR SDK Example {showCusLm}</h1>
      {asrResult.map(r => <p>{r}</p>)}
    </div>
  );
}
