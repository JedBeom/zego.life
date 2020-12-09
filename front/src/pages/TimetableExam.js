import React from 'react'

const ls = [
    [
        ["국어", "", "한국사"],
        ["수학", "", "한문I/정보"],
        ["통합과학", "", "통합사회"],
        ["영어", "", "물리학I/생활과윤리"],
    ],
    [
        ["사회문화", "확률과통계", "일본어/중국어", "지구과학I"],
        ["생명과학I", "수학II/심화수학II/미적분", "영어문학읽기/영어권문화", "경제"],
        ["화법과작문", "영어II", "생활과윤리", "화학I"],
        ["언어와매체", "한국지리", "물리학I", "문학"],
    ],
]

const Timetable = ({meGrade}) => {
    return (
        <div className="table-container">
            <table className="timetable timetable-exam">
                <thead>
                <tr>
                    {["", "월", "화", "수", "목"].map((v, i) =>
                        <td key={i}>{v}</td>
                    )}
                </tr>
                </thead>
                <tbody>
                {
                    [0, 1, 2, 3].map(li => { // lessons index 
                        return <tr key={li}>
                            <td>{li + 1}교시</td>
                            {[0, 1, 2, 3].map(wd => { // week day
                                return <td key={`${li}${wd}`}>{ls[meGrade - 1][wd][li] ?
                                    <>{ls[meGrade - 1][wd][li].split("/").map(v => <span className="subject"
                                                                                         key={v}>{v}</span>)}</> : null}
                                </td>
                            })}
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Timetable