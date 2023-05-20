import Image from 'next/image'
import styles from './UploadCard.module.scss'
import AddImage from "../../../public/assets/addImage.svg";
import Download from "../../../public/assets/download.svg";
import Cross from "../../../public/assets/modalCross.png";
import PDF from "../../../public/assets/pdfIcon.svg"

import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';



const UploadCard = ({ changeHandler, uploadText, documentLinksList, name, setDocumentLinksList, documentLoading }: { changeHandler: (event: Event) => {}, uploadText: string }) => {

    const [isThisPDF, setIsThisPDF] = useState(false)

    const localChangeHandler = (event) => {
        const FIVE_MEGABYTES = 5 * 1024 * 1024;
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            let ext = file.name.split('.').pop();
            if (['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF', 'pdf', 'PDF', 'heif', 'HEIF'].includes(ext) === false) {
                Swal.fire({
                    icon: 'error',
                    text: 'Image or PDF only',
                    confirmButtonColor: '#df0025',
                });
                return
            } else if (file.size > FIVE_MEGABYTES) {
                Swal.fire({
                    icon: 'error',
                    text: 'Max 5MB Only',
                    confirmButtonColor: '#df0025',
                });
                return
            } else {
                console.log(ext, "Ext", ext === "pdf")
                if (ext === "pdf" || ext === "PDF") {
                    setIsThisPDF(true)
                } else {
                    setIsThisPDF(false)
                }
                // create the preview
                const objectUrl = URL.createObjectURL(file)
                setDocumentLinksList(pre => ({ ...pre, [name]: { filename: file.name, file, filePath: objectUrl } }))
            }
        }

    }

    return (
        <div className={`${styles['wrapper']}`} >
            {documentLoading.name === name && documentLoading.loading ? <Spinner size="lg" animation="border" style={{ color: '#E11631' }} /> : documentLinksList?.[name] !== null &&
                documentLinksList?.[name]?.filePath
                ? (<div className={`${styles['uploadedImage']}`}>
                    <Image src={isThisPDF ? PDF : documentLinksList?.[name]?.filePath} layout="fill" style={{ position: "relative" }} />
                    <div className={styles['hoverDiv']}>
                        <div className={`${styles['hoverEntity']}`}>
                            <Image src={Download} />
                            <a download href={documentLinksList?.[name]?.filePath}>
                                Download
                            </a>
                        </div>
                        <div className={`${styles['hoverEntity']}`} onClick={() => {
                            setDocumentLinksList((prev) => ({ ...prev, [name]: null }))
                        }}>
                            <span className={`${styles['hoverIcon']}`}>
                                <Image src={Cross} layout="fill" />
                            </span>
                            <p>
                                Remove
                            </p>
                        </div>
                    </div>
                </div>)
                : (<>
                    <label htmlFor={name} className={`${styles['wrapperLabel']}`}>
                        <div className={`${styles['uploadImage']}`}>
                            <Image src={AddImage} alt="image add componnet" />
                        </div>
                        <p className={`${styles['uploadText']}`}>{uploadText}</p>
                    </label>
                    <input
                        type="file"
                        hidden
                        onChange={localChangeHandler}
                        name={name}
                        accept="image/jpeg, image/jpg, image/HEIF, image/png, image/gif, application/pdf "
                        id={name}
                    />
                </>)
            }
        </div >
    )

}

export default UploadCard