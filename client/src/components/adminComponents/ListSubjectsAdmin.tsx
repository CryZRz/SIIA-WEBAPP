import {useEffect, useState} from 'react'
import { clientAuthFetch } from '../../helpers/fetching/clientFecth';
import { DataSubjectIn } from '../../Interfaces/Subject/dataSubject';
import LoadingSection from '../LoadingSection';
import Pagination from '../Pagination';
import TableSubject from '../TableSubject';
import MenuCreateSubject from './MenuCreateSubject';

export default function ListSubjectsAdmin() {

  const [loadListSubjects, setLoadListSubjects] = useState(false)
  const [saveListSubjects, setSaveListSubjects] = useState<DataSubjectIn[]>([])
  const [saveSubjectEdit, setSaveSubjectEdit] = useState<DataSubjectIn>()
  const [showMenuCreateSub, setShowMenuCreateSub] = useState(false)
  const [showMenuEditSub, setShowMenuEditSub] = useState(false)

  async function getListSubjects() {
    try {
      setLoadListSubjects(false);
      const listSubjects = await clientAuthFetch.get("/api/admin/subjects");
      setSaveListSubjects(listSubjects.data.data);
      setLoadListSubjects(true);
      console.log(listSubjects.data);
    } catch (e) {
      console.log(e)
      alert(e);
    }
  }

  useEffect(() => {
    getListSubjects();
  }, []);

  return (
    <div className="mx-4">
      <MenuCreateSubject
          showMenu={showMenuCreateSub}
          setShowMenu={setShowMenuCreateSub}
      />
      <MenuCreateSubject
        showMenu={showMenuEditSub}
        setShowMenu={setShowMenuEditSub}
        subjectEdit={saveSubjectEdit}
        setSubjectEdit={setSaveSubjectEdit}
      />
      <div className="w-11/12 mx-auto mb-2 mt-4">
        <h1 className="text-orangeLight text-3xl font-bold">Materias</h1>
      </div>
      <div className="w-11/12 mx-auto mb-2">
          <button 
            className="w-full bg-orangeLight text-white p-1"
            onClick={e => {setShowMenuCreateSub(true)}}
          >
              Crear nueva materia
          </button>
      </div>
      <div className="w-11/12 mx-auto">
        {
          loadListSubjects ?
          <TableSubject>
            {
              saveListSubjects.map(s => {

                function addSubEdit(){
                  setSaveSubjectEdit(s)
                  setShowMenuEditSub(true)
                }

                return(
                  <tr 
                      className="hover:bg-orangeLight cursor-pointer" 
                      key={s.id} 
                      onClick={addSubEdit}
                  >
                    <td className="p-1">{s.id}</td>
                    <td className="p-1">{s.name}</td>
                    <td className="p-1">{s.credits}</td>
                  </tr>
                )
              })
            }
          </TableSubject>
          :
          <LoadingSection/>
        }
      </div>
      <div>
        <Pagination
          start={0}
          end={10}
          fetchingData={getListSubjects}
          isLoading={!loadListSubjects}
        />
      </div>
    </div>
  )
}

