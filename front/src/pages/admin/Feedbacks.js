import React, {useEffect, useState} from 'react'
import Back from "../../components/Back"
import axios from 'axios'

const Feedbacks = () => {
    const [errMsg, setErrMsg] = useState("")
    const [fs, setFs] = useState([])

    const get = async () => {
        setErrMsg("")
        try {
            const {data} = await axios.get(`feedbacks`)
            if (data !== null) {
                setFs(data)
            }
        } catch (e) {
            setErrMsg(`로딩 실패. ${e}`)
        }
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <>
            <h1 className="page-title"><Back content="피드백 열람"/></h1>
            {errMsg !== "" ?
                <div className="mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red">
                    {errMsg}
                </div> : null}
            {
                fs.map((f) =>
                    <article key={f.ID} className="card-box shadow-3">
                        {f.Content} <span className="feedback-by">— {f.User.Grade}-{f.User.Class} {f.User.Name}</span>
                    </article>
                )
            }
        </>
    )
}

export default Feedbacks