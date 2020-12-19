import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components'
import InputTextareaSharedStyle from "../../../../styles/App/Shared/css/classicField";
// import useOnClickOutside from "../../../functions/useOnClickOutside";
// import DropDownBtn from "../../../Styles/App/Form/Select/DropDownBtn";
import datePicker from "../../../../assets/btns/date.png";
// import nextBtn from "../../../assets/btns/next.svg";
import Modal from "./controls/Modal";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import {useDispatch, useSelector} from "react-redux";

const Calender = styled.div`
    ${InputTextareaSharedStyle};
`;

const Month = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background: ${({theme}) => theme.datePicker.monthBackground};;
`;

const Day = styled.div`
  width: calc((100% / 7) - 22px);
  display: flex;
  padding: 5px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;      
  color: ${({theme}) => theme.datePicker.activeText};

  &.selected{
    background: #fad479;
  }

  &.differentMonth{
    color: ${({theme}) => theme.datePicker.nonActiveText};
  }
`;

const Week = styled(Day)`
  color: gray;
  cursor: default;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  
  img{
  cursor: pointer;
    height: ${({theme}) => theme.style.iconSizes.s};
  }
  img:first-child{
  transform: rotate(180deg);
  }
`;

const Navigation = styled(Header)`
  width: calc(100% - 20px);
  padding: 10px;
  background: ${({theme}) => theme.datePicker.navigationBackground};
  cursor: default;
  
  svg{
    cursor: pointer;
    font-size: ${({theme}) => theme.style.iconSizes.m};
  }
`;

const DatePicker = ({value, onChange, dispatch}) => {

    // const task = useSelector(state => state.task);
    // const dispatch = useDispatch();


    const [calender, setCalender] = useState([]);

    //.add(1, "day") => begin from Monday else Sunday
    const startDay = value.clone().startOf('month').startOf("week");
    const endDay = value.clone().endOf('month').endOf("week");

    const CalenderRef = useRef();
    // const [calenderStatus, setCalenderStatus] = useState(false)
    // useOnClickOutside(CalenderRef, () => setCalenderStatus(false));


    useEffect(() => {

        const day = startDay.clone().subtract(1, "day");
        const newCalender = [];

        while (day.isBefore(endDay, "day")) {
            newCalender.push(
                Array(7)
                    .fill(0)
                    .map(() => day.add(1, "day").clone())
            )
        }
        setCalender(newCalender);
    }, [value]);

    function prevMonth() {
        return value.clone().subtract(1, "month");
    }

    function nextMonth() {
        return value.clone().add(1, "month");
    }

    function whichDay() {
        if (value.isSame(new Date, 'day')) return "Today";
        if (value.clone().add(1, "day").isSame(new Date, "day")) return "Yesterday";
        if (value.clone().add(2, "day").isSame(new Date, "day")) return "The day before yesterday";
        if (value.clone().add(-1, "day").isSame(new Date, "day")) return "Tomorrow";
        if (value.clone().add(-2, "day").isSame(new Date, "day")) return "After tomorrow";
        return value.format("DD/MM/YYYY");
    }


    // -----------------------MODAL WINDOW-----------------------

    const [showModal, setShowModal] = useState(false);

    return (
        <Calender ref={CalenderRef}>

            <Header onClick={() => setShowModal(true)}>
                <span>{whichDay()}</span>
                <img src={datePicker} alt="date_icon"/>
            </Header>

            <Modal showModal={showModal} setShowModal={setShowModal}>
                <Navigation>
                    <VscChevronLeft onClick={() => dispatch(onChange(prevMonth))}/>
                    {/*<img src={nextBtn} onClick={() => onChange(prevMonth)} alt="<"/>*/}
                    <span>{value.format("MMMM")} {value.format("YYYY")}</span>
                    {/*<img src={nextBtn} onClick={() => onChange(nextMonth)} alt=">"/>*/}
                    <VscChevronRight onClick={() => dispatch(onChange(nextMonth))}/>
                </Navigation>
                <Month>
                    {
                        ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => <Week key={`week${index}`}>{d}</Week>)
                    }
                    {
                        calender.map((week) => (
                            week.map((day, index) => (
                                <Day key={`day${index}`}
                                     // className={value.isSame(day, "day") && "selected" || !value.isSame(day, "month") && "differentMonth"}
                                     className={value.isSame(day, "day")? "selected": !value.isSame(day, "month") && "differentMonth"}
                                     onClick={() => {
                                         dispatch(onChange(day));
                                         setShowModal(false);
                                     }}>{day.format("D")}</Day>
                            ))
                        ))
                    }
                </Month>
            </Modal>

        </Calender>
    )
};

export default DatePicker;
