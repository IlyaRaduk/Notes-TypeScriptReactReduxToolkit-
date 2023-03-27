import style from './app.module.scss'
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import NoteListPage from '../NoteListPage/NoteListPage';
import NotePage from '../NotePage/NotePage';


function App() {

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.app}>
          <Header />
          <Routes>
            <Route path="/" element={<NoteListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
