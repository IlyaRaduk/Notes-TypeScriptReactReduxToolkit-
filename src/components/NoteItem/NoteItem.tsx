import style from './noteItem.module.scss';
import { FC } from "react";
import { INote } from "../../models/INote";
import { useNavigate } from "react-router-dom";
import deleteNote from "../../store/ThunkCreators/deleteNote";
import { useAppDisaptch } from "../../hooks/redux";
import removeImg from './../../img/remove.gif';

interface INoteProps {
    note: INote,
}
const NoteItem: FC<INoteProps> = ({ note }) => {
    const dispatch = useAppDisaptch();
    const navigate = useNavigate();
    return (
        <div className={style.note} onClick={() => navigate(`/note/${note.id}`)}>
            <div className={style.note__title}>
                <p className={style.note__date}>{note.date}</p>
                <div className={style.note__remove} onClick={(e) => {
                    dispatch(deleteNote(note.id))
                    e.stopPropagation();
                }}>
                    <img src={removeImg} alt="remove" />
                </div>
            </div>
            <p className={style.note__text}>{note.text}</p>
            {note.teg?.length !== 0 && note.teg?.length !== undefined ?
                <div  className={style.note__tegsList}>
                    Tegs: {note.teg?.map((el,index) => <span key={index} className={style.note__teg}>{el + ' '}</span>)}
                </div>
                : null
            }
        </div>
    )
}
export default NoteItem;