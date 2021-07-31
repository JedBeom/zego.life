import { useEffect, useState } from 'react';
import axios from 'axios'
import Page from '../../components/Page'
import {ErrorBox} from '../../components/AlertBox'
import Loading from '../../components/ui/Loading'

const meGrade = Number(localStorage.getItem("me.grade"))

const TimetableSetCredit = () => {

    const [artOpt, setArtOpt] = useState(0)
    const [forOpt, setForOpt] = useState(0)
    const [extOpt, setExtOpt] = useState(0)

    const [aOpt, setAOpt] = useState(0)
    const [a1Opt, setA1Opt] = useState(0)
    const [a2Opt, setA2Opt] = useState(0)

    const [bOpt, setBOpt] = useState(0)

    const [cOpt, setCOpt] = useState(0)
    const [c1Opt, setC1Opt] = useState(0)
    const [c2Opt, setC2Opt] = useState(0)

    const [dOpt, setDOpt] = useState(0)

    const [list, setList] = useState()
    const [errMsg, setErrMsg] = useState()

    const getList = async () => {
        try {
            const {data} = await axios.get(`timetables/subjects`)
            setList(data)
        } catch (e) {
            setErrMsg(`${e}`)
        }

    }

    const submit = async e => {
        e.preventDefault()

        const data = {
            "cs01": list[`Credit-${meGrade}`][Number(aOpt)],
            "cs02": list[`Credit-${meGrade}`][Number(bOpt)],
            "cs03": list[`Credit-${meGrade}`][Number(cOpt)],
            "cs04": list[`Credit-${meGrade}`][Number(dOpt)],
            "cs011": list[`Credit-${meGrade}`][Number(a1Opt)],
            "cs012": list[`Credit-${meGrade}`][Number(a2Opt)],
            "cs031": list[`Credit-${meGrade}`][Number(c1Opt)],
            "cs032": list[`Credit-${meGrade}`][Number(c2Opt)],

            "csArt": list.Art[Number(artOpt)],
            "csFor": list[`Foreign-${meGrade}`][Number(forOpt)],
            "csExt": list.Extra[Number(extOpt)],
        }

        try {
            axios.post(`timetables`, data)
        } catch (e) {
            setErrMsg("문제가 발생했습니다.")
            return
        }

        window.location.href = "/timetable"
    }

    useEffect(() => {
        getList()
    }, [])

    if (!list) return <Loading visible={true}/>

    return <Page title="선택과목 설정">
        <p>시간표를 보기 위해서는, 내 선택과목을 입력해야합니다. </p>
        <ErrorBox>{errMsg}</ErrorBox>
        <form onSubmit={submit}>
            {meGrade <= 2 ?
                <div className="flex flex-column">
                    <label>음악 또는 미술</label>
                    <select className="select" value={artOpt} onChange={e => setArtOpt(e.target.value)}>
                        {list.Art.map((e, i) => <option key={e.Subject} value={i}>{e.Teacher} - {e.Subject}</option>)}
                    </select>
                </div> : null}
            {meGrade >= 2 ?
                <div className="flex flex-column">
                    <label>외국어 또는 공학</label>
                    <select className="select" value={forOpt} onChange={e => setForOpt(e.target.value)}>
                        {list[`Foreign-${meGrade}`].map((e, i) => <option key={e.Subject}
                                                                          value={i}>{e.Teacher} - {e.Subject}</option>)}
                    </select>
                </div> : null}
            {meGrade === 3 ?
                <div className="flex flex-column">
                    <label>교양</label>
                    <select className="select" value={extOpt} onChange={e => setExtOpt(e.target.value)}>
                        {list.Extra.map((e, i) => <option key={e.Subject} value={i}>{e.Teacher} - {e.Subject}</option>)}
                    </select>
                </div> : null}
            {meGrade >= 2 ? <>
                <div className="flex flex-column">
                    <label>선A</label>
                    <select className="select" value={aOpt} onChange={e => setAOpt(e.target.value)}>
                        {list[`Credit-${meGrade}`].map((s, i) => <option key={s.Subject}
                                                                         value={i}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div>
                <div className="flex flex-column">
                    <label>선B</label>
                    <select className="select" value={bOpt} onChange={e => setBOpt(e.target.value)}>
                        {list[`Credit-${meGrade}`].map((s, i) => <option key={s.Subject}
                                                                         value={i}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div>
                <div className="flex flex-column">
                    <label>선C</label>
                    <select className="select" value={cOpt} onChange={e => setCOpt(e.target.value)}>
                        {list[`Credit-${meGrade}`].map((s, i) => <option key={s.Subject}
                                                                         value={i}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div>
                {meGrade === 2 ?
                <div className="flex flex-column">
                    <label>선D</label>
                    <select className="select" value={dOpt} onChange={e => setDOpt(e.target.value)}>
                        {list[`Credit-${meGrade}`].map((s, i) => <option key={s.Subject}
                                                                         value={i}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div> : null }
            </> : null}
            {meGrade === 3 ? <>
                <div className="flex flex-column">
                    <label>선A1</label>
                    <select className="select" value={a1Opt} onChange={e => setA1Opt(e.target.value)}>
                        {list[`Credit-${meGrade}`].map((s, i) => <option key={s.Subject}
                                                                         value={i}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div>
                <div className="flex flex-column">
                    <label>선A2</label>
                    <select className="select" value={a2Opt} onChange={e => setA2Opt(e.target.value)}>
                        {list[`Credit-${meGrade}`].map((s, i) => <option key={s.Subject}
                                                                         value={i}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div>
                <div className="flex flex-column">
                    <label>선C1</label>
                    <select className="select" value={c1Opt} onChange={e => setC1Opt(e.target.value)}>
                        {list[`Credit-${meGrade}`].map((s, i) => <option key={s.Subject}
                                                                         value={i}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div>
                <div className="flex flex-column">
                    <label>선C2</label>
                    <select className="select" value={c2Opt} onChange={e => setC2Opt(e.target.value)}>
                        {list[`Credit-${meGrade}`].map((s, i) => <option key={s.Subject}
                                                                         value={i}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div>
            </> : null}
            <button className="mt-3 button float-right" type="submit">제출하기</button>
        </form>
    </Page>
}

export default TimetableSetCredit