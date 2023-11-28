import React, {useState} from "react";
import ArrowIcon from "../assets/img/icon-arrow.svg"

const AgeCalculator = () => {
    const [formData, setFormDate] = useState({
        day: '',
        month: '',
        year: '',
    });

    const [age, setAge] = useState({});
    const [err, setErr] = useState({});

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setFormDate({
            ...formData,
            [name]: value
        });
    };

    const calculateAge = () => {
        const {day, month, year} = formData;
        const inputDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const inputDate = new Date(inputDateString);
        const today = new Date();
        const isValidDate = inputDate.getDate() === day && (inputDate.getMonth() + 1) === month && inputDate.getFullYear() === year;
        const isFutureDate = inputDate > today;
        const isValidMonth = month >= 1 && month <= 12;
        const isValidDay = day >= 1 && day <= 31 && day <= new Date(year, month, 0).getDate();
        console.log(inputDate.getMonth() + 1)
        
        if(!isFutureDate && isValidDate && isValidMonth && isValidDay) {
            const milliseconds = today - inputDate;
            const ageDate = new Date(milliseconds);
            const years = ageDate.getUTCFullYear() - 1970;
            const months = ageDate.getUTCMonth();
            const days = ageDate.getUTCDate() - 1;

            setAge({years, months, days});
            setErr({});
            console.log(years, month, days)
        } else {
            const newErr = {};
            if(!isValidDate) newErr.day = "Must be a valid date";
            if(isFutureDate) newErr.year = "Must be in the past";
            if(!isValidMonth) newErr.month = "Must be a valid month";
            if(!isValidDay) newErr.day = "Must be a valid day";
            
            if(formData.day === "") newErr.day = "This field is required";
            if(formData.month === "") newErr.month = "This field is required";
            if(formData.year === "") newErr.year = "This field is required";

            setAge({})
            setErr(newErr)
        }
    }
    return(
        <div id="age_calculator_container">
            <div className="age-calculator">
                <div className="form-container">
                    <div className="inputs row">
                        <div className="input-item col-3">
                            <label htmlFor="day">Day</label>
                            <input type="number" id="day" name="day" placeholder="DD" min="1" max="31" onChange={handleInputChange} value={formData.day} />
                            {err.day && <span className="err">{err.day}</span>}
                        </div>
                        <div className="input-item col-3">
                            <label htmlFor="month">Month</label>
                            <input type="number" id="month" name="month" placeholder="MM" min="1" max="12" onChange={handleInputChange} value={formData.month} />
                            {err.month && <span className="err">{err.month}</span>}
                        </div>
                        <div className="input-item col-3">
                            <label htmlFor="year">Year</label>
                            <input type="number" id="year" name="year" placeholder="YYYY" max={new Date().getFullYear()} onChange={handleInputChange} value={formData.year} />
                            {err.year && <span className="err">{err.year}</span>}
                        </div>
                    </div>
                    <div className="button-container">
                        <span className="v-separator"></span>
                        <button onClick={calculateAge}><img src={ArrowIcon} alt="arrow-icon" /></button>
                    </div>
                </div>

                <div className="calculated-age">
                    <div className="years">{age.years !== null ? <span>--</span> : <span>{age.years}</span>} years</div>
                    <div className="months">{age.months !== null ? <span>--</span> : <span>{age.months}</span>} months</div>
                    <div className="days">{age.days !== null ? <span>--</span> : <span>{age.days}</span>} days</div>
                </div>
            </div>
        </div>
    )
}

export default AgeCalculator;