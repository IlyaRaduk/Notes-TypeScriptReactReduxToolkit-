import style from './modalAddNote.module.scss';
import { FC } from "react";
import InputAddNote from './InputAddNote';

interface IModalAddNoteProps {
    active: boolean,
    setActive: (active: boolean) => void,
}

const ModalAddNote: FC<IModalAddNoteProps> = ({ active, setActive }) => {

    const rootClasses = [style.modal];
    if (active) {
        rootClasses.push(style.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setActive(false)}>
            <div className={style.modal__content} onClick={(e) => e.stopPropagation()}>
                <InputAddNote/>
            </div>
        </div>
    )
}
export default ModalAddNote;