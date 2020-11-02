import React, {useState} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'

const SlotFilling = () => {
    const [date, setDate] = useState(new Date(2004, 8, 8))
    const [loading, setLoading] = useState(false)

    let r = Math.random()
    let rm = true
    if (r > 0.5) {
        rm = false
    }
    const [isMale, setIsMale] = useState(rm)
    const [residenceDorm, setResidenceDorm] = useState(!rm)

    let minDate = new Date(2002, 0, 1)
    let maxDate = new Date(2005, 11, 31)

    const patchUser = async (e) => {
        setLoading(true)
        e.preventDefault()

        let p = {
            IsDorm: residenceDorm,
            IsMale: isMale,
            BirthdayYear: date.getFullYear(),
            BirthdayMonth: date.getMonth() + 1,
            BirthdayDay: date.getDate()
        }

        try {
            await axios.patch(`users/${localStorage.getItem("me.id")}`, p)

            const respMe = await axios.get("me")

            localStorage.setItem("me.residence", respMe.data.Residence)
            localStorage.setItem("me.roles", respMe.data.Roles)

            alert("정보 추가에 성공했어요!")
            window.location = "/"
        } catch (e) {
            alert("정보 추가에 실패했어요. 다시 시도해보시겠어요?")
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="page-title">정보 추가</h1>
            <p>OBT 여러분! 정식 출시 이후 회원 가입 때 받을 정보에요. 맞춤형 서비스를 제공하기 위해
                이하의 정보를 제공받으니 입력해주시면 감사하겠습니다!
            </p>
            <form className={"p-2"} onSubmit={patchUser}>
                <div className="flex flex-column">
                    <label className="my-2" htmlFor="residence-input">거주</label>
                    <div className="horizontal-group register-select">
                        <button type="button" className={residenceDorm ? "button bg-green" : "button"}
                                onClick={() => setResidenceDorm(true)}>기숙사
                        </button>
                        <button type="button" className={!residenceDorm ? "button bg-green" : "button"}
                                onClick={() => setResidenceDorm(false)}>비기숙사
                        </button>
                    </div>
                </div>
                <div className="flex flex-column">
                    <label className="my-2" htmlFor="birthday-input">생년월일</label>
                    <DatePicker className="input register-birthday" disabledKeyboardNavigation
                                dateFormat="yyyy년 MM월 dd일" onChange={(d) => {
                        console.log(d);
                        setDate(d)
                    }}
                                selected={date} minDate={minDate} maxDate={maxDate} todayButton="오늘"/>
                </div>
                <div className="flex flex-column">
                    <label className="my-2" htmlFor="residence-input">성별(주민등록상)</label>
                    <div className="horizontal-group register-select">
                        <button type="button" className={isMale ? "button bg-blue" : "button"}
                                onClick={() => setIsMale(true)}>남
                        </button>
                        <button type="button" className={!isMale ? "button bg-red" : "button"}
                                onClick={() => setIsMale(false)}>여
                        </button>
                    </div>
                </div>
                <div className={"mt-4"}>
                    <button type="submit"
                            className={loading ? "button float-right loading" : "button float-right"}>제출!
                    </button>
                </div>
            </form>
            <style>nav {"{opacity: 0}"}</style>
        </>
    )
}

export default SlotFilling