import style from './noteList.module.scss';
import { FC } from "react";
import { useEffect } from 'react';
import { useAppDisaptch, useAppSelector } from "../../hooks/redux";
import fetchNotes from "../../store/ThunkCreators/fetchNotes";
import NoteItem from "../NoteItem/NoteItem";
import ModalAddNote from '../InputAddNote/ModalAddNote';
import { noteListSlice } from '../../store/reducers/noteListSlice';
import SearchTags from '../SearchTags/SearchTags';

const NoteListPage: FC = () => {
    const { notes, isLoading, error, modalActive, tagsInput, tags } = useAppSelector((state => state.noteListSlice));
    const dispatch = useAppDisaptch();

    const hasAllTag = (arr1: string[] | undefined, arr2: string[]): boolean => {
        if(!arr1) return false;
        for(let el of arr2){
            if(!arr1.includes(el)) return false;
        }
        return true;
    };

    useEffect(() => {
        dispatch(fetchNotes())
    }, [])

    const handleSwitchModal = (bool: boolean) => {
        dispatch(noteListSlice.actions.setActivModal(bool));
    }

    return (
        <div>
            <ModalAddNote active={modalActive} setActive={handleSwitchModal} />
            <button onClick={() => handleSwitchModal(true)} className={style.btn}>Create note</button>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>Error</h1>}
            <SearchTags tags={tags} tagsInput={tagsInput} />
            <div className={style.noteList}>
                <p className={style.noteList__title}>Your notes</p>
                {tags.length === 0 ?
                    notes.length !== 0 ? notes.map(note => <NoteItem key={note.id} note={note} />) : null
                    : notes.length !== 0 ? notes.filter(note => hasAllTag(note.tag,tags)).map(note => <NoteItem key={note.id} note={note} />) : null}

            </div>
        </div>
    )
}
export default NoteListPage;