import { useState } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker'

import Page from '../../components/Page'
import saveUser from '../../utils/saveUser'

const SlotFilling = () => {
    const [date, setDate] = useState(null)
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
            await axios.patch(`users/${localStorage.getItem("me.id")}/v1`, p)

            const {data} = await axios.get("me")
            saveUser(data)

            alert("정보 추가에 성공했어요!")
            window.location = "/"
        } catch (e) {
            alert("정보 추가에 실패했어요. 다시 시도해보시겠어요?")
            setLoading(false)
        }
    }

    return (
        <Page title="정보 추가">
            <p>제고라이프를 사용해주셔서 감사합니다. 맞춤형 서비스 제공을 위해 이하의 정보를 추가로 입력받으니
                입력해주시면 감사하겠습니다! 새로 가입하는 회원들도 이 정보를 입력하게 됩니다.
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
                                dateFormat="yyyy년 MM월 dd일" onChange={d => setDate(d)}
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
        </Page>
    )
}

export default SlotFilling