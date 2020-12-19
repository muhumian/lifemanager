import React, {useRef, useState} from 'react';
import TitleContainer from "../../../../Styles/App/Form/Select/TitleContainer";
import DropDownBtn from "../../../../Styles/App/Form/Select/DropDownBtn";
import downBtn from "../../../../assets/btns/dropdown.png";
import SelectedContainer from "../../../../Styles/App/Form/Select/SelectedContainer";
import SelectedTag from "../../../../Styles/App/Form/Select/SelectedTag";
import DeleteBtn from "../../../../Styles/App/Form/Select/DeleteBtn";
import deleteBtn from "../../../../assets/btns/deletebtn.svg";
import FormNewTagContainer from "../../../../Styles/App/Form/Select/FormNewTagContainer";
import OptionContainer from "../../../../Styles/App/Form/Select/OptionContainer";
import Option from "../../../../Styles/App/Form/Select/Option";
import Select from "../../../../Styles/App/Form/Select/Select";
import useOnClickOutside from "../../../App/Functions/useOnClickOutside";

//actions
//icons
//styles
//functions
//components

const MultiSelect = ({tags, setTags}) => {

    const [tagName, setTagName] = useState('');

    const [opts, setOpts] = useState([
        {type: "#Chocolate", access: true},
        {type: "#Cookie", access: true},
        {type: "#Marshmallow", access: true}
    ]);

    const [showModal, setShowModal] = useState(false);

    const optsContainer = useRef();
    const selectRef = useRef();
    const [selectStatus, setSelectStatus] = useState(false);
    useOnClickOutside(selectRef, () => setSelectStatus(false));

    const addToTags = (index) => {
        let temp_opts = [...opts];
        temp_opts[index].access = false;
        setTags(tags => [...tags, temp_opts[index].type]);
        setOpts(temp_opts);
    };

    const deleteTag = (index) => {
        let temp_tags = [...tags];
        let temp_opts = [...opts];

        // return true to object in opts array which was deleted from tags array
        const optIndex = temp_opts.findIndex(op => op.type === temp_tags[index]);
        temp_opts[optIndex].access = true;

        //removing an element from tags array
        temp_tags.splice(index, 1);
        setTags(temp_tags);
    };

    const addNewTag = (e) => {
        e.preventDefault();

        if (tagName.trim().length > 1) {
            if (tags.findIndex(tag => tag === tagName) === -1) {
                let temp_tags = [...tags];
                let temp_opts = [...opts];

                temp_tags.push(tagName);
                setTags(temp_tags);

                temp_opts.push({type: tagName, access: false});
                setOpts(temp_opts);
            }
            setTagName('');
        }
    };

    return (
        <Select ref={selectRef}>
            <TitleContainer onClick={() => {
                setSelectStatus(!selectStatus)
                setShowModal(true);
            }} >
                <span>Tags {tags.length}</span>
                <DropDownBtn source={downBtn} rotate={selectStatus}/>
            </TitleContainer>
            {
                tags.length > 0 &&
                <SelectedContainer>
                    {
                        tags.map((sl, index) => (
                            <SelectedTag key={`tag${index}`}>
                                {sl}
                                <DeleteBtn onClick={() => deleteTag(index)} src={deleteBtn} primary/>
                            </SelectedTag>
                        ))
                    }
                </SelectedContainer>
            }
            {
                selectStatus &&
                <>
                    {/*<Modal setShowModal={setShowModal} showModal={showModal}>*/}

                        {/*<SelectedContainer>*/}
                        {/*    {*/}
                        {/*        tags.map((sl, index) => (*/}
                        {/*            <SelectedTag key={`tag${index}`}>*/}
                        {/*                {sl}*/}
                        {/*                <DeleteBtn onClick={() => deleteTag(index)} src={deleteBtn} primary/>*/}
                        {/*            </SelectedTag>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</SelectedContainer>*/}
                        <FormNewTagContainer>
                            <input type="text" value={tagName} placeholder="New tag name" onChange={(e) => {
                                if (e.target.value.charAt(0) !== "#" && e.target.value.length > 0)
                                    setTagName("#" + e.target.value);
                                else setTagName(e.target.value);
                            }}/>
                            <button onClick={(e) => addNewTag(e)}>+</button>
                        </FormNewTagContainer>

                        <OptionContainer ref={optsContainer}>
                            {
                                opts.findIndex(op => op.access) === -1 ? "No items 🙅‍" :
                                    opts.map((el, index) => (
                                        el.access &&
                                        <Option onClick={() => addToTags(index)}
                                                key={`opt${index}`}>{el.type}</Option>
                                    ))
                            }
                        </OptionContainer>
                    {/*</Modal>*/}
                </>
            }
        </Select>
    )
};

export default MultiSelect;
