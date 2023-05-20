import React, { useEffect, useRef, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import styles from './AutoCompleteDropdown.module.scss'

export type AutoCompleteDropdownProps = {
    label: string;
    option: any;
    formikKey: string;
    formik: any;
    extraFunc?: Function;
    customHeight?: string;
    value?:Object,
    disabled?: boolean
};

export default function AutoCompleteDropdown({label, option, formikKey, formik, extraFunc, customHeight, value, disabled = false}: AutoCompleteDropdownProps) {
    const [Arr, setArr] = useState([]);
    const [SelectedArr, setSelectedArr] = useState(null);
    const [filteredArr, setFilteredArr] = useState(null);
    const [temp, setTemp] = useState(0);

    const ref = useRef<any>(null);

    const setValue = (option?: any): void => {
        formik?.setFieldValue([formikKey], option ? option?.id : '');
        formik?.setFieldTouched([formikKey], true);
    }

    const search = (event: Event): void => {
        setTimeout(() => {
            let _filteredArr;
            if (!event.query.trim().length) {
                _filteredArr = [...Arr];
            }
            else {
                _filteredArr = Arr.sort((a, b) => {
                    return a.id - b.id || a.sort_order - b.sort_order;
                }).filter((country) => {
                    return country.name.toLowerCase().includes(event.query.toLowerCase());
                });
            }
            setFilteredArr(_filteredArr);
        }, 250);
    }

    useEffect(() => {
        if(temp === 0 && formik.values?.[formikKey] && option && option.length > 0) {
            setSelectedArr(option?.find((item: any) => item.id === formik.values?.[formikKey]))
            setTemp(temp + 1)
        }
    }, [formik.values?.[formikKey], option])

    useEffect(() => {
        if(option && option.length) {
            setArr(option);
        } else {
            setArr([]);
        }
    }, [option]);

    useEffect(() => {
        SelectedArr && setValue(SelectedArr);
    }, [SelectedArr])
    useEffect(()=>{
        if(!SelectedArr?.id){

            setSelectedArr(value)
        }
    },[value])



    return (
        <>
        <div 
            className={`card flex justify-content-center autoCompleteDropdownCustomStyle ${styles['form__input-group']}`}
        >
            <AutoComplete
                disabled={disabled} 
                ref={ref} 
                forceSelection={true}
                onClick={(e) => ref.current.search(e, "", "dropdown")}
                dropdown 
                field="name"
                value={SelectedArr} 
                completeMethod={search} 
                suggestions={filteredArr} 
                className={`${styles['form__input']}`} 
                onChange={(e) => {
                    setSelectedArr(e.value);
                    extraFunc && extraFunc();
                }} 
                style={{backgroundColor: disabled ? '#DCDCDC' : '#fff'}}
                inputStyle={{ height: customHeight || 'inherit', backgroundColor: disabled ? '#DCDCDC' : '#fff' }}
                showEmptyMessage={true}
            />
            <label className={styles['form__input-label']}>
                {label}
            </label>
        </div>
            {
                formik.touched[formikKey] && formik.errors[formikKey] && <p className={`${styles['inputError']}`}>{formik.touched[formikKey] && formik.errors[formikKey]}</p>}            
        </>
    )
}
        