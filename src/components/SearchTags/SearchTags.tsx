import style from './searchTags.module.scss';
import { FC } from "react";
import { useAppDisaptch } from '../../hooks/redux';
import { noteListSlice } from '../../store/reducers/noteListSlice';

interface ISearchTagsProps {
    tags: string[],
    tagsInput: string,
}

const SearchTags: FC<ISearchTagsProps> = ({ tags, tagsInput }) => {
    const dispatch = useAppDisaptch();
    return (
        <div className={style.search}>
            <label htmlFor="addTags">Your tags for search</label>
            <div className={style.search__inputField}>
                <input
                    className={style.search__input}
                    placeholder='Add new tag'
                    name="addTags"
                    type="text"
                    value={tagsInput}
                    onChange={(e) => dispatch(noteListSlice.actions.tagsInput(e.target.value))} />
                <button className={style.search__btn} onClick={() => dispatch(noteListSlice.actions.addTag(tagsInput))}>Add</button>
            </div>
            <div className={style.search__tags}>
                {tags.length !== 0 ? tags.map((tag, index) => <span onClick={()=>dispatch(noteListSlice.actions.removeTag(index))} key={index} className={style.search__tag}>{ tag + ' '}</span>) : null}
            </div>
        </div>
    )
}
export default SearchTags;