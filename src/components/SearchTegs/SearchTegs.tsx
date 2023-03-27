import style from './searchTegs.module.scss';
import { FC } from "react";
import { useAppDisaptch } from '../../hooks/redux';
import { noteListSlice } from '../../store/reducers/noteListSlice';

interface ISearchTegsProps {
    tegs: string[],
    tegsInput: string,
}

const SearchTegs: FC<ISearchTegsProps> = ({ tegs, tegsInput }) => {
    const dispatch = useAppDisaptch();
    return (
        <div className={style.search}>
            <label htmlFor="addTegs">Your tegs for search</label>
            <div className={style.search__inputField}>
                <input
                    className={style.search__input}
                    placeholder='Add new teg'
                    name="addTegs"
                    type="text"
                    value={tegsInput}
                    onChange={(e) => dispatch(noteListSlice.actions.tegsInput(e.target.value))} />
                <button className={style.search__btn} onClick={() => dispatch(noteListSlice.actions.addTeg(tegsInput))}>Add</button>
            </div>
            <div className={style.search__tegs}>
                {tegs.length !== 0 ? tegs.map((teg, index) => <span onClick={()=>dispatch(noteListSlice.actions.removeTeg(index))} key={index} className={style.search__teg}>{ teg + ' '}</span>) : null}
            </div>
        </div>
    )
}
export default SearchTegs;