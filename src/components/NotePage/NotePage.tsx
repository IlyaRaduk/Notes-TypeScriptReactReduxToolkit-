import style from './notePage.module.scss';
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from 'react';
import { useAppDisaptch, useAppSelector } from "../../hooks/redux";
import fetchOneNote from "../../store/ThunkCreators/fetchOneNote";
import { useNavigate } from "react-router-dom";
import { noteSlice } from "../../store/reducers/noteSlice";
import saveEditNote from "../../store/ThunkCreators/saveEditNote";


const NotePage: FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { note, isLoading, error, isActiveEdit, textEdit } = useAppSelector((state => state.noteSlice))
    const dispatch = useAppDisaptch();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
        const { scrollTop } = event.currentTarget;
        if (divRef.current) {
            divRef.current.scrollTop = scrollTop;
        }
    };


    useEffect(() => {
        dispatch(fetchOneNote(Number(params.id)))
    }, [])

    function applyHighlights(text: string) {
        return text
            .replace(/\n$/g, '\n\n')
            .replace(/#[A-Za-zА-Яа-я0-9_]+/g, '<mark>$&</mark>');
    }

    return (
        <div className={style.notePage}>
            <div className={style.notePage__back} onClick={() => navigate(`/}`)}>К заметкам</div>
            {isLoading && <h1>Идёт загрузка</h1>}
            {error && <h1>Ошибка</h1>}
            {isActiveEdit ?
                <div className={style.note}>
                    <div className={style.containerN}>
                        <div ref={divRef} className={style.backdrop}>
                            <div className={style.highlights}  dangerouslySetInnerHTML={{ __html: applyHighlights(textEdit) }} >
                            </div>
                        </div>
                        <textarea onScroll={handleScroll} ref={textareaRef} className={style.note__textarea}
                            autoFocus={true}
                            onChange={(e) => { dispatch(noteSlice.actions.editText(e.target.value)) }}
                            value={textEdit}>
                        </textarea>
                    </div>
                    <button className={style.note__btn} onClick={() => { dispatch(saveEditNote(note.text, textEdit, note)) }}>Сохранить</button>
                </div>
                : <div className={style.note} onClick={() => { dispatch(noteSlice.actions.editSwitchOn()) }}>
                    <div className={style.note__date}>{note.date}</div>
                    <pre className={style.note__text}>{note.text}</pre>
                    {note.teg?.length !== 0 && note.teg?.length !== undefined ?
                        <div className={style.note__tegsList}>
                            Tegs: {note.teg?.map((el,index) => <span key={index} className={style.note__teg}>{el + ' '}</span>)}
                        </div>
                        : null
                    }
                </div>}
        </div>
    )
}
export default NotePage;